import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Eye, Download, Undo, Redo, Type, Image, Square, Smartphone, Tablet, Monitor } from 'lucide-react';
import { CardData, Template } from '@/lib/hooks';
import CardTextElement from './CardTextElement';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { formatDate, dataURLtoBlob, generateCardImage } from '@/lib/utils';

interface MainPreviewProps {
  selectedTemplate: Template | null;
  cardData: CardData;
  customBackground: string | null;
}

const MainPreview = ({ selectedTemplate, cardData, customBackground }: MainPreviewProps) => {
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview'>('edit');
  const [displaySize, setDisplaySize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const { toast } = useToast();
  
  const backgroundImage = customBackground || selectedTemplate?.backgroundUrl || '';
  
  const downloadMutation = useMutation({
    mutationFn: async () => {
      // Get the card container element
      const cardElement = document.querySelector('.card-content')?.parentElement as HTMLElement;
      if (!cardElement) {
        throw new Error('Card element not found');
      }
      
      // Generate the image using html2canvas
      const dataUrl = await generateCardImage(cardElement);
      
      // Convert dataUrl to a blob
      const blob = dataURLtoBlob(dataUrl);
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a link element to trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `invitation-card-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Save card data to the server
      const saveResponse = await fetch('/api/save-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: selectedTemplate?.id,
          customBackground: customBackground,
          cardData,
        }),
      });
      
      if (!saveResponse.ok) {
        console.warn('Card data not saved to server, but download succeeded');
      }
    },
    onSuccess: () => {
      toast({
        title: 'Invitation card downloaded successfully!',
        variant: 'default',
      });
    },
    onError: (error) => {
      console.error('Download error:', error);
      toast({
        title: 'Failed to download card',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  });
  
  const handleDownload = () => {
    if (!selectedTemplate && !customBackground) {
      toast({
        title: 'No template selected',
        description: 'Please select a template or upload a custom background first.',
        variant: 'destructive',
      });
      return;
    }
    
    downloadMutation.mutate();
  };
  
  const displaySizeClass = 
    displaySize === 'mobile' 
      ? 'max-w-sm' 
      : displaySize === 'tablet'
        ? 'max-w-xl'
        : 'max-w-3xl';
  
  const formattedDate = formatDate(cardData.date);
  const formattedTime = cardData.time.split(':')[0] + ':' + cardData.time.split(':')[1] + ' ' + (parseInt(cardData.time.split(':')[0]) >= 12 ? 'PM' : 'AM');
  
  return (
    <div className="md:w-2/3 lg:w-3/4 flex flex-col mobile-full">
      {/* Toolbar */}
      <div className="bg-dark-surface border-b border-dark-border p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Undo className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Redo className="h-5 w-5" />
          </Button>
          <div className="hidden md:block border-l border-dark-border mx-2"></div>
          <Button variant="ghost" size="icon" className="hidden md:flex text-gray-400 hover:text-white">
            <Type className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex text-gray-400 hover:text-white">
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex text-gray-400 hover:text-white">
            <Square className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={() => setPreviewMode(previewMode === 'edit' ? 'preview' : 'edit')}
            variant="outline"
            className="bg-dark-light hover:bg-gray-700 text-white border-0"
          >
            <Eye className="mr-1 h-4 w-4" /> Preview
          </Button>
          <Button
            onClick={handleDownload}
            disabled={downloadMutation.isPending}
            className="bg-secondary hover:bg-indigo-600"
          >
            {downloadMutation.isPending ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <Download className="mr-1 h-4 w-4" /> Download
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Card Preview Area */}
      <div className="flex-grow p-4 md:p-10 flex flex-col items-center justify-center overflow-auto bg-dark">
        {/* The Card */}
        <div className={`card-container relative shadow-2xl rounded-lg overflow-hidden ${displaySizeClass}`}>
          {/* Background Image */}
          {backgroundImage ? (
            <img 
              src={backgroundImage} 
              alt="Card background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-dark-light flex items-center justify-center">
              <p className="text-gray-400">No background selected</p>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
          
          {/* Card Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center card-content">
            <CardTextElement 
              position="top"
              editable={previewMode === 'edit'} 
            >
              <p className="text-gray-200 font-heading uppercase tracking-widest text-sm mb-2">With great pleasure</p>
            </CardTextElement>
            
            <CardTextElement 
              position="main"
              editable={previewMode === 'edit'} 
            >
              <h1 className="text-white font-heading text-4xl md:text-5xl font-bold mb-4">
                {cardData.eventName}
              </h1>
              <p className="text-gray-200 text-xl mb-6">{cardData.description}</p>
            </CardTextElement>
            
            <CardTextElement 
              position="details"
              editable={previewMode === 'edit'} 
              className="py-3 px-6 rounded-lg bg-black/30 backdrop-blur-sm mb-6"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center">
                <div>
                  <p className="text-primary font-medium mb-1">Date</p>
                  <p className="text-white">{formattedDate}</p>
                </div>
                <div>
                  <p className="text-primary font-medium mb-1">Time</p>
                  <p className="text-white">{formattedTime}</p>
                </div>
                <div>
                  <p className="text-primary font-medium mb-1">Location</p>
                  <p className="text-white">{cardData.location}</p>
                </div>
              </div>
            </CardTextElement>
            
            <CardTextElement 
              position="bottom"
              editable={previewMode === 'edit'} 
            >
              <p className="text-gray-200 mb-2">RSVP by {formattedDate}</p>
              <p className="text-gray-200">{cardData.rsvpContact}</p>
            </CardTextElement>
          </div>
        </div>
        
        {/* Card Size Controls */}
        <div className="flex items-center justify-center space-x-4 mt-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setDisplaySize('mobile')}
            className={displaySize === 'mobile' ? "text-white" : "text-gray-400 hover:text-white"}
          >
            <Smartphone className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setDisplaySize('tablet')}
            className={displaySize === 'tablet' ? "text-white" : "text-gray-400 hover:text-white"}
          >
            <Tablet className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setDisplaySize('desktop')}
            className={displaySize === 'desktop' ? "text-white" : "text-gray-400 hover:text-white"}
          >
            <Monitor className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPreview;
