"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { PageType } from "@/components/layout";
import { useSearch } from "@/components/search-context";
import { SearchResults } from "@/components/search-results";

interface HeaderProps {
  onMenuClick: () => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const pageLabels = {
  home: "Home",
  about: "About Me", 
  skills: "Skills",
  projects: "Projects",
  contact: "Contact"
};

export function Header({ onMenuClick, currentPage, onNavigate }: HeaderProps) {
  const { performSearch } = useSearch();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [localQuery, setLocalQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalQuery(query);
    performSearch(query);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleCloseSearch = () => {
    setIsSearchFocused(false);
    setLocalQuery("");
    performSearch("");
  };

  return (
    <header className="border-b border-white/10 bg-black/50 backdrop-blur-md relative z-[100]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden text-white hover:bg-white/10"
          >
            <Icons.menu className="w-5 h-5" />
          </Button>
          
          <div className="text-sm text-gray-400">
            <span className="hidden sm:inline">Portfolio / </span>
            {pageLabels[currentPage]}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block w-64" ref={searchRef}>
            <Icons.search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search projects, skills..."
              value={localQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              className="pl-8 pr-8 py-1.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-sm w-full text-sm"
            />
            {localQuery && (
              <button
                onClick={handleCloseSearch}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Icons.x className="w-3.5 h-3.5" />
              </button>
            )}
            
            {isSearchFocused && (
              <SearchResults 
                onNavigate={onNavigate}
                onClose={handleCloseSearch}
              />
            )}
          </div>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/av2.jpeg" alt="Profile" />
            <AvatarFallback className="bg-white text-black text-xs font-semibold">DN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}