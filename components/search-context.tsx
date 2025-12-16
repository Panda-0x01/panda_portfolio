"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  page: string;
  type: 'project' | 'skill' | 'experience' | 'general';
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  performSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Sample searchable content
const searchableContent: SearchResult[] = [
  // Projects
  {
    id: "zeno",
    title: "Zeno - Local AI Desktop Assistant",
    content: "A cross-platform desktop AI assistant powered by Ollama, featuring voice I/O, local-first privacy, and extensible plugin system. Built with Electron, React, Ollama, TypeScript, Tauri",
    page: "projects",
    type: "project"
  },
  {
    id: "boing",
    title: "Boing - API Abuse & Cybersecurity Monitoring Platform",
    content: "A production-ready platform for monitoring APIs and user accounts, detecting suspicious activity, and sending real-time alerts. Built with Next.js, Supabase, TypeScript, Tailwind CSS, Prisma",
    page: "projects",
    type: "project"
  },
  {
    id: "weather",
    title: "Weather Dashboard",
    content: "Responsive weather dashboard with location-based forecasts, interactive maps, and weather alerts using OpenWeather API. Built with Vue.js, Express, Chart.js",
    page: "projects",
    type: "project"
  },
  // Skills
  {
    id: "react",
    title: "React",
    content: "Expert level proficiency in React development, component architecture, hooks, state management",
    page: "skills",
    type: "skill"
  },
  {
    id: "nextjs",
    title: "Next.js",
    content: "Expert level proficiency in Next.js framework, SSR, SSG, API routes, performance optimization",
    page: "skills",
    type: "skill"
  },
  {
    id: "typescript",
    title: "TypeScript",
    content: "Advanced level proficiency in TypeScript, type safety, interfaces, generics",
    page: "skills",
    type: "skill"
  },
  {
    id: "nodejs",
    title: "Node.js",
    content: "Expert level proficiency in Node.js backend development, APIs, server-side applications",
    page: "skills",
    type: "skill"
  },
  {
    id: "python",
    title: "Python",
    content: "Advanced level proficiency in Python development, web frameworks, data processing",
    page: "skills",
    type: "skill"
  },
  // Experience
  {
    id: "senior-dev",
    title: "Senior Full Stack Developer",
    content: "TechCorp Inc. Leading development of scalable web applications using React, Node.js, and AWS",
    page: "about",
    type: "experience"
  },
  {
    id: "fullstack-dev",
    title: "Full Stack Developer",
    content: "StartupXYZ Built and maintained multiple client projects using modern web technologies",
    page: "about",
    type: "experience"
  },
  // General
  {
    id: "contact-info",
    title: "Contact Information",
    content: "Get in touch for collaboration, projects, or opportunities. Available for freelance work and consulting",
    page: "contact",
    type: "general"
  },
  {
    id: "about-me",
    title: "About Panda",
    content: "Passionate full-stack developer with over 5 years of experience building web applications. San Francisco based developer specializing in React, Node.js, and modern web technologies",
    page: "about",
    type: "general"
  }
];

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Simulate search delay
    setTimeout(() => {
      const results = searchableContent.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      searchResults,
      isSearching,
      performSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}