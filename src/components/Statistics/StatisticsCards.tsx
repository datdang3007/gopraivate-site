import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatisticsCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  changeClassName?: string;
  changeLabel?: string;
  loading?: boolean;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  label,
  value,
  icon,
  change,
  changeClassName,
  changeLabel,
  loading = false,
}) => {
  return (
    <Card className="group w-full shadow-sm border border-border bg-card rounded-xl transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div className="flex-1">
          <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            {label}
          </div>
        </div>
        <div className="ml-4 p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors duration-200">
          {icon ? (
            <span className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200">
              {icon}
            </span>
          ) : (
            <LineChart className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <>
            <Skeleton className="h-9 w-24 mb-1" />
            {change && <Skeleton className="h-4 w-32 mt-2" />}
          </>
        ) : (
          <>
            <div className="text-[2rem] leading-9 font-semibold text-foreground mb-1">
              {value}
            </div>
            {change && (
              <div
                className={cn(
                  "text-xs mt-2 flex items-center gap-1.5 font-medium transition-colors duration-200",
                  changeClassName || "text-green-600 dark:text-green-500"
                )}
              >
                <span className="font-semibold">{change}</span>
                {changeLabel && (
                  <span className="text-muted-foreground font-normal">
                    {changeLabel}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
