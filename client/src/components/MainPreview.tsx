import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Eye, Download, Undo, Redo, Type, Image, Square, Smartphone, Tablet, Monitor } from 'lucide-react';
import { CardData, Template, CustomElement } from '@/lib/hooks';
import CardTextElement from './CardTextElement';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { formatDate, dataURLtoBlob, generateCardImage } from '@/lib/utils';

interface MainPreviewProps {
  selectedTemplate: Template | null;
  cardData: CardData;
  customBackground: string | null;
  customElements: CustomElement[];
  onUpdateElement: (id: string, updates: Partial<CustomElement>) => void;
  onRemoveElement: (id: string) => void;
  onAddElement: (type: 'text' | 'image' | 'shape') => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

// Draggable custom element renderer
interface CustomElementRenderProps {
  element: CustomElement;
  onUpdate: (updates: Partial<CustomElement>) => void;
  onRemove: () => void;
  editable: boolean;
}

const CustomElementRender = ({ element, onUpdate, onRemove, editable }: CustomElementRenderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editable) return;
    e.stopPropagation();
    document.body.style.userSelect = 'none';

    const startX = e.clientX;
    const startY = e.clientY;
    const startXOffset = element.x;
    const startYOffset = element.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      onUpdate({
        x: startXOffset + deltaX,
        y: startYOffset + deltaY
      });
    };

    const handleMouseUp = () => {
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setIsDragging(false);
    };

    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDoubleClick = () => {
    if (element.type === 'text') {
      const newText = prompt("Enter new text:", element.content);
      if (newText !== null) {
        onUpdate({ content: newText });
      }
    } else if (element.type === 'image') {
      const newUrl = prompt("Enter image URL:", element.content);
      if (newUrl !== null && newUrl.trim()) {
        onUpdate({ content: newUrl });
      }
    }
  };

  return (
    <div
      className={`absolute ${editable ? 'hover:outline hover:outline-dashed hover:outline-primary/60 group p-1' : ''} cursor-move select-none`}
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        zIndex: isDragging ? 50 : 20,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {editable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50"
        >
          ✕
        </button>
      )}

      {element.type === 'text' ? (
        <span className="text-white text-sm font-semibold select-none bg-black/20 backdrop-blur-xs px-2 py-0.5 rounded border border-white/5 whitespace-nowrap">
          {element.content}
        </span>
      ) : element.type === 'image' ? (
        <img
          src={element.content}
          alt="sticker"
          className="select-none pointer-events-none"
          style={{ width: element.width || 60, height: element.height || 60 }}
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100"; // fallback
          }}
        />
      ) : (
        /* Shape: star */
        <div className="flex items-center justify-center text-amber-400 select-none pointer-events-none text-3xl">
          ✦
        </div>
      )}
    </div>
  );
};

const MainPreview = ({ 
  selectedTemplate, 
  cardData, 
  customBackground,
  customElements,
  onUpdateElement,
  onRemoveElement,
  onAddElement,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}: MainPreviewProps) => {
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
  
  const style = selectedTemplate?.cardStyle;
  const overlayOpacity = style?.overlayOpacity ?? 0.45;
  const titleFont = style?.fontFamilyTitle ? { fontFamily: `'${style.fontFamilyTitle}', cursive, serif` } : { fontFamily: "'Playfair Display', serif" };
  const bodyFont = style?.fontFamilyBody ? { fontFamily: `'${style.fontFamilyBody}', sans-serif` } : { fontFamily: "'Montserrat', sans-serif" };
  const textColor = style?.fontColor ?? '#ffffff';

  // Border styles
  let borderClasses = "border border-white/20 m-4 p-8 w-[calc(100%-2rem)] h-[calc(100%-2rem)] flex flex-col items-center justify-center relative";
  if (style?.borderStyle === 'gold') {
    borderClasses = "border-4 border-double border-[#D4AF37] m-4 p-6 w-[calc(100%-2rem)] h-[calc(100%-2rem)] flex flex-col items-center justify-center relative after:absolute after:inset-1 after:border after:border-[#D4AF37]/30";
  } else if (style?.borderStyle === 'royal') {
    borderClasses = "border-[6px] border-double border-[#FFD700] m-5 p-6 w-[calc(100%-2.5rem)] h-[calc(100%-2.5rem)] flex flex-col items-center justify-center relative shadow-[inset_0_0_30px_rgba(255,215,0,0.25)]";
  } else if (style?.borderStyle === 'floral') {
    borderClasses = "border border-white/30 m-4 p-8 w-[calc(100%-2rem)] h-[calc(100%-2rem)] flex flex-col items-center justify-center rounded-lg relative before:content-['✿'] before:text-[#FFEAA7] before:block before:text-lg before:mb-2 after:content-['✿'] after:text-[#FFEAA7] after:block after:text-lg after:mt-2";
  } else if (style?.borderStyle === 'minimal') {
    borderClasses = "border-2 border-white/40 m-6 p-6 w-[calc(100%-3rem)] h-[calc(100%-3rem)] flex flex-col items-center justify-center relative";
  } else if (style?.borderStyle === 'none') {
    borderClasses = "p-6 w-full h-full flex flex-col items-center justify-center relative";
  }

  const cardBgStyle = !backgroundImage && cardData.backgroundColor 
    ? { backgroundColor: cardData.backgroundColor } 
    : {};

  return (
    <div className="md:w-2/3 lg:w-3/4 flex flex-col mobile-full">
      {/* Toolbar */}
      <div className="bg-dark-surface border-b border-dark-border p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white disabled:opacity-30"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo"
          >
            <Undo className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white disabled:opacity-30"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo"
          >
            <Redo className="h-5 w-5" />
          </Button>
          <div className="hidden md:block border-l border-dark-border mx-2"></div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex text-gray-400 hover:text-white"
            onClick={() => onAddElement('text')}
            title="Add Text Element"
          >
            <Type className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex text-gray-400 hover:text-white"
            onClick={() => onAddElement('image')}
            title="Add Sticker Image"
          >
            <Image className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex text-gray-400 hover:text-white"
            onClick={() => onAddElement('shape')}
            title="Add Sparkle Shape"
          >
            <Square className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={() => setPreviewMode(previewMode === 'edit' ? 'preview' : 'edit')}
            variant="outline"
            className="bg-dark-light hover:bg-gray-700 text-white border-0"
          >
            <Eye className="mr-1 h-4 w-4" /> {previewMode === 'edit' ? 'Preview' : 'Edit'}
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
        <div 
          className={`card-container relative shadow-2xl rounded-lg overflow-hidden ${displaySizeClass} aspect-[3/4] w-full max-w-[450px] flex flex-col`}
          style={cardBgStyle}
        >
          {/* Background Image */}
          {backgroundImage ? (
            <img 
              src={backgroundImage} 
              alt="Card background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : !cardData.backgroundColor ? (
            <div className="absolute inset-0 w-full h-full bg-dark-light flex items-center justify-center">
              <p className="text-gray-400">No background selected</p>
            </div>
          ) : null}
          
          {/* Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity - 0.15}), rgba(0,0,0,${overlayOpacity + 0.15}))`
            }}
          ></div>
          
          {/* Card Content */}
          <div 
            className="relative z-10 h-full w-full flex flex-col items-center justify-center p-4 card-content"
            style={{ color: textColor }}
          >
            <div className={borderClasses}>
              {/* Draggable Custom Elements */}
              {customElements.map((element) => (
                <CustomElementRender
                  key={element.id}
                  element={element}
                  onUpdate={(updates) => onUpdateElement(element.id, updates)}
                  onRemove={() => onRemoveElement(element.id)}
                  editable={previewMode === 'edit'}
                />
              ))}

              <CardTextElement 
                position="top"
                editable={previewMode === 'edit'} 
              >
                <p 
                  className="text-gray-200 uppercase tracking-widest text-xs mb-2 opacity-90 font-medium"
                  style={bodyFont}
                >
                  With great pleasure
                </p>
              </CardTextElement>
              
              <CardTextElement 
                position="main"
                editable={previewMode === 'edit'} 
              >
                <h1 
                  className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                  style={titleFont}
                >
                  {cardData.eventName}
                </h1>
                <p 
                  className="text-sm md:text-base mb-6 max-w-xs mx-auto italic font-light opacity-95"
                  style={bodyFont}
                >
                  {cardData.description}
                </p>
              </CardTextElement>
              
              <CardTextElement 
                position="details"
                editable={previewMode === 'edit'} 
                className="py-3 px-4 rounded-lg bg-black/40 backdrop-blur-xs mb-6 border border-white/10 w-full max-w-[280px]"
              >
                <div className="flex flex-col gap-2 justify-center text-xs" style={bodyFont}>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-primary font-medium">Date</span>
                    <span className="text-white">{formattedDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-primary font-medium">Time</span>
                    <span className="text-white">{formattedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary font-medium mr-4">Location</span>
                    <span className="text-white text-right truncate max-w-[150px]">{cardData.location}</span>
                  </div>
                </div>
              </CardTextElement>
              
              <CardTextElement 
                position="bottom"
                editable={previewMode === 'edit'} 
              >
                <p 
                  className="text-xs mb-1 opacity-90"
                  style={bodyFont}
                >
                  RSVP by {formattedDate}
                </p>
                <p 
                  className="text-xs font-semibold"
                  style={bodyFont}
                >
                  {cardData.rsvpContact}
                </p>
              </CardTextElement>
            </div>
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
