
import React from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Heart, Plus, Home, Info, Mail, Shield, FileText, Cookie } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="text-xl md:text-2xl">🛠️</div>
          <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Seo Tools Pro Studio
          </span>
        </div>
        
        <nav className="flex items-center space-x-1 md:space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline text-sm md:text-base">Home</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/about')}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3"
          >
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline text-sm md:text-base">About</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/contact')}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline text-sm md:text-base">Contact</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/bookmarks')}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3"
          >
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline text-sm md:text-base">Favorites</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tool-request')}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden lg:inline text-sm md:text-base">Request Tool</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/privacy-policy')}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3"
          >
            <Shield className="h-4 w-4" />
            <span className="hidden lg:inline text-sm md:text-base">Privacy</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/terms-of-service')}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden lg:inline text-sm md:text-base">Terms</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/cookie-policy')}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3"
          >
            <Cookie className="h-4 w-4" />
            <span className="hidden lg:inline text-sm md:text-base">Cookies</span>
          </Button>
          
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
