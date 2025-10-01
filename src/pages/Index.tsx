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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

        {/* How it works section */}
        <div className="bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Text Content */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">How it works</h2>
                
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    With <span className="font-semibold">goprAIvate</span>, private users and businesses can scrub out 
                    personal and sensitive business information being 
                    sent to ChatGPT, Llama, Claude, or other AIs—unlocking the 
                    benefits of cutting-edge models <span className="italic">without</span> compromising 
                    customer trust.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold text-gray-900">1) Redact before you send.</span> We detect and tag PII (names, 
                      emails, phone numbers, IDs) and sensitive business terms 
                      (customers, contracts, financials, roadmap items) locally or at 
                      your edge gateway.
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-900">2) Route via a privacy relay.</span> Sanitized requests are relayed over 
                      encrypted channels that hide your IP/geo and strip metadata, 
                      then forwarded to your chosen AI—open or closed source, no 
                      vendor lock-in.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Example and Diagram */}
              <div className="space-y-8">
                {/* Medical Example */}
                <div>
                  <div className="text-sm text-gray-500 mb-3">Example medical sanitization</div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm leading-relaxed">
                    <div className="space-y-1">
                      <div>Patient <span className="bg-red-100 text-red-800 px-1 rounded">&lt;NAME&gt;</span> (42) from <span className="bg-red-100 text-red-800 px-1 rounded">&lt;CITY&gt;</span> reports one week of severe</div>
                      <div>chest pain and shortness of breath. Current meds: Lisinopril</div>
                      <div>10mg, Metformin 500mg b.i.d., Escitalopram 20mg. Seen at</div>
                      <div><span className="bg-red-100 text-red-800 px-1 rounded">&lt;HOSPITAL&gt;</span> on <span className="bg-red-100 text-red-800 px-1 rounded">&lt;DATE&gt;</span>. Prior procedure: cardiac</div>
                      <div>catheterization (03/2024). Follow-up with <span className="bg-red-100 text-red-800 px-1 rounded">&lt;DOCTOR&gt;</span> noted</div>
                      <div>ejection fraction 45%. Please advise on risk and next steps.</div>
                    </div>
                  </div>
                </div>

                {/* Workflow Diagram */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm">
                      goprAIvate
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Left Box */}
                    <div className="text-center">
                      <div className="bg-white border border-gray-300 rounded-lg p-3 mb-2">
                        <div className="w-8 h-8 bg-gray-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                        </div>
                        <div className="text-xs font-medium">Privacy<br/>relay</div>
                      </div>
                      <div className="text-xs font-semibold">Redact before you send</div>
                      <div className="text-xs text-gray-600 mt-1">
                        Dr <span className="text-red-600">&lt;NAME&gt;</span> prescribed 10
                        mg of Quetiapine to <span className="text-red-600">&lt;NAME&gt;</span>
                        after a diagnosis of type 2
                        diabetes. The patient resides
                        in <span className="text-red-600">&lt;LOCATION&gt;</span> and was
                        referred by <span className="text-red-600">&lt;NAME&gt;</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        We detect and tag PII (names,
                        emails, phone numbers, IDs)
                        and sensitive business terms
                        (customers, contracts, financials,
                        locally or at your
                      </div>
                    </div>

                    {/* Right Box */}
                    <div className="text-center">
                      <div className="bg-white border border-gray-300 rounded-lg p-3 mb-2">
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          <span className="text-xs">⚪</span>
                          <span className="text-xs">➡️</span>
                        </div>
                        <div className="text-xs">
                          <div>🔒 ChatGPT</div>
                          <div>⚙️ Grok 🦙 Llama</div>
                          <div>🧠 Claude</div>
                        </div>
                      </div>
                      <div className="text-xs font-semibold">Route via a privacy relay</div>
                      <div className="text-xs text-gray-600 mt-1">
                        Sanitized requests are relayed
                        over encrypted channels that
                        hide your IP/geo and strip
                        metadata, then forwarded to
                        your chosen AI—open or closed source, no vendor lock-in.
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-xs text-gray-600 font-medium">
                    Consistent with GDPR, HIPAA, and SOC 2 requirements
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solutions section */}
        <div className="bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Solutions</h2>

            <Tabs defaultValue="private" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-12">
                <TabsTrigger value="private">Private</TabsTrigger>
                <TabsTrigger value="teams">Teams & Businesses</TabsTrigger>
              </TabsList>

              <TabsContent value="private">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Automatic PII Redaction
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Names, emails, phone numbers, addresses, and IDs are removed in real time.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        IP & Location Shielding
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Your IP address and geolocation remain hidden from AI providers.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Zero Data Retention
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Your prompts aren't stored, logged, or reused for training.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Placeholder Reinsertion
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Sanitized queries are processed, then placeholders are restored in responses.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Personal Data Never Shared
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Sensitive information never reaches external AI providers.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Provider Independence
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Agnostic to the specific AI, no vendor lock-in. Switch freely between open-source and closed-source models.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="teams">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        PII & Customer Data Redaction
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Automatically removes customer identifiers, contracts, and client-sensitive information.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Trade Secret Shielding
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Protects R&D, roadmaps, financials, and strategy so they never leave your perimeter.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        IP & Metadata Anonymization
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Masks company IP addresses, device details, and geolocation from model providers.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        AI-Safe NDA Compliance
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Ensures data covered by NDAs never reaches external LLMs.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Shadow AI Prevention
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Stops employees from pasting confidential info into public AI tools.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Provider Independence
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Use the AI that best suits your needs—open or closed source.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;