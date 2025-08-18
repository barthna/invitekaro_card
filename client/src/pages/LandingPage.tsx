import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ChevronRight, Gift, Heart, Cake, Award, Users, Calendar, ArrowRight, Leaf } from 'lucide-react';

export default function LandingPage() {
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);
  
  const features = [
    {
      icon: <Gift className="h-12 w-12 text-indigo-400" />,
      title: "Unique Invitations",
      description: "Design beautiful invitation cards that will make your special occasion memorable."
    },
    {
      icon: <Calendar className="h-12 w-12 text-pink-400" />,
      title: "Quick & Simple",
      description: "Create your beautiful invitation card in minutes, without any design experience."
    },
    {
      icon: <Users className="h-12 w-12 text-teal-400" />,
      title: "Easy Sharing",
      description: "Download your completed cards and print them or share them digitally."
    },
    {
      icon: <Award className="h-12 w-12 text-amber-400" />,
      title: "Premium Templates",
      description: "Choose from our special collection of templates suitable for every occasion."
    }
  ];
  
  const categories = [
    { icon: <Heart />, name: "Wedding", count: 24 },
    { icon: <Cake />, name: "Birthday", count: 18 },
    { icon: <Gift />, name: "Party", count: 15 },
    { icon: <Award />, name: "Corporate", count: 12 },
    { icon: <Leaf />, name: "Floral", count: 6 }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-dark to-dark"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Beautiful Invitation Cards for your <span className="text-primary">Special Occasions</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                Create beautiful and attractive invitation cards for your special occasions. Choose from many beautiful templates and customize to your preference.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/create">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    Create Invitation Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="outline" size="lg" className="border-gray-700 hover:bg-gray-800">
                    View Templates <ChevronRight className="ml-1 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl transform rotate-3 hover:-rotate-1 transition-transform">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1666277012916-1c1c7bc88122?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" 
                  alt="Featured invitation design with flower frame" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <span className="inline-block bg-primary/90 text-white text-sm px-3 py-1 rounded-full mb-3">
                    Premium Design
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-2">Floral Frame Invitation</h2>
                  <p className="text-gray-200">Beautiful floral designs with elegant empty frames</p>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-full bg-gradient-to-r from-primary to-purple-500 blur-3xl opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 rounded-full bg-gradient-to-r from-blue-500 to-primary blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className="fill-dark-surface">
            <path d="M0,160L48,149.3C96,139,192,117,288,117.3C384,117,480,139,576,144C672,149,768,139,864,122.7C960,107,1056,85,1152,80C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-dark-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Service Features</h2>
            <p className="mt-4 text-lg text-gray-400">Use our tools to create attractive invitation cards for your special occasions</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-dark p-8 rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-800 ${
                  hoverFeature === index ? 'transform -translate-y-2 border-primary/50' : ''
                }`}
                onMouseEnter={() => setHoverFeature(index)}
                onMouseLeave={() => setHoverFeature(null)}
              >
                <div className={`mb-5 p-3 rounded-lg inline-block ${
                  hoverFeature === index ? 'bg-primary/10' : 'bg-gray-800'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Templates Section */}
      <section className="bg-dark-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Floral Templates</h2>
              <p className="mt-4 text-lg text-gray-400">Beautiful floral frames with empty centers for your personalized content</p>
            </div>
            <Link href="/create">
              <Button className="mt-6 md:mt-0 bg-primary/10 text-primary hover:bg-primary/20">
                View All Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-dark rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1681400709202-89539492656d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGluayUyMEZsb3JhbCUyMEZyYW1lfGVufDB8fDB8fHww" 
                  alt="Pink Floral Frame" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-xl font-bold text-white">Pink Floral Frame</h3>
                  <p className="text-gray-200 text-sm">Elegant pink flowers for wedding invitations</p>
                </div>
              </div>
            </div>
            
            <div className="bg-dark rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1628001275579-3c999f2690de?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVycGxlJTIwRmxvcmFsJTIwRnJhbWV8ZW58MHx8MHx8fDA%3D" 
                  alt="Purple Floral Frame" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-xl font-bold text-white">Purple Floral Frame</h3>
                  <p className="text-gray-200 text-sm">Luxurious purple flowers for special occasions</p>
                </div>
              </div>
            </div>
            
            <div className="bg-dark rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Garden Frame" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-xl font-bold text-white">Garden Frame</h3>
                  <p className="text-gray-200 text-sm">Natural garden elements for a rustic touch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="bg-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Popular Categories</h2>
              <p className="mt-4 text-lg text-gray-400">Choose from our variety of templates according to your occasion</p>
            </div>
            <Link href="/templates">
              <Button className="mt-6 md:mt-0 bg-primary/10 text-primary hover:bg-primary/20">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/templates?category=${category.name}`}>
                <div className="bg-dark-surface border border-gray-800 rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-primary/10 transition-colors">
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-medium">{category.name}</h3>
                    </div>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-dark-surface relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary to-purple-600 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-gradient-to-tr from-blue-600 to-primary blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Creating Your Beautiful Invitation Card Today</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Create the perfect card for your special occasion with our simple and intuitive tool. Just choose a template, add your details, and customize to your preference!
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Create Invitation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-dark-surface py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">InviteKaro</h2>
              <p className="mt-2 text-gray-400">Beautiful invitations for your special occasions</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} InviteKaro. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}