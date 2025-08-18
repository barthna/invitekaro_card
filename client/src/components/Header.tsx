import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, TicketIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="border-b border-dark-border bg-dark-surface">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <TicketIcon className="text-primary text-2xl mr-2" />
            <h1 className="font-heading font-bold text-2xl text-white">
              <span className="text-primary">Invite</span>Karo
            </h1>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
          <a href="/templates" className="text-gray-300 hover:text-white transition-colors">Templates</a>
          <a href="/create" className="text-gray-300 hover:text-white transition-colors">Create Card</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button className="bg-primary hover:bg-purple-700 flex items-center" onClick={() => window.location.href = '/create'}>
            <PlusIcon className="mr-2 h-4 w-4" /> New Card
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-dark-surface border-dark-border">
              <nav className="flex flex-col space-y-4 mt-8">
                <a href="/" className="text-gray-300 hover:text-white transition-colors p-2">Home</a>
                <a href="/templates" className="text-gray-300 hover:text-white transition-colors p-2">Templates</a>
                <a href="/create" className="text-gray-300 hover:text-white transition-colors p-2">Create Card</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

// Icon components to keep code concise
const PlusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

export default Header;
