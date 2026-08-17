import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, Sparkles, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="border-b border-dark-border bg-dark-surface/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center group">
            <div className="p-2 bg-gradient-to-tr from-primary to-purple-600 rounded-lg mr-2 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Sparkles className="text-white text-xl h-5 w-5" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-white tracking-tight">
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Invite</span>Karo
            </h1>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-gray-300 hover:text-white font-medium transition-all hover:scale-105">Home</a>
          <a href="/templates" className="text-gray-300 hover:text-white font-medium transition-all hover:scale-105">Templates</a>
          <a href="/create" className="text-gray-300 hover:text-white font-medium transition-all hover:scale-105">Create Card</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white shadow-md shadow-primary/25 border-0 flex items-center transition-all duration-300 transform hover:scale-[1.02]" onClick={() => window.location.href = '/create'}>
            <Plus className="mr-1.5 h-4 w-4" /> New Card
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-dark-surface border-dark-border">
              <nav className="flex flex-col space-y-4 mt-8">
                <a href="/" className="text-gray-300 hover:text-white transition-colors p-2 text-lg font-medium">Home</a>
                <a href="/templates" className="text-gray-300 hover:text-white transition-colors p-2 text-lg font-medium">Templates</a>
                <a href="/create" className="text-gray-300 hover:text-white transition-colors p-2 text-lg font-medium">Create Card</a>
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
