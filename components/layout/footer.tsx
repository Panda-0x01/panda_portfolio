import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/data";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="serif font-bold text-xl text-foreground block mb-3 hover:opacity-70 transition-opacity">
              Drumil Nikhare
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Security Engineer &amp; SOC Analyst.<br />
              Based in India.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label text-muted-foreground mb-5">Navigation</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="label text-muted-foreground mb-5">Connect</p>
            <div className="space-y-2">
              <a href={`mailto:${siteConfig.email}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {siteConfig.email}
              </a>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <GithubIcon size={13} /> GitHub
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <LinkedinIcon size={13} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex justify-center">
          <p className="label text-muted-foreground">&copy; {new Date().getFullYear()} Drumil Nikhare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

