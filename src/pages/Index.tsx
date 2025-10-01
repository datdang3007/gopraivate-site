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
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <div className="w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <img
                  src="/gopraivate_v10.12.png"
                  alt="goprAIvate Logo"
                  className="h-12 w-12 mr-4"
                />
                <h1 className="text-5xl font-bold text-gray-900">goprAIvate</h1>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Use AI Without Giving Away Sensitive Information. Leverage the
                power of LLMs without compromising privacy.
              </p>
            </div>

            {/* Chat Interface */}
            <div className="bg-gray-100 rounded-xl max-w-3xl mx-auto shadow-sm border border-gray-200">
              {/* Input Area */}
              <div className="relative p-4">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Paste or type your prompt... (e.g., Email sarah.lee@acme.com the Q4 forecast...)"
                  className="w-full bg-transparent border-none text-gray-900 placeholder:text-gray-500 text-base leading-relaxed resize-none focus:ring-0 focus:outline-none p-0 min-h-[60px]"
                />
                <Button
                  size="sm"
                  className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg p-2 h-8 w-8"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-3 px-4 pb-4 border-t border-gray-200 pt-3">
                {/* Attach File Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 hover:bg-gray-200 rounded h-8 w-8"
                >
                  <Paperclip className="w-4 h-4 text-gray-600" />
                </Button>

                {/* Model Selector */}
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <Select defaultValue="chatgpt">
                    <SelectTrigger className="border-none bg-transparent text-sm text-gray-700 h-8 p-0 focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chatgpt">ChatGPT</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                      <SelectItem value="gemini">Gemini</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Settings Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 hover:bg-gray-200 rounded h-8 w-8"
                >
                  <Settings className="w-4 h-4 text-gray-600" />
                </Button>

                {/* Privacy Level Selector */}
                <Select defaultValue="medium">
                  <SelectTrigger className="border-none bg-transparent text-sm text-gray-700 h-8 p-0 focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Privacy level: Low</SelectItem>
                    <SelectItem value="medium">
                      Privacy level: Medium
                    </SelectItem>
                    <SelectItem value="high">Privacy level: High</SelectItem>
                  </SelectContent>
                </Select>
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
