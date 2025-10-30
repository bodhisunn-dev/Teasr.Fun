import { Lock, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface ContentCardProps {
  post: {
    id: string;
    caption?: string | null;
    imageUrl: string;
    thumbnailUrl?: string | null;
    isLocked: boolean;
    price?: string | null;
    network?: string | null;
    createdAt: Date;
    author: {
      id: string;
      username: string;
      displayName?: string | null;
      avatarUrl?: string | null;
    };
  };
  isUnlocked?: boolean;
  onUnlock?: (postId: string) => void;
}

export default function ContentCard({ post, isUnlocked = false, onUnlock }: ContentCardProps) {
  const showLocked = post.isLocked && !isUnlocked;
  const imageToShow = showLocked && post.thumbnailUrl ? post.thumbnailUrl : post.imageUrl;

  return (
    <div className="bg-card border border-card-border rounded-md overflow-hidden hover-elevate" data-testid={`card-post-${post.id}`}>
      {/* Author Header */}
      <div className="flex items-center gap-3 p-4">
        <Link href={`/profile/${post.author.username}`}>
          <a data-testid={`link-author-${post.author.username}`}>
            <Avatar className="w-10 h-10 hover-elevate active-elevate-2">
              <AvatarImage src={post.author.avatarUrl || undefined} />
              <AvatarFallback>{post.author.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </a>
        </Link>
        <div className="flex-1">
          <Link href={`/profile/${post.author.username}`}>
            <a data-testid={`text-author-${post.author.username}`}>
              <p className="font-semibold text-sm hover:text-primary">
                {post.author.displayName || post.author.username}
              </p>
            </a>
          </Link>
          <p className="text-xs text-muted-foreground">
            @{post.author.username}
          </p>
        </div>
        {showLocked && (
          <Badge variant="secondary" className="gap-1">
            <Lock className="w-3 h-3" />
            Locked
          </Badge>
        )}
        {isUnlocked && (
          <Badge className="gap-1 bg-green-500 hover:bg-green-600">
            <Check className="w-3 h-3" />
            Unlocked
          </Badge>
        )}
      </div>

      {/* Image Content */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imageToShow}
          alt={post.caption || "Content"}
          className={`w-full h-full object-cover ${showLocked ? "blur-xl scale-110" : ""}`}
        />
        {showLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
            <div className="flex flex-col items-center gap-4 p-6">
              <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center text-white">
                <p className="text-2xl font-bold">{post.price} USDC</p>
                <p className="text-sm opacity-90">
                  {post.network === "base" ? "on Base" : post.network === "solana" ? "on Solana" : ""}
                </p>
              </div>
              <Button
                onClick={() => onUnlock?.(post.id)}
                className="gap-2 bg-primary hover:bg-primary/90"
                data-testid={`button-unlock-${post.id}`}
              >
                <Lock className="w-4 h-4" />
                Unlock Content
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      {post.caption && (
        <div className="p-4">
          <p className="text-sm" data-testid={`text-caption-${post.id}`}>
            <span className="font-semibold">{post.author.username}</span>{" "}
            {post.caption}
          </p>
        </div>
      )}

      {/* Timestamp */}
      <div className="px-4 pb-4">
        <p className="text-xs text-muted-foreground">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
