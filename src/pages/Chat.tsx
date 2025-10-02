import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Paperclip,
  Settings,
  Send,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  User,
  Bot,
  Home, // Import Home icon
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  model?: string;
}

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const initialPrompt = location.state?.initialPrompt || "";

  const [prompt, setPrompt] = useState(initialPrompt);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentModel, setCurrentModel] = useState("chatgpt"); // State to manage current model

  // Auto-send initial prompt if provided
  useEffect(() => {
    if (initialPrompt) {
      handleSend();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "This is a simulated AI response. In a real implementation, this would be connected to your chosen AI model with privacy protection enabled.",
        timestamp: new Date(),
        model: currentModel, // Use the selected model
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSendWithModelChange = (model: string) => {
    setCurrentModel(model); // Update the current model
    handleSend(); // Then send the message
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <img
              src="/gopraivate_v10.12.png"
              alt="goprAIvate Logo"
              className="h-8 w-8 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold text-gray-900 truncate">goprAIvate Chat</h1>
              <p className="text-sm text-gray-500 hidden sm:block">Private AI conversation</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Current Model Display - Hidden on very small screens */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700 font-medium">
                {currentModel === "chatgpt" ? "ChatGPT" : 
                 currentModel === "claude" ? "Claude" : 
                 currentModel === "gemini" ? "Gemini" : "ChatGPT"}
              </span>
            </div>

            {/* Home Button */}
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-lg h-9 w-9 transition-colors flex items-center justify-center"
            >
              <Home className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 lg:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Start a conversation
                </h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Your messages are automatically protected with PII redaction
                  and privacy shielding.
                </p>
              </div>

              {/* Suggested prompts */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
                <Card
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow border-dashed"
                  onClick={() =>
                    setPrompt("Help me write a professional email")
                  }
                >
                  <p className="text-sm text-gray-700">
                    Help me write a professional email
                  </p>
                </Card>
                <Card
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow border-dashed"
                  onClick={() => setPrompt("Explain this code to me")}
                >
                  <p className="text-sm text-gray-700">
                    Explain this code to me
                  </p>
                </Card>
                <Card
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow border-dashed"
                  onClick={() => setPrompt("Summarize this document")}
                >
                  <p className="text-sm text-gray-700">
                    Summarize this document
                  </p>
                </Card>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 sm:gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "ai" && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-[250px] sm:max-w-md lg:max-w-2xl ${message.type === "user" ? "order-first" : ""}`}
                >
                  <div
                    className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                      message.type === "user"
                        ? "bg-black text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-2 mt-2 text-xs text-gray-500 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.model && <span>• {message.model}</span>}
                  </div>

                  {message.type === "ai" && (
                    <div className="flex items-center gap-1 sm:gap-2 mt-2">
                      <button className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                        <Copy className="w-3 h-3" />
                      </button>
                      <button className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                      <button className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {message.type === "user" && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex space-x-2">
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
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
            {/* Textarea */}
            <div className="p-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (your privacy is protected)"
                className="w-full bg-transparent border-none text-gray-900 placeholder:text-gray-400 text-sm leading-relaxed resize-none focus:ring-0 focus:outline-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 min-h-[60px] max-h-[120px]"
              />
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Mobile: Only essential controls */}
                <div className="flex sm:hidden items-center gap-2 flex-1">
                  {/* Attach File Button */}
                  <button
                    type="button"
                    className="flex-shrink-0 p-2 hover:bg-gray-200 rounded-lg h-8 w-8 transition-colors flex items-center justify-center"
                  >
                    <Paperclip className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  {/* Model indicator dot only */}
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                </div>

                {/* Tablet: Show model name */}
                <div className="hidden sm:flex md:hidden items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    className="flex-shrink-0 p-2 hover:bg-gray-200 rounded-lg h-8 w-8 transition-colors flex items-center justify-center"
                  >
                    <Paperclip className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600 font-medium">
                      {currentModel === "chatgpt" ? "GPT" : 
                       currentModel === "claude" ? "Claude" : 
                       currentModel === "gemini" ? "Gemini" : "GPT"}
                    </span>
                  </div>
                </div>

                {/* Desktop: Full controls */}
                <div className="hidden md:flex items-center gap-3 flex-1">
                  <button
                    type="button"
                    className="flex-shrink-0 p-2 hover:bg-gray-200 rounded-lg h-8 w-8 transition-colors flex items-center justify-center"
                  >
                    <Paperclip className="w-4 h-4 text-gray-600" />
                  </button>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <Select value={currentModel} onValueChange={setCurrentModel}>
                      <SelectTrigger className="border-none bg-transparent text-sm text-gray-700 h-8 px-2 focus:ring-0 hover:bg-gray-200 rounded transition-colors min-w-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chatgpt">ChatGPT</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                        <SelectItem value="gemini">Gemini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="hidden lg:flex items-center flex-shrink-0">
                    <Select defaultValue="medium">
                      <SelectTrigger className="border-none bg-transparent text-sm text-gray-700 h-8 px-2 focus:ring-0 hover:bg-gray-200 rounded transition-colors min-w-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Privacy: Low</SelectItem>
                        <SelectItem value="medium">Privacy: Medium</SelectItem>
                        <SelectItem value="high">Privacy: High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!prompt.trim() || isLoading}
                className="flex-shrink-0 ml-2 sm:ml-3 bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg px-2 sm:px-3 py-2 h-8 font-medium transition-colors shadow-sm flex items-center gap-1 sm:gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>

          {/* Privacy notice */}
          <p className="text-xs text-gray-500 text-center mt-3">
            🔒 Your messages are automatically protected with PII redaction and
            IP masking
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;