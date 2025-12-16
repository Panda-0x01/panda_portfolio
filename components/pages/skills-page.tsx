import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Icons.code,
    skills: [
      { name: "React", level: "Expert", color: "bg-green-500" },
      { name: "Next.js", level: "Expert", color: "bg-green-500" },
      { name: "TypeScript", level: "Advanced", color: "bg-blue-500" },
      { name: "Tailwind CSS", level: "Expert", color: "bg-green-500" },
      { name: "Vue.js", level: "Intermediate", color: "bg-yellow-500" },
      { name: "Angular", level: "Intermediate", color: "bg-yellow-500" }
    ]
  },
  {
    title: "Backend Development", 
    icon: Icons.server,
    skills: [
      { name: "Node.js", level: "Expert", color: "bg-green-500" },
      { name: "Python", level: "Advanced", color: "bg-blue-500" },
      { name: "Express.js", level: "Advanced", color: "bg-blue-500" },
      { name: "FastAPI", level: "Advanced", color: "bg-blue-500" },
      { name: "GraphQL", level: "Intermediate", color: "bg-yellow-500" },
      { name: "REST APIs", level: "Expert", color: "bg-green-500" }
    ]
  },
  {
    title: "Database & Tools",
    icon: Icons.briefcase,
    skills: [
      { name: "PostgreSQL", level: "Advanced", color: "bg-blue-500" },
      { name: "MongoDB", level: "Advanced", color: "bg-blue-500" },
      { name: "Redis", level: "Intermediate", color: "bg-yellow-500" },
      { name: "Docker", level: "Advanced", color: "bg-blue-500" },
      { name: "AWS", level: "Intermediate", color: "bg-yellow-500" },
      { name: "Git", level: "Expert", color: "bg-green-500" }
    ]
  },
  {
    title: "Mobile & Design",
    icon: Icons.user,
    skills: [
      { name: "React Native", level: "Advanced", color: "bg-blue-500" },
      { name: "Flutter", level: "Beginner", color: "bg-orange-500" },
      { name: "Figma", level: "Intermediate", color: "bg-yellow-500" },
      { name: "Adobe XD", level: "Intermediate", color: "bg-yellow-500" },
      { name: "UI/UX Design", level: "Advanced", color: "bg-blue-500" },
      { name: "Responsive Design", level: "Expert", color: "bg-green-500" }
    ]
  }
];

export function SkillsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Skills & Technologies</h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          My technical expertise and proficiency levels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card key={category.title} className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <IconComponent className="w-5 h-5" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${skill.color} shadow-lg`}></div>
                      <span className="text-white font-medium">{skill.name}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`
                        border-white/20 text-xs font-medium
                        ${skill.level === 'Expert' ? 'text-green-400 border-green-400/30' : ''}
                        ${skill.level === 'Advanced' ? 'text-blue-400 border-blue-400/30' : ''}
                        ${skill.level === 'Intermediate' ? 'text-yellow-400 border-yellow-400/30' : ''}
                        ${skill.level === 'Beginner' ? 'text-orange-400 border-orange-400/30' : ''}
                      `}
                    >
                      {skill.level}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}