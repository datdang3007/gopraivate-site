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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import MessageRenderer from "@/components/MessageRenderer";
import { useIsMobile } from "@/hooks/use-mobile";
import { DashboardLayoutContext } from "@/components/DashboardLayout";
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
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  const isMobile = useIsMobile();
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // Load from localStorage, fallback to Index props, then defaults
  const [currentModel, setCurrentModel] = useState(() => {
    return (
      localStorage.getItem("selectedModel") || selectedModelFromIndex || "10"
    );
  });
  const [currentPrivacy, setCurrentPrivacy] = useState(() => {
    return (
      localStorage.getItem("selectedPrivacy") ||
      selectedPrivacyFromIndex ||
      "medium"
    );
  });

  // Refs for scroll management
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Save model to localStorage when changed
  const handleModelChange = (model: string) => {
    setCurrentModel(model);
    localStorage.setItem("selectedModel", model);
  };

  // Save privacy to localStorage when changed
  const handlePrivacyChange = (privacy: string) => {
    setCurrentPrivacy(privacy);
    localStorage.setItem("selectedPrivacy", privacy);
  };

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
        allMessages.length - displayedMessageCount
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
                    new Date(b.updated_at).getTime()
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
              error
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
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );
  };

  const handleSend = async (messageToSend?: string) => {
    const messageContent = messageToSend || prompt;
    if (!messageContent.trim()) return;

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
      content: messageContent,
      timestamp: new Date(),
    };

    setAllMessages((prev) => [...prev, userMessage]);
    const currentPrompt = messageContent;
    if (!messageToSend) {
      setPrompt("");
    }
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
        payload_b64: currentPrompt,
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

  // Wrapper for handleSend to use in onClick
  const handleSendClick = () => {
    handleSend();
  };

  // Handle copy message content
  const handleCopyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Message content has been copied to clipboard",
      });
    } catch (error) {
      console.error("Failed to copy:", error);
      toast({
        title: "Copy failed",
        description: "Failed to copy message content",
        variant: "destructive",
      });
    }
  };

  // Handle resend - find the last user message before the current AI message
  const handleResend = (aiMessageId: string) => {
    // Find the index of the current AI message
    const aiMessageIndex = allMessages.findIndex(
      (msg) => msg.id === aiMessageId
    );

    if (aiMessageIndex === -1) return;

    // Find the last user message before this AI message
    for (let i = aiMessageIndex - 1; i >= 0; i--) {
      if (allMessages[i].type === "user") {
        handleSend(allMessages[i].content);
        return;
      }
    }

    // If no user message found, show error
    toast({
      title: "Resend failed",
      description: "No previous user message found to resend",
      variant: "destructive",
    });
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

  // Auto-scroll to last user message when messages change or component mounts
  useEffect(() => {
    if (!isLoadingHistory && allMessages.length > 0) {
      setTimeout(() => {
        // Find the last user message
        const lastUserMessageIndex = allMessages.findLastIndex(
          (msg) => msg.type === "user"
        );
        if (lastUserMessageIndex !== -1) {
          // Calculate the position in the displayed messages array
          const startIndex = Math.max(
            0,
            allMessages.length - displayedMessageCount
          );
          const displayedIndex = lastUserMessageIndex - startIndex;

          // Only scroll if the last user message is in the currently displayed messages
          if (displayedIndex >= 0 && displayedIndex < messages.length) {
            const messageElement = document.querySelector(
              `[data-message-id="${allMessages[lastUserMessageIndex].id}"]`
            );
            if (messageElement) {
              messageElement.scrollIntoView({
                behavior: "auto",
                block: "start",
              });
            } else {
              // Fallback to scrolling to bottom if element not found
              scrollToBottomImmediate();
            }
          } else {
            // If last user message is not displayed, scroll to bottom
            scrollToBottomImmediate();
          }
        } else {
          // No user messages found, scroll to bottom
          scrollToBottomImmediate();
        }
      }, 100);
    }
  }, [allMessages, isLoadingHistory, displayedMessageCount, messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const { setHeaderActions } = React.useContext(DashboardLayoutContext);

  // Update header actions when model changes
  React.useEffect(() => {
    const headerActions = (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-foreground font-medium">
            {models.find((model) => model.name === currentModel)?.displayName ||
              "ChatGPT 5.0"}
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
      </div>
    );
    setHeaderActions(headerActions);
  }, [currentModel, models, isUsingFallback, setHeaderActions]);

  return (
      <div className="flex flex-col h-full">
        {/* Messages Area */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 py-4 lg:px-6"
        >
          <div className="max-w-7xl mx-auto space-y-6">
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
                  data-message-id={message.id}
                  className={`flex pt-3 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.type === "ai" && (
                    <div className="flex-shrink-0 mr-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-xs sm:max-w-xl lg:max-w-4xl ${
                      message.type === "user" ? "order-first" : ""
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === "user"
                          ? "bg-black text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      {message.type === "user" ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      ) : (
                        <div className="text-sm leading-relaxed">
                          <MessageRenderer
                            content={message.content}
                            fallback={
                              <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-900">
                                {message.content}
                              </p>
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div
                      className={`flex items-center gap-2 mt-2 text-xs text-gray-500 ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div>
                        <span>
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {message.type === "ai" && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-gray-500 hover:text-gray-700"
                            onClick={() => handleCopyMessage(message.content)}
                            title="Copy message"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-gray-500 hover:text-gray-700 opacity-50 cursor-not-allowed"
                            disabled
                            title="Like (disabled)"
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-gray-500 hover:text-gray-700 opacity-50 cursor-not-allowed"
                            disabled
                            title="Unlike (disabled)"
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-gray-500 hover:text-gray-700"
                            onClick={() => handleResend(message.id)}
                            title="Resend last user message"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      {/* {message.model && (
                      <span>
                        •{" "}
                        {models.find((model) => model.name === message.model)
                          ?.displayName || message.model}
                      </span>
                    )} */}
                    </div>

                    
                  </div>

                  {message.type === "user" && (
                    <div className="ml-2 flex-shrink-0">
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
                  {/* Attach File Button - Always disabled */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-gray-200 rounded-lg h-8 w-8 transition-colors"
                    disabled
                  >
                    <Paperclip className="w-4 h-4 text-gray-400" />
                  </Button>

                  {/* Settings Button - Mobile uses Dialog, Desktop shows inline */}
                  {isMobile ? (
                    <Dialog
                      open={isSettingsOpen}
                      onOpenChange={setIsSettingsOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 hover:bg-gray-200 rounded-lg h-8 w-8 transition-colors"
                        >
                          <Settings className="w-4 h-4 text-gray-600" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Chat Settings</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          {/* AI Model Selection */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <label className="text-sm font-medium text-gray-700">
                                AI Model
                              </label>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Select
                                value={currentModel}
                                onValueChange={handleModelChange}
                                disabled={isLoadingModels}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {models.map((model) => (
                                    <SelectItem
                                      key={model.id}
                                      value={model.name}
                                    >
                                      {model.displayName}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {isUsingFallback && (
                                <span
                                  className="text-xs text-yellow-600"
                                  title="Using fallback models"
                                >
                                  ⚠
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Privacy Level Selection */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Privacy Level
                            </label>
                            <Select
                              value={currentPrivacy}
                              onValueChange={handlePrivacyChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">
                                  Privacy: Low
                                </SelectItem>
                                <SelectItem value="medium">
                                  Privacy: Medium
                                </SelectItem>
                                <SelectItem value="high">
                                  Privacy: High
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <>
                      {/* Desktop: Show inline controls */}
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <Select
                          value={currentModel}
                          onValueChange={handleModelChange}
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

                      <div className="block">
                        <Select
                          value={currentPrivacy}
                          onValueChange={handlePrivacyChange}
                        >
                          <SelectTrigger className="border-none bg-transparent text-sm text-gray-700 h-8 p-0 focus:ring-0 hover:bg-gray-200 rounded px-2 transition-colors">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Privacy: Low</SelectItem>
                            <SelectItem value="medium">
                              Privacy: Medium
                            </SelectItem>
                            <SelectItem value="high">Privacy: High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>

                <Button
                  onClick={handleSendClick}
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
              🔒 Your messages are automatically protected with PII redaction
              and IP masking
            </p>
          </div>
        </div>
      </div>
  );
};

export default Chat;
