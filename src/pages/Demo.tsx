import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Bot, User, Info, Copy, Check } from "lucide-react";
import MessageRenderer from "@/components/MessageRenderer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock AI responses with various markdown formats
const mockResponses = [
  {
    id: "1",
    type: "ai" as const,
    content: `# Welcome to goprAIvate!

I can assist you with various text formats:

## Basic Formatting
- **Bold text** to emphasize
- *Italic text* for finesse

## Code blocks
\u0060\u0060\u0060javascript
function greetUser(name) {
  console.log(\`Hello, \${name}! Welcome to goprAIvate.\`);
  return \`Privacy-first AI at your service\`;
}
\u0060\u0060\u0060

> **Important Note**: All your data is protected with PII redaction and IP masking technology.

### Feature List:
1. **Automatic PII Redaction** - Removes personal information
2. **IP & Location Shielding** - Hides IP and location  
3. **Zero Data Retention** - No data storage
4. **Provider Independence** - No vendor lock-in

Do you have any other questions?`,
    timestamp: new Date(),
  },
  {
    id: "2",
    type: "user" as const,
    content: "Can you create a comparison table of security features?",
    timestamp: new Date(),
  },
  {
    id: "3",
    type: "ai" as const,
    content: `Certainly! Here is a comparison table of security features:

| Feature | goprAIvate | ChatGPT | Claude | Llama |
|-----------|------------|---------|--------|-------|
| **PII Redaction** | ✅ Automatic | ❌ No | ❌ No | ❌ No |
| **IP Masking** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Zero Logging** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **GDPR Compliant** | ✅ Yes | ⚠️ Partial | ⚠️ Partial | ⚠️ Partial |
| **On-premise Option** | ✅ Yes | ❌ No | ❌ No | ✅ Yes |

## Security Levels:

### 🔴 High Security
- Redact all PII
- Full IP masking
- No metadata retention

### 🟡 Medium Security  
- Basic PII redaction
- Partial IP masking
- Minimal logging

### 🟢 Low Security
- Basic filtering
- Standard routing
- Regular logging

---

*This table is updated as of January 2025*`,
    timestamp: new Date(),
  },
  {
    id: "4",
    type: "user" as const,
    content: "Great! Can you explain Python code for connecting to an API?",
    timestamp: new Date(),
  },
  {
    id: "5",
    type: "ai" as const,
    content: `Absolutely! Here is how to connect to the goprAIvate API:

## 1. Install libraries
\u0060\u0060\u0060bash
pip install requests python-dotenv
\u0060\u0060\u0060

## 2. Basic Python Code
\u0060\u0060\u0060python
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class GoprAIvateClient {
    def __init__(self):
        self.api_url = "https://api.gopraivate.com/v1/chat"
        self.token = os.getenv("GOPRAIVATE_TOKEN")
        
    def send_message(self, message, privacy_level="medium") {
        """
        Send a message to goprAIvate API
        
        Args:
            message (str): Message content
            privacy_level (str): Security level (low/medium/high)
        """
        headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "user_input": message,
            "security_level": self._map_privacy_level(privacy_level),
            "ai_id": 10  # ChatGPT 5.0
        }
        
        try {
          response = requests.post(
              self.api_url, 
              json=payload, 
              headers=headers,
              timeout=30
          )
          response.raise_for_status()
          return response.json()
          
        } except requests.RequestException as e {
            print(f"❌ Error: {e}")
            return None
        }
    
    def _map_privacy_level(self, level) {
        mapping = {"low": 1, "medium": 2, "high": 3}
        return mapping.get(level, 2)
    }

# Usage
client = GoprAIvateClient()
result = client.send_message(
    "My name is John and my email is john@acme.com. Please write an email to Sarah.", 
    privacy_level="high"
)

if result {
    print("✅ Response:", result.get('chat_output'))
}
\u0060\u0060\u0060

> **Note**: In the example above, PII such as "John" and "john@acme.com" will be automatically redacted before being sent to the AI model.

### 3. .env File
\u0060\u0060\u0060env
GOPRAIVATE_TOKEN=your_api_token_here
\u0060\u0060\u0060

**Expected Result**: The AI will receive a sanitized message like *"My name is <NAME> and my email is <EMAIL>. Please write an email to <NAME>."*`,
    timestamp: new Date(),
  },
];

const Demo = () => {
  const navigate = useNavigate();
  const [messages] = useState(mockResponses);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const jsonGuidelines = [
    {
      title: "Basic Message Structure",
      description: "Standard response format for AI messages",
      json: {
        id: "unique_message_id",
        type: "ai",
        content: "Your markdown content here...",
        timestamp: "2025-01-20T10:30:00Z",
      },
    },
    {
      title: "Markdown Text Formatting",
      description: "How to format text with markdown",
      json: {
        content: `**Bold text** for emphasis
*Italic text* for finesse
> **Important**: Blockquotes for highlights
Regular paragraph text here.`,
      },
    },
    {
      title: "Code Blocks",
      description: "How to include code in responses",
      json: {
        content: `Here's a JavaScript example:

\`\`\`javascript
function greetUser(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome to goprAIvate\`;
}
\`\`\`

Inline code: \`const result = getData();\``,
      },
    },
    {
      title: "Tables",
      description: "How to format tables in markdown",
      json: {
        content: `| Feature | goprAIvate | ChatGPT | Claude |
|---------|------------|---------|--------|
| **PII Redaction** | ✅ Yes | ❌ No | ❌ No |
| **IP Masking** | ✅ Yes | ❌ No | ❌ No |
| **Zero Logging** | ✅ Yes | ❌ No | ❌ No |`,
      },
    },
    {
      title: "Lists and Headers",
      description: "How to structure lists and headers",
      json: {
        content: `# Main Title
## Subtitle

### Features:
1. **Automatic PII Redaction** - Removes personal info
2. **IP & Location Shielding** - Hides location
3. **Zero Data Retention** - No storage

### Benefits:
- Privacy-first approach
- Vendor independence
- Full compliance`,
      },
    },
  ];

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(text, null, 2));
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
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
                Demo: Markdown Rendering
              </h1>
              <p className="text-sm text-gray-500">
                Testing message formatting
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 hover:bg-blue-100 rounded-lg h-9 w-9 transition-colors"
                      >
                        <Info className="w-4 h-4 text-blue-600" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-x-hidden overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900">
                          🔧 JSON Response Guidelines for Backend
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                          Guidelines on how to format JSON responses for proper markdown rendering in frontend
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6 mt-4 max-w-3xl mx-auto">
                        {jsonGuidelines.map((guideline, index) => (
                          <Card
                            key={index}
                            className="p-4 border border-gray-200"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                  {guideline.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {guideline.description}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  copyToClipboard(guideline.json, index)
                                }
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                              >
                                {copiedIndex === index ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4 text-gray-600" />
                                )}
                              </Button>
                            </div>

                            <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                              <pre className="text-sm text-gray-100">
                                <code>
                                  {JSON.stringify(guideline.json, null, 2)}
                                </code>
                              </pre>
                            </div>

                            {guideline.json.content && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                                <div className="text-xs text-gray-600 mb-2 font-medium">
                                  👁️ Render Preview:
                                </div>
                                <MessageRenderer
                                  content={guideline.json.content}
                                />
                              </div>
                            )}
                          </Card>
                        ))}

                        <Card className="p-4 bg-blue-50 border-blue-200">
                          <h3 className="font-semibold text-blue-900 mb-2">
                            📋 Key Points for Backend:
                          </h3>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>
                              • <strong>type:</strong> Always set to "ai" for AI
                              responses
                            </li>
                            <li>
                              • <strong>content:</strong> Use raw markdown text,
                              no need to escape
                            </li>
                            <li>
                              • <strong>Code blocks:</strong> Use triple
                              backticks with language identifier
                            </li>
                            <li>
                              • <strong>Tables:</strong> Standard markdown table
                              format
                            </li>
                            <li>
                              • <strong>Lists:</strong> Use - for bullets,
                              numbers for ordered
                            </li>
                            <li>
                              • <strong>Emphasis:</strong> **bold**, *italic*,
                              &gt; blockquotes
                            </li>
                          </ul>
                        </Card>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>JSON Response Guidelines</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

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
      <div className="flex-1 overflow-y-auto px-4 py-4 lg:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "ai" && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              )}

              <div
                className={`max-w-xs sm:max-w-md lg:max-w-2xl ${
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
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-white">
                      {message.content}
                    </p>
                  ) : (
                    <MessageRenderer content={message.content} />
                  )}
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
                </div>
              </div>

              {message.type === "user" && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">ℹ</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Demo Markdown Rendering
                </h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  This page demonstrates rendering AI responses with full
                  Markdown formatting:
                  <strong> bold</strong>, <em>italic</em>, tables, code blocks,
                  blockquotes, and more. All are auto-rendered from plain text
                  responses.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Demo;
