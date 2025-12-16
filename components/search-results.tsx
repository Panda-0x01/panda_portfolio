"use client";

import { useSearch } from "@/components/search-context";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { PageType } from "@/components/layout";

interface SearchResultsProps {
  onNavigate: (page: PageType) => void;
  onClose: () => void;
}

export function SearchResults({ onNavigate, onClose }: SearchResultsProps) {
  const { searchQuery, searchResults, isSearching } = useSearch();

  if (!searchQuery) return null;

  const handleResultClick = (page: string) => {
    onNavigate(page as PageType);
    onClose();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Icons.briefcase className="w-3 h-3 text-blue-400" />;
      case 'skill':
        return <Icons.code className="w-3 h-3 text-green-400" />;
      case 'experience':
        return <Icons.user className="w-3 h-3 text-purple-400" />;
      default:
        return <Icons.search className="w-3 h-3 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case 'skill':
        return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'experience':
        return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      default:
        return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 z-[9999] search-dropdown">
      <div className="bg-black/95 backdrop-blur-xl border border-white/30 rounded-lg shadow-2xl max-h-64 overflow-y-auto scrollbar-hide w-full">
        {isSearching ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2 text-gray-400">
              <Icons.search className="w-4 h-4 animate-pulse" />
              <span className="text-sm">Searching...</span>
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="p-2.5">
            <div className="text-xs text-gray-400 mb-2 pb-1.5 border-b border-white/10">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
            </div>
            <div className="space-y-1.5">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="p-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all duration-200 group"
                  onClick={() => handleResultClick(result.page)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        {getTypeIcon(result.type)}
                        <h3 className="text-white font-medium text-xs truncate group-hover:text-blue-300 transition-colors">
                          {result.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-xs leading-tight line-clamp-2">
                        {result.content}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-1.5 py-0.5 ${getTypeColor(result.type)}`}
                      >
                        {result.type}
                      </Badge>
                      <span className="text-xs text-gray-500 capitalize font-medium">
                        {result.page}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-gray-400">
            <Icons.search className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm font-medium mb-1">No results found for &quot;{searchQuery}&quot;</p>
            <p className="text-xs text-center">Try searching for projects, skills, or technologies</p>
          </div>
        )}
      </div>
    </div>
  );
}