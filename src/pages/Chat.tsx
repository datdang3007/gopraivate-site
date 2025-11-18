import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { useSendMessage } from "@/api/hooks/useMessage";
import { useAIModelsWithFallback } from "@/api/hooks/useAIModels";
import { getClientIP } from "@/api/utils/ip";
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
  const sendMessageMutation = useSendMessage();
  const { models, isLoading: isLoadingModels, isUsingFallback } = useAIModelsWithFallback();

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

    // Check if user is authenticated
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("🔒 [Chat] User not authenticated, redirecting to login");
      navigate("/login", {
        state: {
          redirectTo: "/chat",
          message: "Please login to continue chatting",
          promptToResend: prompt,
        },
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentPrompt = prompt;
    setPrompt("");
    setIsLoading(true);

    try {
      const clientIP = await getClientIP();
      const payload = {
        token: token,
        user_id: localStorage.getItem("userId") || "anonymous_user",
        ip: clientIP,
        project_id: "AIC",
        agent_id: "b91fe95eef4b4296ab1ba04f445ecb16",
        user_input: currentPrompt,
        language: "en",
      };

      console.log("📤 [Chat] Sending message with payload:", payload);

      sendMessageMutation.mutate(payload, {
        onSuccess: (response) => {
          console.log("✅ [Chat] Message sent successfully:", response);
          
          let aiContent = "Message received successfully!";
          
          try {
            if (response.JSONraw) {
              const parsedData = JSON.parse(response.JSONraw);
              if (Array.isArray(parsedData) && parsedData.length > 0 && parsedData[0].chat_output) {
                aiContent = parsedData[0].chat_output;
              }
            }
          } catch (error) {
            console.error("❌ [Chat] Failed to parse JSONraw:", error);
          }
          
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "ai",
            content: aiContent,
            timestamp: new Date(),
            model: currentModel,
          };
          setMessages((prev) => [...prev, aiMessage]);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("❌ [Chat] Failed to send message:", error);
          
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "ai",
            content: "Sorry, I encountered an error while processing your message. Please try again.",
            timestamp: new Date(),
            model: currentModel,
          };
          setMessages((prev) => [...prev, errorMessage]);
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("💥 [Chat] Error preparing message:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Sorry, there was an error preparing your message. Please try again.",
        timestamp: new Date(),
        model: currentModel,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
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
          <div className="flex items-center space-x-3">
            <img
              src="/gopraivate_v10.12.png"
              alt="goprAIvate Logo"
              className="h-8 w-8"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">goprAIvate Chat</h1>
              <p className="text-sm text-gray-500">Private AI conversation</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Current Model Display */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700 font-medium">
                {models.find(model => model.name === currentModel)?.displayName || "ChatGPT"}
              </span>
              {isUsingFallback && (
                <span className="text-xs text-yellow-600" title="Using fallback models">⚠</span>
              )}
            </div>

            {/* Home Button */}
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100 rounded-lg h-9 w-9 transition-colors"
            >
              <Home className="w-4 h-4 text-gray-600" />
            </Button>
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
                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "ai" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-xs sm:max-w-md lg:max-w-2xl ${message.type === "user" ? "order-first" : ""}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.type === "user"
                        ? "bg-black text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
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
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-gray-500 hover:text-gray-700"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-gray-500 hover:text-gray-700"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-gray-500 hover:text-gray-700"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {message.type === "user" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
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
              <div className="flex items-center gap-2">
                {/* Mobile: Show essential controls only */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-gray-200 rounded-lg h-8 w-8 transition-colors"
                >
                  <Paperclip className="w-4 h-4 text-gray-600" />
                </Button>

                {/* Show model selector on tablet and up */}
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <Select value={currentModel} onValueChange={setCurrentModel} disabled={isLoadingModels}>
                    <SelectTrigger className="border-none bg-transparent text-sm text-gray-700 h-8 p-0 focus:ring-0 hover:bg-gray-200 rounded px-2 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.name}>
                          {model.displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isUsingFallback && (
                    <span className="text-xs text-yellow-600 ml-1" title="Using fallback models">⚠</span>
                  )}
                </div>

                <div className="hidden lg:block">
                  <Select defaultValue="medium">
                    <SelectTrigger className="border-none bg-transparent text-sm text-gray-700 h-8 p-0 focus:ring-0 hover:bg-gray-200 rounded px-2 transition-colors">
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

              <Button
                onClick={handleSend}
                size="sm"
                className="bg-black hover:bg-gray-800 text-white rounded-lg px-4 py-2 h-8 font-medium transition-colors shadow-sm"
                disabled={!prompt.trim() || isLoading}
              >
                <Send className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Send</span>
              </Button>
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