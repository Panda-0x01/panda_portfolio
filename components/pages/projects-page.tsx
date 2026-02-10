import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";

const projects = [
  {
    title: "Zeno - Local AI Desktop Assistant",
    description: "A cross-platform desktop AI assistant powered by Ollama, featuring voice I/O, local-first privacy, and extensible plugin system.",
    technologies: ["Electron", "React", "Ollama", "TypeScript", "Tauri"],
    status: "Completed",
    year: "2025",
    liveUrl: "https://zeno-main.vercel.app",
    githubUrl: "https://github.com/Panda-0x01/zeno_AI"
  },
  {
    title: "Boing - API Abuse & Cybersecurity Monitoring Platform",
    description: "A production-ready platform for monitoring APIs and user accounts, detecting suspicious activity, and sending real-time alerts.",
    technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Prisma"],
    status: "In Progress",
    year: "2025",
    liveUrl: "https://boing-main.vercel.app",
    githubUrl: "https://github.com/Panda-0x01/Boing_API"
  },
  {
    title: "neoNet",
    description: "A lightweight, cross-platform CLI cybersecurity toolkit for network reconnaissance and security testing. Designed for penetration testers, security professionals, and network administrators.",
    technologies: ["Vue.js", "Express", "Chart.js", "API Integration"],
    status: "Completed",
    year: "2025",
    liveUrl: "https://github.com/Panda-0x01/neoNet",
    githubUrl: "https://github.com/Panda-0x01/neoNet"
  },
  {
    title: "F1 Race Prediction System (2025)",
    description: "The F1 Race Prediction System is a machine learning project that predicts the winners of the upcoming Formula 1 season (2025) based on historical race data (2023–2024)",
    technologies: ["React", "Python", "FastAPI", "PostgreSQL"],
    status: "Completed",
    year: "2025",
    liveUrl: "https://github.com/Panda-0x01/F1_Race_Prediction_System_2025",
    githubUrl: "https://github.com/Panda-0x01/F1_Race_Prediction_System_2025"
  }
];

export function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">My Projects</h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          A showcase of my recent work and personal projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="glass-card border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-white text-xl">{project.title}</CardTitle>
                <Badge 
                  variant="outline" 
                  className={`border-white/20 ${
                    project.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'
                  }`}
                >
                  {project.status}
                </Badge>
              </div>
              <p className="text-gray-400 text-sm">{project.year}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-white/10 text-white border-white/20">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="bg-white text-black hover:bg-gray-200 transition-colors"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  disabled={project.liveUrl === '#'}
                >
                  <Icons.externalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-white/20 text-white hover:bg-white/5"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                  disabled={project.githubUrl === '#'}
                >
                  <Icons.github className="w-4 h-4 mr-2" />
                  Source Code
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
