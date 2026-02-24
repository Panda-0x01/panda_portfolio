import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MeetingScheduler } from "@/components/meeting-scheduler";

export function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-r from-gray-900 via-black to-gray-800 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Welcome to My Portfolio</h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg">Full Stack Developer & Creative Problem Solver</p>
            <Badge className="mt-2 sm:mt-3 bg-white/10 text-white border-white/20 text-xs sm:text-sm">
              Available for Work
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recent Activity */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icons.home className="w-5 h-5" />
                Visit these sites
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-white">
                    <span className="font-medium">Boing</span> - API Abuse & Cybersecurity Monitoring Platform
                  </p>
                  <p className="text-gray-400 text-sm mt-1">Latest project</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 border-white/20 text-white hover:bg-white/5 text-xs"
                    asChild
                  >
                    <a href="https://boing-main.vercel.app/" target="_blank" rel="noopener noreferrer">
                      Visit this site
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-white">
                    <span className="font-medium">Zeno</span> - Local AI Desktop Assistant
                  </p>
                  <p className="text-gray-400 text-sm mt-1">Recent project</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 border-white/20 text-white hover:bg-white/5 text-xs"
                    asChild
                  >
                    <a href="https://zeno-main.vercel.app/" target="_blank" rel="noopener noreferrer">
                      Visit this site
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="glass-card border-white/10">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">10+</div>
                <div className="text-gray-400 text-sm sm:text-base">Projects Completed</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/10">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">2+</div>
                <div className="text-gray-400 text-sm sm:text-base">Years Experience</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                Passionate full-stack developer with expertise in modern web technologies. 
                I love creating beautiful, functional applications that solve real-world problems.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Icons.user className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">India</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icons.mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">drumilnikhare29@gmail.com</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-white text-black hover:bg-gray-200 transition-colors" asChild>
                <a href="mailto:drumilnikhare29@gmail.com">
                  <Icons.mail className="w-4 h-4 mr-2" />
                  Contact Me
                </a>
              </Button>
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
              <MeetingScheduler>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/5"
                  suppressHydrationWarning
                >
                  <Icons.calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </MeetingScheduler>
              <div className="pt-2 border-t border-white/10">
                <p className="text-gray-400 text-xs mb-3">Social Links</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5" asChild>
                    <a href="https://github.com/Panda-0x01" target="_blank" rel="noopener noreferrer">
                      <Icons.github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5" asChild>
                    <a href="https://www.linkedin.com/in/drumilnikhare?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                      <Icons.linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}