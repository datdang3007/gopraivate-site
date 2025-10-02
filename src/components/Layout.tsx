import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: "Problem", id: "problem" },
    { label: "Solutions", id: "solutions" },
    { label: "How it works", id: "how-it-works" },
    { label: "Benefits", id: "benefits" },
    { label: "References", id: "references" },
    { label: "About", id: "about" },
  ];

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a className="flex items-center space-x-2" href="/">
              <img 
                src="/gopraivate_v10.12.png" 
                alt="goprAIvate Logo" 
                className="h-8 w-8"
              />
              <span className="font-bold text-lg">
                goprAIvate
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <nav className="flex items-center space-x-8 text-sm font-medium">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer"
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-2 ml-auto">
            {user ? (
              <>
                <span className="hidden sm:inline-block text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm">
                <a href="/login">Login</a>
              </Button>
            )}

            {/* Mobile Menu Trigger */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>

          {/* Mobile Menu Overlay */}
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                onClick={() => setIsOpen(false)}
              />
              <div className="fixed right-0 top-14 z-50 h-[calc(100vh-56px)] w-[300px] bg-white border-l shadow-lg lg:hidden overflow-y-auto">
                <div className="flex flex-col space-y-4 p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <img 
                      src="/gopraivate_v10.12.png" 
                      alt="goprAIvate Logo" 
                      className="h-8 w-8"
                    />
                    <span className="font-bold text-lg">goprAIvate</span>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {navigationItems.map((item) => (
                      <a
                        key={item.id}
                        className="text-lg font-medium transition-colors hover:text-gray-600 text-gray-800 cursor-pointer py-2 border-b border-gray-100"
                        onClick={() => handleNavClick(item.id)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>

                  {user && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-500 mb-4">
                        Signed in as: {user.email}
                      </p>
                      <Button variant="outline" size="sm" onClick={logout} className="w-full">
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-10">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            {/* Logo and Description */}
            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/gopraivate_v10.12.png" 
                  alt="goprAIvate Logo" 
                  className="h-8 w-8"
                />
                <span className="font-bold text-lg">goprAIvate</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Use AI Without Giving Away Sensitive Information. Leverage the power of LLMs without compromising privacy.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col space-y-3">
                <h3 className="font-semibold text-sm">Navigation</h3>
                <nav className="flex flex-col space-y-2">
                  <a
                    className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    onClick={() => {
                      document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Problem
                  </a>
                  <a
                    className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    onClick={() => {
                      document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Solutions
                  </a>
                  <a
                    className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    onClick={() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    How it works
                  </a>
                </nav>
              </div>

              <div className="flex flex-col space-y-3">
                <h3 className="font-semibold text-sm">Company</h3>
                <nav className="flex flex-col space-y-2">
                  <a
                    className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    onClick={() => {
                      document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Benefits
                  </a>
                  <a
                    className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    onClick={() => {
                      document.getElementById('references')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    References
                  </a>
                  <a
                    className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    onClick={() => {
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    About
                  </a>
                </nav>
              </div>

              <div className="flex flex-col space-y-3">
                <h3 className="font-semibold text-sm">Legal</h3>
                <nav className="flex flex-col space-y-2">
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </a>
                </nav>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              © 2025 goprAIvate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
