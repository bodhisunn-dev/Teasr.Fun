import { InvestorBadge } from "../InvestorBadge";

export default function InvestorBadgeExample() {
  return (
    <div className="max-w-md p-6 space-y-6 bg-card rounded-lg">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Early Investor Spots Available</h3>
        <InvestorBadge investorCount={3} showProgress={true} />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Almost Full</h3>
        <InvestorBadge investorCount={9} showProgress={true} />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">All Spots Filled</h3>
        <InvestorBadge investorCount={10} showProgress={true} />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Compact View</h3>
        <InvestorBadge investorCount={5} showProgress={false} />
      </div>
    </div>
  );
}
