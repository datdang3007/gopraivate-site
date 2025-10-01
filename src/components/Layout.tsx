import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <img 
                src="/gopraivate_v10.12.png" 
                alt="goprAIvate Logo" 
                className="h-8 w-8"
              />
              <span className="hidden font-bold sm:inline-block">
                goprAIvate
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <nav className="flex items-center space-x-8 text-sm font-medium">
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer"
                onClick={() => {
                  document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Problem
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer"
                onClick={() => {
                  document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Solutions
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer"
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                How it works
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer"
                onClick={() => {
                  document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Benefits
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer"
                onClick={() => {
                  document.getElementById('references')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                References
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer"
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-2 ml-auto">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
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
          </div>
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
