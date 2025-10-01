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
import { Paperclip, Settings, Send } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[75vh] px-4">
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
            <div className="bg-white rounded-2xl max-w-4xl mx-auto shadow-lg border border-gray-200 overflow-hidden">
              {/* Input Area */}
              <div className="p-6">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Paste or type your prompt... (e.g., Email sarah.lee@acme.com the Q4 forecast...)"
                  className="w-full bg-transparent border-none text-gray-900 placeholder:text-gray-400 text-base leading-relaxed resize-none focus:ring-0 focus:outline-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 min-h-[80px] max-h-[200px]"
                />
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  {/* Attach File Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-gray-200 rounded-lg h-9 w-9 transition-colors"
                  >
                    <Paperclip className="w-4 h-4 text-gray-600" />
                  </Button>

                  {/* Model Selector */}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <Select defaultValue="chatgpt">
                      <SelectTrigger className="border-none bg-transparent text-sm text-gray-700 h-8 p-0 focus:ring-0 hover:bg-gray-200 rounded px-2 transition-colors">
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
                    className="p-2 hover:bg-gray-200 rounded-lg h-9 w-9 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-600" />
                  </Button>

                  {/* Privacy Level Selector */}
                  <Select defaultValue="medium">
                    <SelectTrigger className="border-none bg-transparent text-sm text-gray-700 h-8 p-0 focus:ring-0 hover:bg-gray-200 rounded px-2 transition-colors">
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

                {/* Send Button */}
                <Button
                  size="sm"
                  className="bg-black hover:bg-gray-800 text-white rounded-lg px-6 py-2 h-9 font-medium transition-colors shadow-sm"
                  disabled={!prompt.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* What's the problem section */}
        <div className="bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What's the problem?
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div>
                <span className="font-semibold text-gray-900">
                  AI tools are powerful—but risky.
                </span>{" "}
                Generative AI (e.g., ChatGPT) streamlines email writing, report
                reviews, coding and more. But these benefits come with massive
                data privacy concerns, which is why many enterprises block
                public AI tools internally.
              </div>

              <div>
                <span className="font-semibold text-gray-900">
                  Real incidents, real exposure.
                </span>{" "}
                Sensitive content pasted into cloud models can be logged,
                retained for model improvement or monitoring, and inadvertently
                revealed.
              </div>

              <div>
                <span className="font-semibold text-gray-900">
                  Training retention risks.
                </span>{" "}
                Some systems can memorize and regurgitate personal data present
                in training or telemetry—leading to unintentional disclosure of
                PII.
              </div>
            </div>
          </div>
        </div>

        {/* Solutions section */}
        <div className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Solutions</h2>

            {/* Tab buttons */}
            <div className="flex gap-2 mb-12">
              <Button className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium">
                Private
              </Button>
              <Button
                variant="outline"
                className="px-6 py-2 rounded-full text-sm font-medium border-gray-300 text-gray-700"
              >
                Teams & Businesses
              </Button>
            </div>

            {/* Private solutions grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Row 1 */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Automatic PII Redaction
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Names, emails, phone numbers, addresses, and IDs are removed
                  in real time.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  IP & Location Shielding
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your IP address and geolocation remain hidden from AI
                  providers.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Zero Data Retention
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your prompts aren't stored, logged, or reused for training.
                </p>
              </div>

              {/* Row 2 */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Placeholder Reinsertion
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sanitized queries are processed, then placeholders are
                  restored in responses.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Data Never Shared
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sensitive information never reaches external AI providers.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Provider Independence
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Agnostic to the specific AI, no vendor lock-in. Switch freely
                  between open-source and closed-source models.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;