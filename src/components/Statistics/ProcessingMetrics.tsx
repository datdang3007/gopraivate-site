import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AlertCircle, TrendingUp, Shield } from "lucide-react";

// Mock data
const MOCK_PROCESSING_METRICS = {
  chatsRewritten: 68.5,
  chatsPIIRedacted: 42.3,
};

const MOCK_ERROR_METRICS = {
  failedProcessingCount: 12,
};

export const ProcessingMetrics = () => {
  return (
    <Card className="w-full shadow-sm border-border transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Processing Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Processing Metrics Section */}
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />% chats
                rewritten
              </span>
              <span className="text-sm font-semibold text-foreground bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-md">
                {MOCK_PROCESSING_METRICS.chatsRewritten}%
              </span>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary border border-border">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm"
                )}
                style={{
                  width: `${MOCK_PROCESSING_METRICS.chatsRewritten}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />% chats
                PII-redacted
              </span>
              <span className="text-sm font-semibold text-foreground bg-green-50 dark:bg-green-950/30 px-2.5 py-1 rounded-md">
                {MOCK_PROCESSING_METRICS.chatsPIIRedacted}%
              </span>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary border border-border">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-green-500 to-green-600 shadow-sm"
                )}
                style={{
                  width: `${MOCK_PROCESSING_METRICS.chatsPIIRedacted}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-6" />

        {/* Error Metrics Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <h3 className="text-lg font-semibold text-foreground">
              Error Metrics
            </h3>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <span className="text-sm font-medium text-foreground">
              Failed processing count
            </span>
            <span className="text-sm font-bold text-destructive bg-destructive/10 px-3 py-1.5 rounded-md">
              {MOCK_ERROR_METRICS.failedProcessingCount}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
