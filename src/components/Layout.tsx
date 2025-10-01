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
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 goprAIvate. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
