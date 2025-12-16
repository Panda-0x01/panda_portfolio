"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Get In Touch</h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          Let&apos;s work together on your next project or discuss opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-full">
                  <Icons.mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400">drumilnikhare29@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-full">
                  <Icons.user className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-gray-400">India</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/5" asChild>
                  <a href="https://github.com/Panda-0x01" target="_blank" rel="noopener noreferrer">
                    <Icons.github className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/5" asChild>
                  <a href="https://www.linkedin.com/in/drumilnikhare?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                    <Icons.linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/5" asChild>
                  <a href="mailto:drumilnikhare29@gmail.com">
                    <Icons.mail className="w-5 h-5" />
                  </a>
                </Button>
              </div>

              <div className="pt-4 border-t border-white/10">
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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Send Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-white font-medium">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Your name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-white font-medium">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-white font-medium">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 min-h-[120px]"
                  placeholder="Tell me about your project..."
                />
              </div>

              {submitStatus === "success" && (
                <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-md">
                  <p className="text-green-400 text-sm">Message sent successfully! I&apos;ll get back to you soon.</p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md">
                  <p className="text-red-400 text-sm">Failed to send message. Please try again or contact me directly.</p>
                </div>
              )}
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Icons.mail className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}