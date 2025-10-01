import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        {/* Hero Section - Chat Interface */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/gopraivate_v10.12.png" 
                alt="goprAIvate Logo" 
                className="h-8 w-8 mr-3"
              />
              <h1 className="text-4xl font-bold text-gray-900">
                goprAIvate
              </h1>
            </div>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Use AI Without Giving Away Sensitive Information. Leverage the power of LLMs
              without compromising privacy.
            </p>
            
            {/* Chat Interface */}
            <div className="bg-white rounded-lg shadow-sm border p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Button variant="ghost" size="sm" className="p-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </Button>
                
                <Select defaultValue="chatgpt">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chatgpt">ChatGPT</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                    <SelectItem value="gemini">Gemini</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="ghost" size="sm" className="p-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </Button>

                <Select defaultValue="medium">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Privacy level: Low</SelectItem>
                    <SelectItem value="medium">Privacy level: Medium</SelectItem>
                    <SelectItem value="high">Privacy level: High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <textarea
                  placeholder="Paste or type your prompt... (e.g., Email sarah.lee@acme.com the Q4 forecast...)"
                  className="w-full p-4 pr-12 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                />
                <Button 
                  size="sm" 
                  className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700"
                >
                  Send
                </Button>
              </div>

              {/* Suggestion Tabs */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <Button variant="outline" size="sm" className="text-sm">
                  Personal health
                </Button>
                <Button variant="outline" size="sm" className="text-sm">
                  My finances
                </Button>
                <Button variant="outline" size="sm" className="text-sm">
                  My business
                </Button>
                <Button variant="outline" size="sm" className="text-sm">
                  Contract review
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              What's the problem?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Concerns</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    AI tools often compromise your privacy. We ensure your data
                    stays private and secure.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Your sensitive information is protected with
                    enterprise-grade security measures.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Full Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    You maintain complete control over your data and how it's
                    processed.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              How it works
            </h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Simple and Secure
                </h3>
                <p className="text-muted-foreground mb-6">
                  goprAIvate provides secure and compliant tools to enable
                  organizations to leverage the power of AI without compromising
                  security or privacy.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• End-to-end encryption</li>
                  <li>• Local data processing</li>
                  <li>• No data retention</li>
                  <li>• Privacy-first design</li>
                </ul>
              </div>
              <div className="bg-background rounded-lg p-8 shadow-sm border">
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of organizations who trust goprAIvate for their AI
              needs.
            </p>
            <Button size="lg" className="px-8">
              Start Free Trial
            </Button>
          </div>
        </section>
      </div>
      <MadeWithDyad />
    </Layout>
  );
};

export default Index;
