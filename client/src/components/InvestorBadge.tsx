import { Badge } from "@/components/ui/badge";
import { Users, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface InvestorBadgeProps {
  investorCount: number;
  maxInvestors?: number;
  investorRevenueShare?: string;
  className?: string;
  showProgress?: boolean;
}

export function InvestorBadge({ 
  investorCount, 
  maxInvestors = 10,
  investorRevenueShare = "0",
  className = "",
  showProgress = false
}: InvestorBadgeProps) {
  const spotsRemaining = maxInvestors - investorCount;
  const isFull = investorCount >= maxInvestors;
  const progressPercent = (investorCount / maxInvestors) * 100;
  const revenueSharePercent = parseFloat(investorRevenueShare);

  return (
    <div className={`space-y-2 ${className}`} data-testid="investor-badge">
      <div className="flex items-center gap-2">
        <Badge 
          variant={isFull ? "secondary" : "default"}
          className={`${
            isFull 
              ? "bg-muted text-muted-foreground" 
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          } px-3 py-1 font-mono text-sm`}
          data-testid="badge-investor-spots"
        >
          <Users className="w-3 h-3 mr-1" />
          {investorCount}/{maxInvestors} {isFull ? "FULL" : "spots"}
        </Badge>
        {!isFull && (
          <span className="text-xs text-muted-foreground font-medium">
            {spotsRemaining} {spotsRemaining === 1 ? "spot" : "spots"} left
          </span>
        )}
      </div>
      
      {showProgress && (
        <div className="space-y-1">
          <Progress 
            value={progressPercent} 
            className="h-1.5"
          />
          {!isFull && revenueSharePercent > 0 && (
            <div className="flex items-start gap-2 p-2 bg-purple-500/10 border-l-2 border-purple-500 rounded">
              <DollarSign className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Early investor bonus:</span> Earn {revenueSharePercent}% from every future unlock!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}