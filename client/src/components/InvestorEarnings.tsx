import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, Lock } from "lucide-react";
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
  return (
    <div className={`space-y-6 ${className}`} data-testid="investor-earnings">
      {/* Total Earnings Card */}
      <Card className="p-6 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-pink-500/10 border-purple-500/20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">
              Investor Earnings
            </p>
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-purple-600" />
              <span className="text-3xl font-mono font-bold text-foreground">
                {parseFloat(totalEarnings).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              From {investments.length} {investments.length === 1 ? "investment" : "investments"}
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <TrendingUp className="w-3 h-3 mr-1" />
            Active Investor
          </Badge>
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
                          $0.05 per unlock
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
            Be among the first 10 to unlock exclusive content and start earning $0.05 from every future unlock!
          </p>
        </Card>
      )}
    </div>
  );
}