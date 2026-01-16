import { ProcessingMetrics } from "@/components/Statistics/ProcessingMetrics";
import { StatisticsCard } from "@/components/Statistics/StatisticsCards";
import { StatisticsTable } from "@/components/Statistics/StatisticsTable";
import { TimeBasedMetrics } from "@/components/Statistics/TimeBasedMetrics";
import {
  BarChart3,
  MessageCircle,
  MessageSquare,
  MessageSquareMore,
  Shield,
} from "lucide-react";
import React from "react";

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

const MOCK_CHATS_COLUMNS = [
  { key: "message", header: "Chat message" },
  { key: "answer", header: "Answer" },
];

const MOCK_REWRITTEN_CHATS_COLUMNS = [
  { key: "message", header: "Chat message" },
  { key: "rewrittenMessage", header: "Rewritten chat message" },
  { key: "answer", header: "Answer" },
];

const MOCK_PII_REDACTED_CHATS_COLUMNS = [
  { key: "message", header: "Chat message" },
  { key: "piiRedactedMessage", header: "PII-redacted chat message" },
  { key: "answer", header: "Answer" },
];

const MOCK_CHATS_DATA = [
  {
    message: "How does the weather look today?",
    answer: "Today's weather will be mostly sunny with a high of 75°F.",
  },
  {
    message: "Remove any personal info from my resume.",
    answer:
      "I've removed all names, addresses, and contact details from your resume.",
  },
  {
    message: "What is the capital of France?",
    answer: "The capital of France is Paris.",
  },
  {
    message: "What's the latest news in technology?",
    answer: "Here are the latest headlines in technology for today.",
  },
  {
    message: "Can you summarize this article for me?",
    answer: "Sure, here's a brief summary of the article provided.",
  },
  {
    message: "Book a meeting for tomorrow at 10am.",
    answer: "Your meeting has been scheduled for tomorrow at 10am.",
  },
  {
    message: "Translate 'thank you' to French.",
    answer: "'Thank you' in French is 'merci'.",
  },
  {
    message: "What's the population of Tokyo?",
    answer: "As of 2021, Tokyo's population is approximately 14 million.",
  },
  {
    message: "Set a reminder for my doctor's appointment next week.",
    answer: "Reminder set for your doctor's appointment next week.",
  },
  {
    message: "How do I reset my password?",
    answer:
      "To reset your password, click 'Forgot password' on the login page.",
  },
  {
    message: "Find vegetarian recipes for dinner.",
    answer: "Here are several vegetarian dinner recipes you might enjoy.",
  },
  {
    message: "Define the term 'blockchain'.",
    answer:
      "Blockchain is a distributed digital ledger for recording transactions securely.",
  },
  {
    message: "Email me my itinerary for next month.",
    answer: "I have sent your travel itinerary for next month to your email.",
  },
  {
    message: "What time is sunset today?",
    answer: "Sunset today is at 6:42 PM.",
  },
  {
    message: "Convert 100 USD to EUR.",
    answer: "100 USD is approximately 93.50 EUR at the current exchange rate.",
  },
  {
    message: "Who is the prime minister of Canada?",
    answer: "The current prime minister of Canada is Justin Trudeau.",
  },
  {
    message: "List all files in my Documents folder.",
    answer: "Here is a list of all files in your Documents folder.",
  },
  {
    message: "Recommend a movie to watch tonight.",
    answer:
      "I recommend watching 'Inception' for an exciting movie experience.",
  },
];

const MOCK_REWRITTEN_CHATS_DATA = [
  {
    message: "How does the weather look today?",
    rewrittenMessage: "Can you tell me about today's weather?",
    answer: "Today's weather will be mostly sunny with a high of 75°F.",
  },
  {
    message: "Remove any personal info from my resume.",
    rewrittenMessage: "Redact personal information from this document.",
    answer:
      "I've removed all names, addresses, and contact details from your resume.",
  },
  {
    message: "What is the capital of France?",
    rewrittenMessage: "Please provide the capital city of France.",
    answer: "The capital of France is Paris.",
  },
];

const MOCK_PII_REDACTED_CHATS_DATA = [];

const Statistics: React.FC = () => {
  return (
    <div className="w-full max-w-full mx-auto space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          label="Total Chats"
          value={MOCK_STATS.totalChats}
          icon={<MessageSquare className="w-5 h-5" />}
          change={MOCK_DELTA.totalChats}
          changeLabel={MOCK_DELTA_LABEL.totalChats}
        />
        <StatisticsCard
          label="Total Rewritten Chats"
          value={MOCK_STATS.totalRewrittenChats}
          icon={<MessageSquareMore className="w-5 h-5" />}
          change={MOCK_DELTA.totalRewrittenChats}
          changeLabel={MOCK_DELTA_LABEL.totalRewrittenChats}
        />
        <StatisticsCard
          label="Total PII-Redacted Chats"
          value={MOCK_STATS.totalPIIRedactedChats}
          icon={<Shield className="w-5 h-5" />}
          change={MOCK_DELTA.totalPIIRedactedChats}
          changeLabel={MOCK_DELTA_LABEL.totalPIIRedactedChats}
        />
        <StatisticsCard
          label="Total Answers"
          value={MOCK_STATS.totalAnswers}
          icon={<MessageCircle className="w-5 h-5" />}
          change={MOCK_DELTA.totalAnswers}
          changeLabel={MOCK_DELTA_LABEL.totalAnswers}
        />
      </div>

      {/* Time-based Metrics & Processing Metrics */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-[2] flex">
          <TimeBasedMetrics />
        </div>
        <div className="flex-1 flex">
          <ProcessingMetrics />
        </div>
      </div>

      {/* Chats Table */}
      <StatisticsTable
        title="Chats"
        columns={MOCK_CHATS_COLUMNS}
        data={MOCK_CHATS_DATA}
      />

      {/* Rewritten Chats Table */}
      <StatisticsTable
        title="Rewritten Chats"
        columns={MOCK_REWRITTEN_CHATS_COLUMNS}
        data={MOCK_REWRITTEN_CHATS_DATA}
      />

      {/* PII-Redacted Chats Table */}
      <StatisticsTable
        title="PII-Redacted Chats"
        columns={MOCK_PII_REDACTED_CHATS_COLUMNS}
        data={MOCK_PII_REDACTED_CHATS_DATA}
      />
    </div>
  );
};

export default Statistics;
