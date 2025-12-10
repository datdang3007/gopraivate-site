
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStaticContent } from "@/api/hooks/useStaticContent";
import { getClientIP } from "@/api/utils/ip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MessageRenderer from "@/components/MessageRenderer";
import { Home, ArrowLeft, Bot } from "lucide-react";

interface StaticPageProps {
  slug: string;
  title: string;
}

const StaticPage: React.FC<StaticPageProps> = ({ slug, title }) => {
  const navigate = useNavigate();
  const staticContentMutation = useStaticContent();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      
      try {
        const clientIP = await getClientIP();
        
        const payload = {
          slug: slug,
          language: "en",
          project_id: import.meta.env.VITE_PROJECT_ID || "",
          ip: clientIP,
        };

        console.log(`📤 [${title}] Loading static content with payload:`, payload);

        staticContentMutation.mutate(payload, {
          onSuccess: (response) => {
            console.log(`✅ [${title}] Static content loaded successfully:`, response);
            
            if (response.success && response.variables?.body_md) {
              setContent(response.variables.body_md);
            } else {
              setContent(`# ${title}\n\nContent not available at the moment. Please try again later.`);
            }
            setIsLoading(false);
          },
          onError: (error) => {
            console.error(`❌ [${title}] Failed to load static content:`, error);
            setContent(`# ${title}\n\nError loading content. Please try again later.`);
            setIsLoading(false);
          },
        });
      } catch (error) {
        console.error(`💥 [${title}] Error preparing request:`, error);
        setContent(`# ${title}\n\nError loading content. Please try again later.`);
        setIsLoading(false);
      }
    };

    loadContent();
  }, [slug, title]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <img
              src="/gopraivate_v10.13.png"
              alt="goprAIvate Logo"
              className="h-8 w-8 object-cover rounded-full"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {title}
              </h1>
              <p className="text-sm text-gray-500">goprAIvate</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100 rounded-lg h-9 w-9 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100 rounded-lg h-9 w-9 transition-colors"
            >
              <Home className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8 lg:px-6">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Loading {title}...
                </h2>
                <div className="flex space-x-2 justify-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <Card className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="prose prose-gray max-w-none">
                <MessageRenderer
                  content={content}
                  fallback={
                    <div className="text-gray-900">
                      <h1 className="text-2xl font-bold mb-4">{title}</h1>
                      <p className="text-gray-600">Content not available.</p>
                    </div>
                  }
                />
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
