import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Bot, User } from "lucide-react";
import MessageRenderer from "@/components/MessageRenderer";

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
