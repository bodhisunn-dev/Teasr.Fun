import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import ContentCard from "@/components/ContentCard";
import PaymentModal from "@/components/PaymentModal";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Fetch feed posts
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["/api/posts"],
  });

  // Fetch current user
  const { data: currentUser } = useQuery({
    queryKey: ["/api/users/me"],
  });

  // Fetch unlocked content for current user
  const { data: unlockedContent } = useQuery({
    queryKey: ["/api/unlocked"],
    enabled: !!currentUser,
  });

  const handleUnlock = (postId: string) => {
    const post = posts?.find((p: any) => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setPaymentModalOpen(true);
    }
  };

  const handleConfirmPayment = async (postId: string, network: string) => {
    // This will be implemented with actual payment logic in backend integration
    console.log("Processing payment for post:", postId, "on network:", network);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
  };

  const isPostUnlocked = (postId: string) => {
    return unlockedContent?.some((uc: any) => uc.postId === postId);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation currentUser={currentUser} />
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover</h1>
          <p className="text-muted-foreground">
            Explore exclusive content from creators
          </p>
        </div>

        {postsLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post: any) => (
              <ContentCard
                key={post.id}
                post={post}
                isUnlocked={isPostUnlocked(post.id)}
                onUnlock={handleUnlock}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No posts yet. Follow creators to see their content!</p>
          </div>
        )}
      </main>

      {selectedPost && (
        <PaymentModal
          open={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          post={selectedPost}
          onConfirm={handleConfirmPayment}
        />
      )}
    </div>
  );
}
