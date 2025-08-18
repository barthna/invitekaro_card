import { useState } from "react";
import { Switch, Route } from "wouter";
import { useTemplates } from "./lib/hooks";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import LandingPage from "@/pages/LandingPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/create" component={Home} />
      <Route path="/templates" component={TemplateGallery} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Template Gallery Page - Displays all templates in a grid
function TemplateGallery() {
  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-10">Invitation Templates</h1>
        <TemplateGrid />
      </div>
      <Footer />
    </div>
  );
}

// Header Component
function Header() {
  return (
    <header className="bg-dark-surface border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-white">InviteKaro</a>
          </div>
          <nav className="flex space-x-6">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="/templates" className="text-gray-300 hover:text-white transition-colors">Templates</a>
            <a href="/create" className="text-gray-300 hover:text-white transition-colors">Create Card</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-dark-surface py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">InviteKaro</h2>
            <p className="mt-2 text-gray-400">Beautiful invitations for your special moments</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} InviteKaro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Template Grid Component
function TemplateGrid() {
  const { templates, categories, isLoading } = useTemplates();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = selectedCategory === "All"
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === "All"
              ? "bg-primary text-white"
              : "bg-dark-light text-gray-300 hover:bg-primary/20"
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-dark-light text-gray-300 hover:bg-primary/20"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-gray-400">Loading templates...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredTemplates.map(template => (
            <a
              key={template.id}
              href={`/create?template=${template.id}`}
              className="block group"
            >
              <div className="bg-dark-light rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/20 border border-gray-800 group-hover:border-primary/50">
                <div className="relative">
                  <img
                    src={template.thumbnailUrl}
                    alt={template.name}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.jpg"; // fallback image
                    }}
                    className="w-full aspect-[3/4] object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-medium text-sm">{template.name}</h3>
                    <p className="text-gray-300 text-xs">{template.category}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
