import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SidePanel from "@/components/SidePanel";
import MainPreview from "@/components/MainPreview";
import { useState } from "react";
import { CardData, Template } from "@/lib/hooks";

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [cardData, setCardData] = useState<CardData>({
    eventName: "Wedding Celebration",
    date: "2023-12-25",
    time: "12:00",
    location: "barth partyploy, gujrat",
    description: "We invite you to join us on our special day as we celebrate our love and commitment to each other.",
    rsvpContact: "+91 1234567890",
    backgroundColor: "hsl(265 84% 50%)"
  });
  
  const [customBackground, setCustomBackground] = useState<string | null>(null);
  
  const handleDataChange = (newData: Partial<CardData>) => {
    setCardData({
      ...cardData,
      ...newData
    });
  };
  
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
        />
      </main>
      <Footer />
    </div>
  );
}
