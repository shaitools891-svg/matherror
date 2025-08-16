import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Palette, Menu, X } from 'lucide-react';
import { mockData } from '../data/mock';

const Header = () => {
  const { currentTheme, changeTheme, themes } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: currentTheme.primary }}
            >
              ME
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: currentTheme.text }}>
                {mockData.siteInfo.name}
              </h1>
              <p className="text-sm text-gray-600">{mockData.siteInfo.tagline}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="#materials" className="text-gray-700 hover:text-gray-900 transition-colors">
              Materials
            </a>
            
            {/* Theme Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Palette className="w-4 h-4" />
                  Theme
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {themes.map((theme) => (
                  <DropdownMenuItem
                    key={theme.id}
                    onClick={() => changeTheme(theme.id)}
                    className={`cursor-pointer ${currentTheme.id === theme.id ? 'bg-gray-100' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: theme.primary }}
                      />
                      {theme.name}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-gray-700 hover:text-gray-900 transition-colors py-2">
                Home
              </a>
              <a href="#materials" className="text-gray-700 hover:text-gray-900 transition-colors py-2">
                Materials
              </a>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Choose Theme:</p>
                <div className="flex flex-wrap gap-2">
                  {themes.map((theme) => (
                    <Button
                      key={theme.id}
                      variant={currentTheme.id === theme.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => changeTheme(theme.id)}
                      className="text-xs"
                    >
                      <div 
                        className="w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: theme.primary }}
                      />
                      {theme.name}
                    </Button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;