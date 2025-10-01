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
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl font-bold pb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              goprAIvate
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Use AI-powered tools safely with our privacy-first approach. Your
              data stays secure while you enjoy advanced AI capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Learn More
              </Button>
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
