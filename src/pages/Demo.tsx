
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
    content: `# Chào mừng bạn đến với goprAIvate!

Tôi có thể giúp bạn với nhiều định dạng văn bản khác nhau:

## Định dạng cơ bản
- **Chữ in đậm** để nhấn mạnh
- *Chữ in nghiêng* cho sự tinh tế  
- \`inline code\` cho các từ khóa kỹ thuật

## Code blocks
\`\`\`javascript
function greetUser(name) {
  console.log(\`Hello, \${name}! Welcome to goprAIvate.\`);
  return \`Privacy-first AI at your service\`;
}
\`\`\`

> **Lưu ý quan trọng**: Tất cả dữ liệu của bạn được bảo vệ với công nghệ PII redaction và IP masking.

### Danh sách tính năng:
1. **Automatic PII Redaction** - Loại bỏ thông tin cá nhân
2. **IP & Location Shielding** - Ẩn địa chỉ IP và vị trí  
3. **Zero Data Retention** - Không lưu trữ dữ liệu
4. **Provider Independence** - Không bị ràng buộc nhà cung cấp

Bạn có câu hỏi gì khác không?`,
    timestamp: new Date(),
  },
  {
    id: "2", 
    type: "user" as const,
    content: "Bạn có thể tạo bảng so sánh các tính năng bảo mật không?",
    timestamp: new Date(),
  },
  {
    id: "3",
    type: "ai" as const, 
    content: `Tất nhiên! Đây là bảng so sánh các tính năng bảo mật:

| Tính năng | goprAIvate | ChatGPT | Claude | Llama |
|-----------|------------|---------|--------|-------|
| **PII Redaction** | ✅ Tự động | ❌ Không | ❌ Không | ❌ Không |
| **IP Masking** | ✅ Có | ❌ Không | ❌ Không | ❌ Không |
| **Zero Logging** | ✅ Có | ❌ Không | ❌ Không | ❌ Không |
| **GDPR Compliant** | ✅ Có | ⚠️ Một phần | ⚠️ Một phần | ⚠️ Một phần |
| **On-premise Option** | ✅ Có | ❌ Không | ❌ Không | ✅ Có |

## Các mức độ bảo mật:

### 🔴 High Security (Cao)
- Redact tất cả PII
- Mask IP hoàn toàn
- Không lưu metadata

### 🟡 Medium Security (Trung bình)  
- Redact PII cơ bản
- Partial IP masking
- Minimal logging

### 🟢 Low Security (Thấp)
- Basic filtering
- Standard routing
- Regular logging

---

*Bảng này được cập nhật vào tháng 1/2025*`,
    timestamp: new Date(),
  },
  {
    id: "4",
    type: "user" as const,
    content: "Tuyệt vời! Bạn có thể giải thích code Python để kết nối API không?",
    timestamp: new Date(),
  },
  {
    id: "5", 
    type: "ai" as const,
    content: `Tất nhiên! Đây là cách kết nối với goprAIvate API:

## 1. Cài đặt thư viện
\`\`\`bash
pip install requests python-dotenv
\`\`\`

## 2. Code Python cơ bản
\`\`\`python
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class GoprAIvateClient:
    def __init__(self):
        self.api_url = "https://api.gopraivate.com/v1/chat"
        self.token = os.getenv("GOPRAIVATE_TOKEN")
        
    def send_message(self, message, privacy_level="medium"):
        """
        Gửi tin nhắn đến goprAIvate API
        
        Args:
            message (str): Nội dung tin nhắn
            privacy_level (str): Mức độ bảo mật (low/medium/high)
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
        
        try:
            response = requests.post(
                self.api_url, 
                json=payload, 
                headers=headers,
                timeout=30
            )
            response.raise_for_status()
            return response.json()
            
        except requests.RequestException as e:
            print(f"❌ Error: {e}")
            return None
    
    def _map_privacy_level(self, level):
        mapping = {"low": 1, "medium": 2, "high": 3}
        return mapping.get(level, 2)

# Sử dụng
client = GoprAIvateClient()
result = client.send_message(
    "Tôi tên là John và email là john@acme.com. Viết email cho Sarah.", 
    privacy_level="high"
)

if result:
    print("✅ Response:", result.get('chat_output'))
\`\`\`

> **Lưu ý**: Trong ví dụ trên, thông tin PII như "John" và "john@acme.com" sẽ được tự động redact trước khi gửi đến AI model.

### 3. File .env
\`\`\`env
GOPRAIVATE_TOKEN=your_api_token_here
\`\`\`

**Kết quả mong đợi**: AI sẽ nhận được tin nhắn đã được sanitize như *"Tôi tên là <NAME> và email là <EMAIL>. Viết email cho <NAME>."*`,
    timestamp: new Date(),
  }
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
              <p className="text-sm text-gray-500">Testing message formatting</p>
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
                  Trang này demo việc hiển thị AI responses với đầy đủ định dạng Markdown: 
                  <strong> in đậm</strong>, <em>in nghiêng</em>, bảng, code blocks, blockquotes, và nhiều hơn nữa.
                  Tất cả được render tự động từ plain text responses.
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
