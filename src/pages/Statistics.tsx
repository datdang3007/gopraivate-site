import { getClientIP } from "@/api";
import { useStatistics } from "@/api/hooks/useStatistics";
import { ProcessingMetrics } from "@/components/Statistics/ProcessingMetrics";
import { StatisticsCard } from "@/components/Statistics/StatisticsCards";
import { StatisticsTable } from "@/components/Statistics/StatisticsTable";
import { TimeBasedMetrics } from "@/components/Statistics/TimeBasedMetrics";
import {
  MessageCircle,
  MessageSquare,
  MessageSquareMore,
  Shield,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface StatisticsResponse {
  summary: {
    total_chats: number;
    unique_users: number;
    total_tokens: number;
    total_chat_hist_tokens: number;
    chats_with_pii: number;
    first_chat_date: string;
    last_chat_date: string;
    total_pii_entities: number;
  };
  // pii_by_type: any[];
  // model_usage: any[];
  daily_activity: {
    activity_date: string;
    chat_count: number;
    tokens_used: number;
    active_users: number;
  }[];
  top_users: {
    user_id: string;
    chat_count: number;
    total_tokens: number;
    last_activity: string;
  }[];
  recent_chats: {
    id: number;
    project_id: string;
    user_id: string;
    chat_model: string | null;
    token_count: number | null;
    totalTokens: number;
    language: string;
    created_at: string;
    is_new_topic: boolean;
    user_input: string;
    rewrittenQuery: string;
    PII_redactedQuery: string | null;
    chat_output: string;
    had_pii_redaction: number;
  }[];
}

// Mock data for statistics cards
const MOCK_STATS = {
  totalChats: 1289,
  totalRewrittenChats: 174,
  totalPIIRedactedChats: 56,
  totalAnswers: 799,
};

const MOCK_DELTA = {
  totalChats: "+6.3%",
  totalRewrittenChats: "+2.0%",
  totalPIIRedactedChats: "+0.5%",
  totalAnswers: "+5.7%",
};

const MOCK_DELTA_LABEL = {
  totalChats: "from last week",
  totalRewrittenChats: "from last week",
  totalPIIRedactedChats: "from last week",
  totalAnswers: "from last week",
};

const CHATS_COLUMNS = [
  { key: "message", header: "Chat message", size: "50%" },
  { key: "answer", header: "Answer", size: "50%" },
];

const REWRITTEN_CHATS_COLUMNS = [
  { key: "message", header: "Chat message", size: "25%" },
  { key: "rewrittenMessage", header: "Rewritten chat message", size: "25%" },
  { key: "answer", header: "Answer", size: "50%" },
];

const PII_REDACTED_CHATS_COLUMNS = [
  { key: "message", header: "Chat message", size: "25%" },
  {
    key: "piiRedactedMessage",
    header: "PII-redacted chat message",
    size: "25%",
  },
  { key: "answer", header: "Answer", size: "50%" },
];

const Statistics: React.FC = () => {
  const [statisticsData, setStatisticsData] =
    useState<StatisticsResponse | null>(null);
  const statisticsMutation = useStatistics();

  const isLoading = statisticsMutation.isPending;

  const totalRewrittenChats = statisticsData
    ? statisticsData.recent_chats.filter((chat) => chat?.rewrittenQuery)
        ?.length || 0
    : 0;
  const totalPIIRedactedChats = statisticsData
    ? statisticsData.recent_chats.filter((chat) => chat?.PII_redactedQuery)
        ?.length || 0
    : 0;
  const totalAnswers = statisticsData
    ? statisticsData.recent_chats.filter((chat) => chat?.chat_output)?.length ||
      0
    : 0;
  const summary = {
    totalChats: statisticsData?.recent_chats?.length || 0,
    totalRewrittenChats: totalRewrittenChats,
    totalPIIRedactedChats: totalPIIRedactedChats,
    totalAnswers: totalAnswers,
  };

  const activityRecords = statisticsData?.daily_activity || [];

  const dataTableChats = statisticsData?.recent_chats?.map((chat) => ({
    message: chat?.user_input ?? "",
    answer: chat?.chat_output ?? "",
  }));

  const dataTableWrittenChats = statisticsData?.recent_chats
    ?.filter((chat) => chat?.rewrittenQuery)
    .map((chat) => ({
      message: chat?.user_input ?? "",
      answer: chat?.chat_output ?? "",
      rewrittenMessage: chat?.rewrittenQuery ?? "",
    }));

  const dataTablePIIRedactedChats = statisticsData?.recent_chats?.map(
    (chat) => ({
      message: chat?.user_input ?? "",
      answer: chat?.chat_output ?? "",
      piiRedactedMessage: chat?.PII_redactedQuery ?? "",
    }),
  );

  useEffect(() => {
    const fetch = async () => {
      const clientIP = await getClientIP();
      const payload = {
        ip: clientIP,
        user_id: localStorage.getItem("userId") || "",
        project_id: import.meta.env.VITE_PROJECT_ID || "",
      };
      const newStatisticsData = await statisticsMutation.mutateAsync(payload);
      setStatisticsData(JSON.parse(newStatisticsData.JSONraw) || null);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-full mx-auto space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          label="Total Chats"
          value={summary.totalChats}
          icon={<MessageSquare className="w-5 h-5" />}
          change={""}
          changeLabel={""}
          loading={isLoading}
        />
        <StatisticsCard
          label="Total Rewritten Chats"
          value={summary.totalRewrittenChats}
          icon={<MessageSquareMore className="w-5 h-5" />}
          change={""}
          changeLabel={""}
          loading={isLoading}
        />
        <StatisticsCard
          label="Total PII-Redacted Chats"
          value={summary.totalPIIRedactedChats}
          icon={<Shield className="w-5 h-5" />}
          change={""}
          changeLabel={""}
          loading={isLoading}
        />
        <StatisticsCard
          label="Total Answers"
          value={summary.totalAnswers}
          icon={<MessageCircle className="w-5 h-5" />}
          change={""}
          changeLabel={""}
          loading={isLoading}
        />
      </div>

      {/* Time-based Metrics & Processing Metrics */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-[2] flex">
          <TimeBasedMetrics records={activityRecords} metric="tokens_used" />
        </div>
        <div className="flex-1 flex">
          <ProcessingMetrics />
        </div>
      </div>

      {/* Chats Table */}
      <StatisticsTable
        title="Chats"
        columns={CHATS_COLUMNS}
        data={dataTableChats}
      />

      {/* Rewritten Chats Table */}
      <StatisticsTable
        title="Rewritten Chats"
        columns={REWRITTEN_CHATS_COLUMNS}
        data={dataTableWrittenChats}
      />

      {/* PII-Redacted Chats Table */}
      <StatisticsTable
        title="PII-Redacted Chats"
        columns={PII_REDACTED_CHATS_COLUMNS}
        data={dataTablePIIRedactedChats}
      />
    </div>
  );
};

export default Statistics;
