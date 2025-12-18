import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Globe } from "@/components/ui/globe";

export function AboutPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">About Me</h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          Get to know more about my journey, experience, and what drives me as a developer
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Bio */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icons.user className="w-5 h-5" />
                My Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                I&apos;m a passionate full-stack developer with over 2 years of experience building web applications 
                that make a difference. My journey started with a curiosity about how websites work, and it has 
                evolved into a deep love for creating digital solutions that solve real-world problems.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I specialize in modern JavaScript frameworks, particularly React and Node.js, but I&apos;m always 
                eager to learn new technologies. I believe in writing clean, maintainable code and creating 
                user experiences that are both beautiful and functional.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I&apos;m not coding, you can find me contributing to open-source projects, writing technical 
                blog posts, or mentoring aspiring developers. I&apos;m passionate about sharing knowledge and 
                helping others grow in their development journey.
              </p>
            </CardContent>
          </Card>

          {/* Experience Timeline */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Experience Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/20"></div>
                
                <div className="relative flex items-start gap-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-semibold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">Full Stack Developer</h3>
                    <p className="text-gray-400 text-sm">Aspiration  • 2025 </p>
                    <p className="text-gray-300 text-sm mt-2">
                      Leading development of scalable web applications using React, Node.js, and AWS.
                    </p>
                  </div>
                </div>
                
                <div className="relative flex items-start gap-4 mt-6">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">Full Stack Developer</h3>
                    <p className="text-gray-400 text-sm">Sparks To Ideas • 2024 - 2025</p>
                    <p className="text-gray-300 text-sm mt-2">
                      Built and maintained multiple client projects using modern web technologies.
                    </p>
                  </div>
                </div>
                
                
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Globe Visualization */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Icons.briefcase className="w-5 h-5" />
                Global Reach
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Globe 
                className="mx-auto" 
                width={280} 
                height={280} 
              />
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">Personal Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name</span>
                  <span className="text-white">Drumil Nikhare</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Age</span>
                  <span className="text-white">19</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white">Gujarat, India</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience</span>
                  <span className="text-white">2+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Languages</span>
                  <span className="text-white">English </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">Interests & Hobbies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-white/20 text-white">Open Source</Badge>
                <Badge variant="outline" className="border-white/20 text-white">Photography</Badge>
                <Badge variant="outline" className="border-white/20 text-white">Travel</Badge>
                <Badge variant="outline" className="border-white/20 text-white">Music</Badge>
                <Badge variant="outline" className="border-white/20 text-white">Gaming</Badge>
                <Badge variant="outline" className="border-white/20 text-white">Hiking</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-white font-semibold">Computer Science</h3>
                <p className="text-gray-400 text-sm">Silver Oak University • 2025</p>
                <p className="text-gray-300 text-sm mt-1">Bachelor&apos;s Degree</p>
              </div>
              <div>
                <h3 className="text-white font-semibold">Information Technology</h3>
                <p className="text-gray-400 text-sm">Silver Oak University • 2022 - 2025</p>
                <p className="text-gray-300 text-sm mt-1">Diploma</p>
              </div>
            </CardContent>
          </Card>

          {/* Resume Download */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full border-white/20 text-white hover:bg-white/5"
                asChild
              >
                <a href="/Drumil_Nikhare_resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Icons.fileText className="w-4 h-4 mr-2" />
                  See Resume
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}