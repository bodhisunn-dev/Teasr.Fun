import { InvestorEarnings } from "../InvestorEarnings";

const mockInvestments = [
  {
    postId: "1",
    postTitle: "Sunset at the Beach - Exclusive Photography",
    position: 3,
    earningsGenerated: "2.50",
    totalUnlocks: 50,
  },
  {
    postId: "2",
    postTitle: "Mountain Adventure Series",
    position: 1,
    earningsGenerated: "4.20",
    totalUnlocks: 84,
  },
  {
    postId: "3",
    postTitle: "City Lights Collection",
    position: 7,
    earningsGenerated: "1.35",
    totalUnlocks: 27,
  },
];

export default function InvestorEarningsExample() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-background">
      <div>
        <h3 className="text-lg font-semibold mb-4">With Investments</h3>
        <InvestorEarnings 
          totalEarnings="8.05" 
          investments={mockInvestments}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">No Investments Yet</h3>
        <InvestorEarnings 
          totalEarnings="0.00" 
          investments={[]}
        />
      </div>
    </div>
  );
}
