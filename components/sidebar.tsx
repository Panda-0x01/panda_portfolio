"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { PageType } from "@/components/layout";

const navigationItems = [
  { icon: Icons.home, label: "Home", id: "home" as PageType },
  { icon: Icons.user, label: "About Me", id: "about" as PageType },
  { icon: Icons.code, label: "Skills", id: "skills" as PageType },
  { icon: Icons.briefcase, label: "Projects", id: "projects" as PageType },
  { icon: Icons.mail, label: "Contact", id: "contact" as PageType },
];

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ currentPage, onPageChange, isMobile = false, onClose }: SidebarProps) {
  return (
    <div className={`${isMobile ? 'w-64' : 'w-64'} glass-sidebar flex flex-col h-full ${isMobile ? 'h-screen' : ''}`}>
      {/* Mobile Close Button */}
      {isMobile && onClose && (
        <div className="p-4 border-b border-white/10 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <Icons.x className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Profile Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/av2.jpeg" alt="Profile" />
            <AvatarFallback className="bg-white text-black font-semibold">DN</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-medium text-white">Drumil Nikhare</div>
            <div className="text-gray-400">Full Stack Developer</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start gap-3 text-left transition-all duration-200 ${
                  currentPage === item.id 
                    ? "bg-white/10 text-white border border-white/20" 
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => onPageChange(item.id)}
              >
                <IconComponent className="w-4 h-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}