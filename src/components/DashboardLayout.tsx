import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

// Route metadata interface
export interface RouteMetadata {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  headerActions?: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
  showHomeButton?: boolean;
}

// Route configuration map
const routeConfig: Record<string, RouteMetadata> = {
  "/chat": {
    title: "goprAIvate Chat",
    description: "Private AI conversation",
    icon: (
      <img
        src="/gopraivate_v10.13.png"
        alt="goprAIvate Logo"
        className="h-8 w-8 object-cover rounded-full"
      />
    ),
    contentClassName: "bg-gray-50 p-0",
  },
  "/statistics": {
    title: "Statistics Dashboard",
    description: "Monitor your AI gateway usage and security",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
  },
};

// Context for outlet to pass dynamic headerActions
export const DashboardLayoutContext = React.createContext<{
  setHeaderActions: (actions: React.ReactNode) => void;
}>({
  setHeaderActions: () => {},
});

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dynamicHeaderActions, setDynamicHeaderActions] =
    useState<React.ReactNode>(null);

  // Get route configuration or use defaults
  const config = routeConfig[location.pathname] || {
    title: "Dashboard",
    description: "",
  };

  const {
    title,
    description,
    icon,
    contentClassName,
    headerClassName,
    showHomeButton = true,
  } = config;

  // Use dynamic headerActions if provided, otherwise use from config
  const headerActions = dynamicHeaderActions || config.headerActions;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="transition-all duration-200 ease-in-out min-w-0">
        <div className="flex flex-col h-screen w-full min-w-0 overflow-hidden">
          {/* Content Header */}
          <header
            className={cn(
              "bg-background border-b border-border px-4 py-4 lg:px-6 shadow-sm",
              headerClassName
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <SidebarTrigger className="mr-2 cursor-pointer transition-colors duration-200 hover:bg-accent rounded-md p-1 shrink-0" />
                {icon && (
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    {icon}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl font-semibold text-foreground truncate">
                    {title}
                  </h1>
                  {description && (
                    <p className="text-sm text-muted-foreground truncate">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {headerActions}
                {showHomeButton && (
                  <Button
                    onClick={() => navigate("/")}
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-accent rounded-lg h-9 w-9 transition-colors duration-200 cursor-pointer"
                    aria-label="Go to home"
                  >
                    <Home className="w-4 h-4 text-muted-foreground" />
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main
            className={cn(
              "flex-1 overflow-y-auto p-6 bg-muted/30 min-w-0",
              contentClassName
            )}
          >
            <DashboardLayoutContext.Provider
              value={{ setHeaderActions: setDynamicHeaderActions }}
            >
              <Outlet />
            </DashboardLayoutContext.Provider>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
