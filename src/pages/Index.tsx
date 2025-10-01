import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Paperclip, Settings, Send } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <div className="w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src="/gopraivate_v10.12.png" 
                  alt="goprAIvate Logo" 
                  className="h-12 w-12 mr-4"
                />
                <h1 className="text-5xl font-bold text-gray-900">
                  goprAIvate
                </h1>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Use AI Without Giving Away Sensitive Information. Leverage the power of LLMs without compromising privacy.
              </p>
            </div>

            {/* Chat Interface */}
            <div className="bg-gray-50 rounded-2xl p-8 max-w-3xl mx-auto shadow-sm border border-gray-100">
              {/* Toolbar */}
              <div className="flex items-center gap-4 mb-6">
                {/* Attach File Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 hover:bg-gray-200 rounded-lg"
                >
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </Button>

                {/* Model Selector */}
                <Select defaultValue="chatgpt">
                  <SelectTrigger className="w-32 h-9 bg-white border-gray-200 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chatgpt">ChatGPT</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                    <SelectItem value="gemini">Gemini</SelectItem>
                  </SelectContent>
                </Select>

                {/* Settings Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 hover:bg-gray-200 rounded-lg"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                </Button>

                {/* Privacy Level Selector */}
                <Select defaultValue="medium">
                  <SelectTrigger className="w-44 h-9 bg-white border-gray-200 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Privacy level: Low</SelectItem>
                    <SelectItem value="medium">Privacy level: Medium</SelectItem>
                    <SelectItem value="high">Privacy level: High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Input Area */}
              <div className="relative">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Paste or type your prompt... (e.g., Email sarah.lee@acme.com the Q4 forecast...)"
                  className="w-full bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 text-base leading-relaxed resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl p-4 pr-16 min-h-[120px]"
                />
                <Button 
                  size="sm" 
                  className="absolute bottom-4 right-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg px-4 py-2 h-9"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Suggestion Tags */}
              <div className="flex flex-wrap gap-3 mt-6 justify-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-sm bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full px-4 py-2"
                >
                  Personal health
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-sm bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full px-4 py-2"
                >
                  My finances
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-sm bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full px-4 py-2"
                >
                  My business
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-sm bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full px-4 py-2"
                >
                  Contract review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MadeWithDyad />
    </Layout>
  );
};

export default Index;