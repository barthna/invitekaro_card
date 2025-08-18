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
import { Loader2 } from "lucide-react";


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
        <TabsList className="w-full grid grid-cols-3 h-16 bg-dark-light border-b border-dark-border rounded-none">
          <TabsTrigger 
            value="templates" 
            className="py-4 font-medium text-gray-400 data-[state=active]:text-white data-[state=active]:bg-dark-light data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Templates
          </TabsTrigger>
          <TabsTrigger 
            value="upload" 
            className="py-4 font-medium text-gray-400 data-[state=active]:text-white data-[state=active]:bg-dark-light data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Upload
          </TabsTrigger>
          <TabsTrigger 
            value="data" 
            className="py-4 font-medium text-gray-400 data-[state=active]:text-white data-[state=active]:bg-dark-light data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Data
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
                className="form-input bg-white border-dark-border text-black"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                <Input 
                  type="date" 
                  value={cardData.date} 
                  onChange={(e) => setCardData({ date: e.target.value })}
                  className="form-input bg-white border-dark-border text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
                <Input 
                  type="time" 
                  value={cardData.time} 
                  onChange={(e) => setCardData({ time: e.target.value })}
                  className="form-input bg-white border-dark-border text-black"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
              <Input 
                type="text" 
                value={cardData.location} 
                onChange={(e) => setCardData({ location: e.target.value })}
                className="form-input bg-white border-dark-border text-black"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <Textarea 
                rows={3}
                value={cardData.description} 
                onChange={(e) => setCardData({ description: e.target.value })}
                className="form-input bg-white border-dark-border text-black min-h-[80px]"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">RSVP Contact</label>
              <Input 
                type="text" 
                value={cardData.rsvpContact} 
                onChange={(e) => setCardData({ rsvpContact: e.target.value })}
                className="form-input bg-white border-dark-border text-black"
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
