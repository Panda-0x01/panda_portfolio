"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { HomePage } from "@/components/pages/home-page";
import { AboutPage } from "@/components/pages/about-page";
import { SkillsPage } from "@/components/pages/skills-page";
import { ProjectsPage } from "@/components/pages/projects-page";
import { ContactPage } from "@/components/pages/contact-page";
import { SearchProvider } from "@/components/search-context";

export type PageType = "home" | "about" | "skills" | "projects" | "contact";

export function Layout() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "about":
        return <AboutPage />;
      case "skills":
        return <SkillsPage />;
      case "projects":
        return <ProjectsPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // Close mobile menu when page changes
  };

  return (
    <SearchProvider>
      <div className="min-h-screen bg-black text-white flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="relative">
              <Sidebar 
                currentPage={currentPage} 
                onPageChange={handlePageChange}
                isMobile={true}
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0">
          <Header 
            onMenuClick={() => setIsMobileMenuOpen(true)}
            currentPage={currentPage}
            onNavigate={handlePageChange}
          />
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </SearchProvider>
  );
}