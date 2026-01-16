import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LineChart } from "lucide-react";

interface StatisticsCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  changeClassName?: string;
  changeLabel?: string;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  label,
  value,
  icon,
  change,
  changeClassName,
  changeLabel,
}) => {
  return (
    <Card className="w-full max-w-sm shadow-none border border-muted bg-background rounded-xl">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2">
            {label}
          </div>
        </div>
        {icon ? (
          <span className="w-5 h-5 text-muted-foreground">{icon}</span>
        ) : (
          <LineChart className="w-5 h-5 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-[2rem] leading-9 font-semibold text-foreground">
          {value}
        </div>
        {change && (
          <div
            className={`text-xs mt-2 flex items-center gap-1 font-medium ${
              changeClassName || "text-green-600"
            }`}
          >
            <span>{change}</span>
            {changeLabel && (
              <span className="text-muted-foreground">{changeLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
