import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardData, Template, useTemplates } from "@/lib/hooks";
import { Card } from "@/components/ui/card";
import TemplateItem from "./TemplateItem";
import { ColorPicker } from "./ui/color-picker";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Key, Wand2 } from "lucide-react";


// Define types for our image upload response
interface ImageUploadResponse {
  success: boolean;
  dataUrl: string;
}

interface SidePanelProps {
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template) => void;
  cardData: CardData;
  setCardData: (data: Partial<CardData>) => void;
  setCustomBackground: (url: string | null) => void;
}

const SidePanel = ({
  selectedTemplate,
  setSelectedTemplate,
  cardData,
  setCardData,
  setCustomBackground
}: SidePanelProps) => {
  const { templates, categories, isLoading: templatesLoading } = useTemplates();
  const [activeCategory, setActiveCategory] = useState("All");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  // AI Generator States
  const [aiPrompt, setAiPrompt] = useState("");
  const [customApiKey, setCustomApiKey] = useState(() => localStorage.getItem("gemini_api_key") || "");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what kind of invitation you want (e.g. Wedding, Birthday, Party style).",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-card-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          customApiKey: customApiKey || undefined
        })
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to generate card content");
      }
      
      setCardData({
        eventName: data.eventName || cardData.eventName,
        date: data.date || cardData.date,
        time: data.time || cardData.time,
        location: data.location || cardData.location,
        description: data.description || cardData.description,
        rsvpContact: data.rsvpContact || cardData.rsvpContact,
        backgroundColor: data.backgroundColor || cardData.backgroundColor,
      });

      if (customApiKey) {
        localStorage.setItem("gemini_api_key", customApiKey);
      }

      toast({
        title: "AI Card Generated!",
        description: "Your card content has been loaded successfully.",
        variant: "default"
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "AI Generation failed",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const colorOptions = [
    { color: "hsl(265 84% 50%)", name: "Purple" },
    { color: "hsl(226 70% 55%)", name: "Blue" },
    { color: "hsl(330 81% 60%)", name: "Pink" },
    { color: "hsl(142 69% 42%)", name: "Green" },
    { color: "hsl(43 96% 58%)", name: "Yellow" },
    { color: "hsl(0 91% 60%)", name: "Red" }
  ];

  const filteredTemplates = activeCategory === "All"
    ? templates
    : templates.filter(t => t.category === activeCategory);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file type - only accept common image formats
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!validImageTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file (JPEG, PNG, GIF, WebP, or SVG)",
          variant: "destructive"
        });
        return;
      }
      
      // Store the file and create a temporary preview
      setUploadedFile(file);
      
      // Create object URL for immediate preview
      // This will be replaced by the processed image when "Apply Changes" is clicked
      const objectUrl = URL.createObjectURL(file);
      setCustomBackground(objectUrl);
      
      toast({
        title: "Image selected",
        description: "Click 'Apply Changes' to process and use this image",
        variant: "default"
      });
    }
  };
  
  // Add drag and drop functionality
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('border-primary');
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-primary');
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-primary');
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please drop an image file",
          variant: "destructive"
        });
        return;
      }
      
      // Store the file and update the input element
      setUploadedFile(file);
      
      // Create object URL for immediate preview
      const objectUrl = URL.createObjectURL(file);
      setCustomBackground(objectUrl);
      
      toast({
        title: "Image dropped",
        description: "Click 'Apply Changes' to process and use this image",
        variant: "default"
      });
    }
  };

  const uploadMutation = useMutation<ImageUploadResponse, Error, File>({
    mutationFn: async (file: File) => {
      try {
        // First, validate the file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("File size exceeds 5MB limit");
        }

        // Create a new FormData object and append the file
        const formData = new FormData();
        formData.append("image", file);
        
        // Process image entirely on client side using FileReader
        const reader = new FileReader();
        
        // Create a promise that resolves when the FileReader completes
        const readFilePromise = new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            if (reader.result) {
              resolve(reader.result.toString());
            } else {
              reject(new Error("Failed to read file"));
            }
          };
          reader.onerror = () => reject(reader.error);
        });
        
        // Start reading the file as a data URL
        reader.readAsDataURL(file);
        
        // Wait for the file to be read
        const dataUrl = await readFilePromise;
        
        // Return successful response with the dataUrl
        return { success: true, dataUrl };
      } catch (error) {
        console.error("Error processing upload:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // Update custom background with data URL from processed image
      if (data && data.dataUrl) {
        setCustomBackground(data.dataUrl);
      }
      toast({
        title: "Image uploaded and processed successfully",
        description: "Your background image is ready to use",
        variant: "default"
      });
    },
    onError: (error) => {
      // Clear uploaded file on error
      setUploadedFile(null);
      
      toast({
        title: "Failed to process image",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  });

  const applyChangesMutation = useMutation<ImageUploadResponse, Error, void>({
    mutationFn: async () => {
      if (uploadedFile) {
        const result = await uploadMutation.mutateAsync(uploadedFile);
        return result;
      }
      // Return the same type as the upload mutation to keep types consistent
      return { success: true, dataUrl: "" };
    },
    onSuccess: () => {
      toast({
        title: "Changes applied successfully!",
        variant: "default",
      });
    }
  });

  const handleApplyChanges = () => {
    applyChangesMutation.mutate();
  };

  return (
    <div className="md:w-1/3 lg:w-1/4 border-r border-dark-border overflow-y-auto mobile-full bg-dark-surface">
      <Tabs defaultValue="templates">
        <TabsList className="w-full grid grid-cols-4 h-16 bg-dark-light border-b border-dark-border rounded-none">
          <TabsTrigger 
            value="templates" 
            className="py-4 text-xs font-medium text-gray-400 data-[state=active]:text-white data-[state=active]:bg-dark-light data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Templates
          </TabsTrigger>
          <TabsTrigger 
            value="ai-builder" 
            className="py-4 text-xs font-medium text-gray-400 data-[state=active]:text-white data-[state=active]:bg-dark-light data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            AI Generator
          </TabsTrigger>
          <TabsTrigger 
            value="data" 
            className="py-4 text-xs font-medium text-gray-400 data-[state=active]:text-white data-[state=active]:bg-dark-light data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Details
          </TabsTrigger>
          <TabsTrigger 
            value="upload" 
            className="py-4 text-xs font-medium text-gray-400 data-[state=active]:text-white data-[state=active]:bg-dark-light data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="p-4 focus-visible:outline-none">
          <h2 className="text-lg font-heading font-medium mb-4 text-white">Select Template</h2>
          
          <div className="flex mb-4 overflow-x-auto pb-2 space-x-2">
            <Button 
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeCategory === "All" ? "bg-primary" : "bg-dark-light hover:bg-primary/20 text-gray-300"}`}
            >
              All
            </Button>
            
            {categories.map((category) => (
              <Button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeCategory === category ? "bg-primary" : "bg-dark-light hover:bg-primary/20 text-gray-300"}`}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {templatesLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
              {filteredTemplates.map((template) => (
                <TemplateItem
                  key={template.id}
                  template={template}
                  selected={selectedTemplate?.id === template.id}
                  onSelect={() => setSelectedTemplate(template)}
                />
              ))}
            </div>
          )}
          
          <Button 
            variant="link" 
            className="w-full mt-4 text-primary hover:text-primary/80"
          >
            Show more templates <ChevronDownIcon className="ml-1 h-4 w-4" />
          </Button>
        </TabsContent>

        <TabsContent value="ai-builder" className="p-4 focus-visible:outline-none">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <h2 className="text-lg font-heading font-medium text-white">AI Card Generator</h2>
          </div>
          
          <form onSubmit={handleAiGenerate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Describe your event card</label>
              <Textarea 
                placeholder="Example: Gold & Red traditional Indian Wedding card for Arjun & Meera on 18th December. Include a romantic quote."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="!bg-dark-light/50 border-dark-border !text-white min-h-[100px] placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-dark-light"
              />
            </div>

            <Button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating card...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generate with Gemini
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 border-t border-dark-border/40 pt-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Suggested Prompts</h4>
            <div className="space-y-2">
              {[
                "Traditional Red & Marigold Indian Wedding Invitation, Rohan & Priya",
                "Neon birthday party card for Rohan, 25th birthday, starry night vibe",
                "Luxury Golden Anniversary card for parents with a heart warming quote"
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setAiPrompt(suggestion)}
                  className="w-full text-left text-xs bg-dark-light/30 hover:bg-dark-light/60 text-gray-300 p-2.5 rounded-lg border border-dark-border/20 transition-all truncate"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="p-4 focus-visible:outline-none">
  <h2 className="text-lg font-heading font-medium mb-4 text-white">Upload Background</h2>

  <Card className="bg-dark-surface border-dark-border p-4">
    <div className="flex flex-col items-center justify-center">
      <div 
        className="w-full cursor-pointer"
        onClick={() => document.getElementById("backgroundUpload")?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div 
          className="bg-dark-light/40 border-2 border-dashed border-dark-border rounded-lg p-10 flex flex-col items-center justify-center hover:border-primary/50 transition-colors"
        >
          {uploadMutation.isPending ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-3" />
              <p className="text-gray-300 text-center mb-2">Processing image...</p>
              <p className="text-gray-400 text-center text-xs">This may take a moment</p>
            </div>
          ) : (
            <>
              <UploadIcon className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-gray-300 text-center mb-2">Drag & drop your image here</p>
              <p className="text-gray-400 text-center text-xs mb-4">or click anywhere in the box</p>
              <Button type="button" className="bg-primary/20 hover:bg-primary/30 text-primary">
                Select File
              </Button>
            </>
          )}
        </div>
      </div>

      <input
        id="backgroundUpload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {uploadedFile && (
        <div className="mt-4 w-full">
          <p className="text-sm text-gray-300 truncate">
            Selected: {uploadedFile.name}
          </p>
        </div>
      )}
    </div>
  </Card>
</TabsContent>


        <TabsContent value="data" className="p-4 focus-visible:outline-none">
          <h2 className="text-lg font-heading font-medium mb-4 text-white">Card Details</h2>
          
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Event Name</label>
              <Input 
                type="text" 
                value={cardData.eventName} 
                onChange={(e) => setCardData({ eventName: e.target.value })}
                className="!bg-dark-light/50 border-dark-border !text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-dark-light"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                <Input 
                  type="date" 
                  value={cardData.date} 
                  onChange={(e) => setCardData({ date: e.target.value })}
                  className="!bg-dark-light/50 border-dark-border !text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-dark-light"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
                <Input 
                  type="time" 
                  value={cardData.time} 
                  onChange={(e) => setCardData({ time: e.target.value })}
                  className="!bg-dark-light/50 border-dark-border !text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-dark-light"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
              <Input 
                type="text" 
                value={cardData.location} 
                onChange={(e) => setCardData({ location: e.target.value })}
                className="!bg-dark-light/50 border-dark-border !text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-dark-light"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <Textarea 
                rows={3}
                value={cardData.description} 
                onChange={(e) => setCardData({ description: e.target.value })}
                className="!bg-dark-light/50 border-dark-border !text-white min-h-[80px] placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-dark-light"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">RSVP Contact</label>
              <Input 
                type="text" 
                value={cardData.rsvpContact} 
                onChange={(e) => setCardData({ rsvpContact: e.target.value })}
                className="!bg-dark-light/50 border-dark-border !text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-dark-light"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Custom Background</label>
              <div className="flex items-center">
                <Button 
                  type="button" 
                  onClick={() => document.getElementById('backgroundUpload')?.click()}
                  className="bg-primary/20 hover:bg-primary/30 text-primary"
                >
                  <UploadIcon className="mr-1 h-4 w-4" /> Upload Image
                </Button>
                <span className="ml-3 text-sm text-gray-400">
                  {uploadedFile ? uploadedFile.name : "No file selected"}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Color Theme</label>
              <ColorPicker 
                options={colorOptions}
                selectedColor={cardData.backgroundColor}
                onChange={(color) => setCardData({ backgroundColor: color })}
              />
            </div>
            
            <Button
              type="button"
              onClick={handleApplyChanges}
              disabled={applyChangesMutation.isPending}
              className="w-full bg-primary hover:bg-purple-700"
            >
              {applyChangesMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Applying...
                </>
              ) : (
                "Apply Changes"
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Icon components
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const UploadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

export default SidePanel;
