import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendMessageDirect } from "@/utils/api";
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Paperclip, Settings, Send } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleSend = async () => {
    if (prompt.trim()) {
      try {
        // Prepare form data
        const formData = {
          message: prompt,
          timestamp: new Date().toISOString(),
          // Add other form fields as needed
        };

        // For now, using empty recaptcha token - you can implement recaptcha later
        const recaptchaValue = "";

        // Call API using the utility function
        const response = await sendMessageDirect(formData, recaptchaValue);
        
        console.log('API Response:', response);
        
        // Navigate to chat page with the prompt and response
        navigate('/chat', { 
          state: { 
            initialPrompt: prompt,
            apiResponse: response 
          } 
        });
      } catch (error) {
        console.error('Failed to send message:', error);
        // Still navigate to chat even if API fails
        navigate('/chat', { state: { initialPrompt: prompt } });
      }
    }
  };

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
                  onClick={handleSend}
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
        <div id="problem" className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
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
        <div id="solutions" className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
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
                        Names, emails, phone numbers, addresses, and IDs are
                        removed in real time.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        IP & Location Shielding
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Your IP address and geolocation remain hidden from AI
                        providers.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Zero Data Retention
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Your prompts aren't stored, logged, or reused for
                        training.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Placeholder Reinsertion
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Sanitized queries are processed, then placeholders are
                        restored in responses.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Personal Data Never Shared
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Sensitive information never reaches external AI
                        providers.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Provider Independence
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Agnostic to the specific AI, no vendor lock-in. Switch
                        freely between open-source and closed-source models.
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
                        Automatically removes customer identifiers, contracts,
                        and client-sensitive information.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Trade Secret Shielding
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Protects R&D, roadmaps, financials, and strategy so they
                        never leave your perimeter.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        IP & Metadata Anonymization
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Masks company IP addresses, device details, and
                        geolocation from model providers.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        AI-Safe NDA Compliance
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Ensures data covered by NDAs never reaches external
                        LLMs.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Shadow AI Prevention
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Stops employees from pasting confidential info into
                        public AI tools.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Provider Independence
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Use the AI that best suits your needs—open or closed
                        source.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* How it works section */}
        <div id="how-it-works" className="bg-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Text Content */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  How it works
                </h2>

                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    With <span className="font-semibold">goprAIvate</span>,
                    private users and businesses can scrub out personal and
                    sensitive business information being sent to ChatGPT, Llama,
                    Claude, or other AIs—unlocking the benefits of cutting-edge
                    models <span className="italic">without</span> compromising
                    customer trust.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold text-gray-900">
                        1) Redact before you send.
                      </span>{" "}
                      We detect and tag PII (names, emails, phone numbers, IDs)
                      and sensitive business terms (customers, contracts,
                      financials, roadmap items) locally or at your edge
                      gateway.
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900">
                        2) Route via a privacy relay.
                      </span>{" "}
                      Sanitized requests are relayed over encrypted channels
                      that hide your IP/geo and strip metadata, then forwarded
                      to your chosen AI—open or closed source, no vendor
                      lock-in.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Example and Diagram */}
              <div className="space-y-8">
                {/* Medical Example */}
                <div>
                  <div className="text-sm text-gray-500 mb-3">
                    Example medical sanitization
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm leading-relaxed">
                    <div className="space-y-1">
                      <div>
                        Employee{" "}
                        <span className="bg-red-100 text-red-800 px-1 rounded">
                          &lt;NAME&gt;
                        </span>{" "}
                        at{" "}
                        <span className="bg-red-100 text-red-800 px-1 rounded">
                          &lt;COMPANY&gt;
                        </span>{" "}
                        contacted{" "}
                        <span className="bg-red-100 text-red-800 px-1 rounded">
                          &lt;BANK&gt;
                        </span>{" "}
                        regarding account{" "}
                        <span className="bg-red-100 text-red-800 px-1 rounded">
                          &lt;ACCOUNT&gt;
                        </span>{" "}
                        on{" "}
                        <span className="bg-red-100 text-red-800 px-1 rounded">
                          &lt;DATE&gt;
                        </span>
                        . Transfer of €12,450 from{" "}
                        <span className="bg-red-100 text-red-800 px-1 rounded">
                          &lt;CITY&gt;
                        </span>{" "}
                        branch flagged due to mismatch with IBAN{" "}
                        <span className="bg-red-100 text-red-800 px-1 rounded">
                          &lt;IBAN&gt;
                        </span>
                        .
                      </div>
                      <div>
                        Please review statements and confirm beneficiary details
                        before processing.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workflow Diagram */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="/how_it_works_v01.png"
                    alt="How it works diagram"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits section */}
        <div id="benefits" className="bg-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Benefits</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border border-gray-200 hover:shadow-md transition-shadow bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-3">
                    Discuss privately, stay anonymous
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Hide device fingerprints, IP address, and geolocation; strip
                    personal identifiers before anything reaches a provider.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border border-gray-200 hover:shadow-md transition-shadow bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-3">
                    No leakage of business-critical data
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Prevent contracts, customer records, source code, and
                    roadmaps from leaving your perimeter with automatic
                    redaction and policy controls.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border border-gray-200 hover:shadow-md transition-shadow bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-3">
                    Use any AI—safely & flexibly
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Vendor-agnostic routing to ChatGPT, Claude, Grok, Llama or
                    your own models—same privacy guarantees everywhere.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border border-gray-200 hover:shadow-md transition-shadow bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-3">
                    Anonymous web search integrated
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Search the web through a privacy relay that strips
                    identifiers and masks IP/geo; feed results safely to your
                    chosen model.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>

        {/* References section */}
        <div id="references" className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              References
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed mb-12">
              <p>
                The team behind goprAIvate has built AI applications for
                multinational companies such as Mercedes, Freudenberg, and
                Schaeffler in manufacturing and healthcare. We also created{" "}
                <a
                  href="https://www.lexatexer.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-800 underline hover:no-underline transition-colors font-medium"
                >
                  LexaTexer.com
                </a>
                , the enterprise AI platform that powers global manufacturers.
                Now, we bring the same power and security of enterprise AI to
                private users and small teams.
              </p>
            </div>

            {/* Company Logos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="w-32 h-20 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src="/placeholder.svg"
                    alt={`Partner Logo ${i + 1}`}
                    className="w-20 h-12 object-contain opacity-60"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About goprAIvate section */}
        <div id="about" className="bg-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Image */}
              <div className="flex justify-center">
                <img
                  src="/gopraivate_about.png"
                  alt="About goprAIvate"
                  className="w-96 h-96 rounded-2xl shadow-2xl"
                />
              </div>

              {/* Right Column - Content */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  About goprAIvate
                </h2>

                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    goprAIvate was founded by a team of AI experts who have
                    built enterprise-grade AI solutions for multinational
                    corporations. Drawing from years of experience in
                    manufacturing and healthcare AI, we created a privacy-first
                    solution to make advanced AI safe and accessible for
                    everyone — from individuals to global enterprises.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <p className="font-semibold text-gray-900 mb-2">
                      Compliance note:
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Our architecture and controls are designed to support
                      compliance with GDPR, HIPAA, and SOC 2 requirements when
                      properly configured and used with appropriate customer
                      policies and agreements.{" "}
                      <span className="italic">
                        We do not provide legal advice; customers are
                        responsible for their own compliance.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
