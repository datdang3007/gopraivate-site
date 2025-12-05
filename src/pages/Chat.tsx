import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSendMessage, useChatHistory } from "@/api/hooks/useMessage";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Home,
  Info, // Import Info icon for format guide
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  model?: string;
}

const MESSAGES_PER_LOAD = 10;

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const initialPrompt = location.state?.initialPrompt || "";
  const selectedModelFromIndex = location.state?.selectedModel || "10"; // Get selected model from Index
  const selectedPrivacyFromIndex = location.state?.selectedPrivacy || "medium"; // Get selected privacy from Index
  const sendMessageMutation = useSendMessage();
  const chatHistoryMutation = useChatHistory();
  const {
    models,
    isLoading: isLoadingModels,
    isUsingFallback,
  } = useAIModelsWithFallback(false); // Allow auto redirect on 401

  const [prompt, setPrompt] = useState(initialPrompt);
  const [messages, setMessages] = useState<Message[]>([]);
  const [allMessages, setAllMessages] = useState<Message[]>([]); // Store all messages
  const [displayedMessageCount, setDisplayedMessageCount] = useState(10); // Number of messages to display
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [currentModel, setCurrentModel] = useState(selectedModelFromIndex); // Use selected model from Index
  const [currentPrivacy, setCurrentPrivacy] = useState(
    selectedPrivacyFromIndex,
  ); // Use selected privacy from Index
  const [showFormatGuide, setShowFormatGuide] = useState(false);

  // Refs for scroll management
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Scroll to bottom immediately (without smooth animation)
  const scrollToBottomImmediate = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  // Handle scroll event to load more messages
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    // Save current scroll state before loading
    const previousScrollHeight = container.scrollHeight;
    const previousScrollTop = container.scrollTop;

    // Check if scrolled to top and there are more messages to load
    if (previousScrollTop === 0 && displayedMessageCount < allMessages.length) {
      setIsLoadingMore(true);

      // Simulate loading delay for better UX
      setTimeout(() => {
        const messagesLeft = allMessages.length - displayedMessageCount;
        const extendCount =
          messagesLeft >= MESSAGES_PER_LOAD ? MESSAGES_PER_LOAD : messagesLeft;
        const newCount = displayedMessageCount + extendCount;
        setDisplayedMessageCount(newCount);
        setIsLoadingMore(false);

        // Maintain scroll position after content is added
        requestAnimationFrame(() => {
          if (container) {
            const newScrollHeight = container.scrollHeight;
            const heightDifference = newScrollHeight - previousScrollHeight;
            container.scrollTo({
              top: previousScrollTop + heightDifference,
              behavior: "instant",
            });
          }
        });
      }, 300);
    }
  }, [displayedMessageCount, allMessages.length]);

  // Update displayed messages when displayedMessageCount or allMessages change
  useEffect(() => {
    if (allMessages.length > 0) {
      const startIndex = Math.max(
        0,
        allMessages.length - displayedMessageCount,
      );
      setMessages(allMessages.slice(startIndex));
    }
  }, [allMessages, displayedMessageCount]);

  const loadChatHistory = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("🔒 [Chat] User not authenticated, skipping history load");
      setHistoryLoaded(true);
      return;
    }

    setIsLoadingHistory(true);

    try {
      const clientIP = await getClientIP();
      const payload = {
        token: token,
        user_id: localStorage.getItem("userId") || "anonymous_user",
        ip: clientIP,
        project_id: import.meta.env.VITE_PROJECT_ID || "",
        agent_id: "b91fe95eef4b4296ab1ba04f445ecb16",
        language: "en",
      };

      console.log("📤 [Chat] Loading chat history with payload:", payload);

      chatHistoryMutation.mutate(payload, {
        onSuccess: (response) => {
          console.log("✅ [Chat] Chat history loaded successfully:", response);

          try {
            if (response.JSONraw) {
              const parsedData = JSON.parse(response.JSONraw);
              if (Array.isArray(parsedData)) {
                // Sort by updated_at to maintain chronological order (oldest first)
                const sortedData = parsedData.sort(
                  (a, b) =>
                    new Date(a.updated_at).getTime() -
                    new Date(b.updated_at).getTime(),
                );

                // Load all messages at once
                const historyMessages = loadMessagesFromData(sortedData);
                setAllMessages(historyMessages);
                setDisplayedMessageCount(Math.min(10, historyMessages.length));
              }
            }
          } catch (error) {
            console.error(
              "❌ [Chat] Failed to parse chat history JSONraw:",
              error,
            );
          }

          setHistoryLoaded(true);
          setIsLoadingHistory(false);
        },
        onError: (error) => {
          console.error("❌ [Chat] Failed to load chat history:", error);
          setHistoryLoaded(true);
          setIsLoadingHistory(false);
        },
      });
    } catch (error) {
      console.error("💥 [Chat] Error preparing chat history request:", error);
      setHistoryLoaded(true);
      setIsLoadingHistory(false);
    }
  };

  // Helper function to convert history data to messages
  const loadMessagesFromData = (data: any[]): Message[] => {
    const historyMessages: Message[] = [];

    data.forEach((item, index) => {
      const timestamp = new Date(item.updated_at || Date.now());

      // Add user question
      if (item.user_input) {
        historyMessages.push({
          id: `history-user-${index}`,
          type: "user",
          content: item.user_input,
          timestamp: timestamp,
        });
      }

      // Add agent response
      if (item.chat_output) {
        historyMessages.push({
          id: `history-ai-${index}`,
          type: "ai",
          content: item.chat_output,
          timestamp: new Date(timestamp.getTime() + 1000), // Add 1 second to ensure proper order
          model: currentModel,
        });
      }
    });

    // Sort messages by timestamp to maintain chronological order
    return historyMessages.sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    );
  };

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

    setAllMessages((prev) => [...prev, userMessage]);
    const currentPrompt = prompt;
    setPrompt("");
    setIsLoading(true);

    // Auto-scroll when sending message
    setTimeout(() => scrollToBottom(), 100);

    try {
      const clientIP = await getClientIP();
      
      // Map privacy level to security_level number
      let securityLevel: number | undefined = undefined;
      if (currentPrivacy === "low") securityLevel = 1;
      else if (currentPrivacy === "medium") securityLevel = 2;
      else if (currentPrivacy === "high") securityLevel = 3;
      
      const payload = {
        token: token,
        user_id: localStorage.getItem("userId") || "anonymous_user",
        ip: clientIP,
        project_id: import.meta.env.VITE_PROJECT_ID || "",
        agent_id: "b91fe95eef4b4296ab1ba04f445ecb16",
        user_input: currentPrompt,
        language: "en",
        ai_id: Number(currentModel) || undefined,
        security_level: securityLevel,
      };

      console.log("📤 [Chat] Sending message with payload:", payload);

      sendMessageMutation.mutate(payload, {
        onSuccess: (response) => {
          console.log("✅ [Chat] Message sent successfully:", response);

          let aiContent = "Message received successfully!";

          try {
            if (response.JSONraw) {
              const parsedData = JSON.parse(response.JSONraw);
              if (
                Array.isArray(parsedData) &&
                parsedData.length > 0 &&
                parsedData[0].chat_output
              ) {
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
          setAllMessages((prev) => [...prev, aiMessage]);
          setIsLoading(false);

          // Auto-scroll when receiving AI response
          setTimeout(() => scrollToBottom(), 100);
        },
        onError: (error) => {
          console.error("❌ [Chat] Failed to send message:", error);

          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "ai",
            content:
              "Sorry, I encountered an error while processing your message. Please try again.",
            timestamp: new Date(),
            model: currentModel,
          };
          setAllMessages((prev) => [...prev, errorMessage]);
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("💥 [Chat] Error preparing message:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "Sorry, there was an error preparing your message. Please try again.",
        timestamp: new Date(),
        model: currentModel,
      };
      setAllMessages((prev) => [...prev, errorMessage]);
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

  // Load chat history when component mounts
  useEffect(() => {
    loadChatHistory();
  }, []);

  // No auto-send logic needed - user messages are sent from Index.tsx

  // Auto-scroll to bottom when messages change or component mounts
  useEffect(() => {
    if (!isLoadingHistory && allMessages.length > 0) {
      setTimeout(() => scrollToBottomImmediate(), 100);
    }
  }, [allMessages, isLoadingHistory]);

  // Add scroll event listener for infinite scroll
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/gopraivate_v10.13.png"
              alt="goprAIvate Logo"
              className="h-8 w-8 object-cover rounded-full"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                goprAIvate Chat
              </h1>
              <p className="text-sm text-gray-500">Private AI conversation</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Current Model Display */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700 font-medium">
                {models.find((model) => model.name === currentModel)
                  ?.displayName || "ChatGPT 5.0"}
              </span>
              {isUsingFallback && (
                <span
                  className="text-xs text-yellow-600"
                  title="Using fallback models"
                >
                  ⚠
                </span>
              )}
            </div>

            {/* Format Guide Button */}
            <Dialog open={showFormatGuide} onOpenChange={setShowFormatGuide}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-gray-100 rounded-lg h-9 w-9 transition-colors"
                  title="Response Format Guide"
                >
                  <Info className="w-4 h-4 text-gray-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-gray-900">
                    📋 Backend Response Format Guide
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Hướng dẫn format JSON response để hiển thị đúng các định dạng markdown
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 text-sm">
                  {/* Basic Text Formatting */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">🔤 Basic Text Formatting</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div><code>**Bold text**</code> → <strong>Bold text</strong></div>
                      <div><code>*Italic text*</code> → <em>Italic text</em></div>
                      <div><code>`Inline code`</code> → <code className="bg-gray-100 px-1 py-0.5 rounded">Inline code</code></div>
                    </div>
                  </div>

                  {/* Headers */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">📑 Headers</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div><code># Heading 1</code> → <span className="text-xl font-bold">Heading 1</span></div>
                      <div><code>## Heading 2</code> → <span className="text-lg font-semibold">Heading 2</span></div>
                      <div><code>### Heading 3</code> → <span className="text-base font-semibold">Heading 3</span></div>
                    </div>
                  </div>

                  {/* Code Blocks */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">💻 Code Blocks</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-2">Backend Response:</div>
                      <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`"chat_output": "Here's a Python example:\\n\\n\`\`\`python\\nprint('Hello World')\\nfor i in range(5):\\n    print(i)\\n\`\`\`"`}
                      </pre>
                      <div className="mt-2 text-gray-600">→ Sẽ render thành code block với syntax highlighting</div>
                    </div>
                  </div>

                  {/* Lists */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">📝 Lists</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div>
                        <div className="font-medium">Unordered List:</div>
                        <div><code>- Item 1\\n- Item 2\\n- Item 3</code></div>
                      </div>
                      <div>
                        <div className="font-medium">Ordered List:</div>
                        <div><code>1. First item\\n2. Second item\\n3. Third item</code></div>
                      </div>
                    </div>
                  </div>

                  {/* Tables */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">📊 Tables</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-2">Backend Response:</div>
                      <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`"chat_output": "| Feature | Status |\\n|---------|--------|\\n| **PII Redaction** | ✅ Yes |\\n| **IP Masking** | ✅ Yes |\\n| **Zero Logging** | ✅ Yes |"`}
                      </pre>
                      <div className="mt-2 text-gray-600">→ Sẽ render thành styled table với Table components</div>
                    </div>
                  </div>

                  {/* Blockquotes */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">💬 Blockquotes</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div><code>&gt; Important note here</code></div>
                      <div className="mt-2 border-l-4 border-gray-300 pl-4 py-2 bg-gray-100 italic text-gray-700">
                        → Important note here
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">🔗 Links</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div><code>[Link text](https://example.com)</code></div>
                      <div className="mt-2">→ <a href="#" className="text-blue-600 underline">Link text</a></div>
                    </div>
                  </div>

                  {/* JSON Example */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">🔧 Complete JSON Response Example</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
{`{
  "success": true,
  "JSONraw": "[{\\"chat_output\\": \\"# Security Features\\n\\nHere are our **key security features**:\\n\\n1. **PII Redaction** - Automatic removal\\n2. *IP Masking* - Hide location\\n3. Zero Data Retention\\n\\n> **Important**: All data is processed securely\\n\\n## Code Example:\\n\\n\`\`\`python\\ndef secure_chat(message):\\n    return redact_pii(message)\\n\`\`\`\\n\\n| Feature | Status |\\n|---------|--------|\\n| Encryption | ✅ |\\n| Monitoring | ✅ |\\"}]"
}`}
                      </pre>
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">✅ Best Practices</h3>
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <ul className="space-y-2 text-blue-800">
                        <li>• Sử dụng <code>\\n</code> để xuống dòng</li>
                        <li>• Escape quotes: <code>\\"</code> trong JSON</li>
                        <li>• Tables cần có header row với <code>|---|</code></li>
                        <li>• Code blocks cần specify language: <code>```python</code></li>
                        <li>• Links sẽ tự động mở tab mới</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Home Button */}
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

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 lg:px-6"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Load More Indicator */}
          {isLoadingMore && (
            <div className="text-center py-4">
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
              <p className="text-xs text-gray-500 mt-2">
                Loading more messages...
              </p>
            </div>
          )}

          {/* Show indicator when there are more messages to load */}
          {!isLoadingMore &&
            displayedMessageCount < allMessages.length &&
            messages.length > 0 && (
              <div className="text-center py-2">
                <p className="text-xs text-gray-500">
                  Scroll up to load{" "}
                  {Math.min(10, allMessages.length - displayedMessageCount)}{" "}
                  more messages
                </p>
              </div>
            )}
          {isLoadingHistory ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Loading chat history...
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
          ) : messages.length === 0 ? (
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
                    {/* {message.model && (
                      <span>
                        •{" "}
                        {models.find((model) => model.name === message.model)
                          ?.displayName || message.model}
                      </span>
                    )} */}
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

          {/* Scroll anchor */}
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
                className="w-full rounded-none bg-transparent border-none text-gray-900 placeholder:text-gray-400 text-sm leading-relaxed resize-none focus:ring-0 focus:outline-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 min-h-[60px] max-h-[120px]"
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
                  <Select
                    value={currentModel}
                    onValueChange={setCurrentModel}
                    disabled={isLoadingModels}
                  >
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
                </div>

                <div className="hidden lg:block">
                  <Select
                    value={currentPrivacy}
                    onValueChange={setCurrentPrivacy}
                  >
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
