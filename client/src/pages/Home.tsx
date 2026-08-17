import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SidePanel from "@/components/SidePanel";
import MainPreview from "@/components/MainPreview";
import { useState } from "react";
import { CardData, Template, CustomElement } from "@/lib/hooks";

interface HistoryState {
  cardData: CardData;
  elements: CustomElement[];
}

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [customBackground, setCustomBackground] = useState<string | null>(null);

  // Undo / Redo History State
  const [history, setHistory] = useState<HistoryState[]>(() => [
    {
      cardData: {
        eventName: "Wedding Celebration",
        date: "2023-12-25",
        time: "12:00",
        location: "barth partyploy, gujrat",
        description: "We invite you to join us on our special day as we celebrate our love and commitment to each other.",
        rsvpContact: "+91 1234567890",
        backgroundColor: "hsl(265 84% 50%)"
      },
      elements: []
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentVersion = history[historyIndex];
  const cardData = currentVersion.cardData;
  const customElements = currentVersion.elements;

  const pushState = (newCardData: CardData, newElements: CustomElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ cardData: newCardData, elements: newElements });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleDataChange = (newData: Partial<CardData>) => {
    const nextCardData = { ...cardData, ...newData };
    pushState(nextCardData, customElements);
  };

  const handleAddElement = (type: 'text' | 'image' | 'shape') => {
    let content = "";
    if (type === 'text') {
      content = "Click to edit text";
    } else if (type === 'image') {
      content = "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=150"; // Gold sticker sample
    } else if (type === 'shape') {
      content = "star"; // golden star shape
    }

    const newElement: CustomElement = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      content,
      x: 20,
      y: 20,
      width: type === 'text' ? undefined : 60,
      height: type === 'text' ? undefined : 60
    };
    const nextElements = [...customElements, newElement];
    pushState(cardData, nextElements);
  };

  const handleUpdateElement = (id: string, updates: Partial<CustomElement>) => {
    const nextElements = customElements.map(el => el.id === id ? { ...el, ...updates } : el);
    pushState(cardData, nextElements);
  };

  const handleRemoveElement = (id: string) => {
    const nextElements = customElements.filter(el => el.id !== id);
    pushState(cardData, nextElements);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row bg-dark">
        <SidePanel 
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          cardData={cardData}
          setCardData={handleDataChange}
          setCustomBackground={setCustomBackground}
        />
        <MainPreview 
          selectedTemplate={selectedTemplate} 
          cardData={cardData}
          customBackground={customBackground}
          customElements={customElements}
          onUpdateElement={handleUpdateElement}
          onRemoveElement={handleRemoveElement}
          onAddElement={handleAddElement}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </main>
      <Footer />
    </div>
  );
}
