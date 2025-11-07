
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, Lock, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface InvestorEarning {
  postId: string;
  postTitle: string;
  position: number;
  earningsGenerated: string;
  totalUnlocks: number;
}

interface InvestorEarningsProps {
  totalEarnings: string;
  investments: InvestorEarning[];
  className?: string;
}

export function InvestorEarnings({
  totalEarnings,
  investments,
  className = ""
}: InvestorEarningsProps) {
  // Calculate aggregate stats
  const totalInvestments = investments.length;
  const totalUnlocks = investments.reduce((sum, inv) => sum + inv.totalUnlocks, 0);

  return (
    <div className={`space-y-6 ${className}`} data-testid="investor-earnings">
      {/* Total Earnings Card */}
      <Card className="p-6 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-pink-500/10 border-purple-500/20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">
              Total Investor Earnings
            </p>
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-purple-600" />
              <span className="text-3xl font-mono font-bold text-foreground">
                {parseFloat(totalEarnings).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              From {totalInvestments} {totalInvestments === 1 ? "investment" : "investments"} • {totalUnlocks} total unlocks
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <TrendingUp className="w-3 h-3 mr-1" />
            Active Investor
          </Badge>
        </div>
      </Card>

      {/* How It Works Card */}
      <Card className="p-6 border-purple-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold">How Investor Earnings Work</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            When you become an early investor in content, you earn a percentage of revenue from every subsequent unlock. Here's how it works:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-purple-600">1</span>
              </div>
              <div>
                <p className="text-sm font-medium">Creator Sets Investor Limits</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Creators choose how many investors (1-100) and what % of revenue they share (e.g., 3%)
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-purple-600">2</span>
              </div>
              <div>
                <p className="text-sm font-medium">Secure Your Investor Spot</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Pay the buyout price before all investor slots are filled
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-purple-600">3</span>
              </div>
              <div>
                <p className="text-sm font-medium">Earn Automatically</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your share is distributed automatically from each unlock after platform fees (0.05 USDC)
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-xs font-medium text-purple-600 dark:text-purple-400">
              Example: If creator sets 33 investors at 3% revenue share, and someone unlocks for $10, you earn $0.09 (3% ÷ 33 investors of $9.95 after platform fee)
            </p>
          </div>
        </div>
      </Card>

      {/* Investment List */}
      {investments.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Your Investments
          </h3>
          <div className="space-y-2">
            {investments.map((investment, index) => (
              <motion.div
                key={investment.postId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4 hover-elevate cursor-pointer" data-testid={`card-investment-${investment.postId}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">
                          {investment.postTitle}
                        </h4>
                        <Badge variant="secondary" className="text-xs px-2 py-0">
                          #{investment.position}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {investment.totalUnlocks} unlocks
                        </div>
                        <div className="flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Revenue share
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-mono font-bold text-green-600">
                        +${parseFloat(investment.earningsGenerated).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">earned</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {investments.length === 0 && (
        <Card className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <DollarSign className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold mb-2">No Investments Yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Become an early investor in exclusive content and start earning revenue share from every future unlock!
          </p>
        </Card>
      )}
    </div>
  );
}
