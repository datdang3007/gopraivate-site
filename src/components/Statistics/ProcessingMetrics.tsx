import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Processing Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Processing Metrics Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                % chats rewritten
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {MOCK_PROCESSING_METRICS.chatsRewritten}%
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={cn("h-full rounded-full transition-all bg-blue-500")}
                style={{ width: `${MOCK_PROCESSING_METRICS.chatsRewritten}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                % chats PII-redacted
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {MOCK_PROCESSING_METRICS.chatsPIIRedacted}%
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={cn(
                  "h-full rounded-full transition-all bg-green-500"
                )}
                style={{
                  width: `${MOCK_PROCESSING_METRICS.chatsPIIRedacted}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator />

        {/* Error Metrics Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground">
              Error Metrics
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Failed processing count
            </span>
            <span className="text-sm font-semibold text-destructive">
              {MOCK_ERROR_METRICS.failedProcessingCount}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
