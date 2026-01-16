import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  MessageSquare,
  BarChart3,
  Settings,
  MessageSquareMore,
  FileText,
  MessageCircle,
  Plus,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: Date;
  category: string;
}

interface ChatHistoryCategory {
  label: string;
  items: ChatHistoryItem[];
}

// Mock chat history data
const mockChatHistory: ChatHistoryCategory[] = [
  {
    label: "Recents",
    items: [
      {
        id: "1",
        title: "VB.NET dashboard data function...",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        category: "Recents",
      },
      {
        id: "2",
        title: "Deck refinement and pitch prepar...",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        category: "Recents",
      },
      {
        id: "3",
        title: "Deck refinement and pitch prepar...",
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
        category: "Recents",
      },
      {
        id: "4",
        title: "Untitled",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        category: "Recents",
      },
      {
        id: "5",
        title: "GoPrivate pitch deck for telecom...",
        timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
        category: "Recents",
      },
      {
        id: "6",
        title: "Evaluating EU tender eligibility for...",
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        category: "Recents",
      },
      {
        id: "7",
        title: "Federal Reserve politicization and...",
        timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
        category: "Recents",
      },
      {
        id: "8",
        title: "RoHS compliance adjacency matri...",
        timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
        category: "Recents",
      },
      {
        id: "9",
        title: "Refactoring LLM functions for Gr...",
        timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
        category: "Recents",
      },
      {
        id: "10",
        title: "RoHS data row requirements",
        timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
        category: "Recents",
      },
      {
        id: "11",
        title: "Untitled",
        timestamp: new Date(Date.now() - 1000 * 60 * 420), // 7 hours ago
        category: "Recents",
      },
    ],
  },
  {
    label: "Today",
    items: [
      {
        id: "12",
        title: "API integration patterns for microservices",
        timestamp: new Date(Date.now() - 1000 * 60 * 480), // 8 hours ago
        category: "Today",
      },
      {
        id: "13",
        title: "Database optimization strategies",
        timestamp: new Date(Date.now() - 1000 * 60 * 540), // 9 hours ago
        category: "Today",
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      {
        id: "14",
        title: "React component architecture review",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
        category: "Yesterday",
      },
      {
        id: "15",
        title: "TypeScript best practices discussion",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), // Yesterday
        category: "Yesterday",
      },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      label: "New Chat",
      icon: Plus,
      path: "/chat",
    },
    {
      label: "Chats",
      icon: MessageSquare,
      disabled: true,
    },
    {
      label: "Rewritten Chats",
      icon: MessageSquareMore,
      disabled: true,
    },
    {
      label: "PII-Redacted Chats",
      icon: FileText,
      disabled: true,
    },
    {
      label: "Answers",
      icon: MessageCircle,
      disabled: true,
    },
    {
      label: "Statistics",
      icon: BarChart3,
      path: "/statistics",
      disabled: false,
    },
    {
      label: "Settings",
      icon: Settings,
      disabled: true,
    },
  ];

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const handleChatClick = (chatId: string) => {
    navigate("/chat", { state: { chatId } });
  };

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Navigation Items */}
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      onClick={() => {
                        if (!item.disabled && item.path) {
                          navigate(item.path);
                        }
                      }}
                      disabled={item.disabled}
                      isActive={item.path ? isActive(item.path) : false}
                      className={cn(
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span
                        className={cn("group-data-[collapsible=icon]:hidden")}
                      >
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Chat History by Category */}
        {mockChatHistory.map((category) => (
          <SidebarGroup key={category.label}>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
              {category.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {category.items.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton
                      onClick={() => handleChatClick(chat.id)}
                      className="text-left"
                      size="sm"
                    >
                      <Clock className="h-4 w-4 shrink-0" />
                      <span
                        className={cn(
                          "truncate group-data-[collapsible=icon]:hidden",
                          chat.title === "Untitled" && "text-muted-foreground"
                        )}
                        title={chat.title}
                      >
                        {chat.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
