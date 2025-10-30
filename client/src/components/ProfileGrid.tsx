import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pin, Lock, Eye, TrendingUp } from "lucide-react";
import { PostWithCreator } from "@shared/schema";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface ProfileGridProps {
  posts: PostWithCreator[];
  view: "single" | "grid";
  pinnedPostIds?: string[];
  onPostClick?: (post: PostWithCreator) => void;
}

export function ProfileGrid({ posts, view, pinnedPostIds = [], onPostClick }: ProfileGridProps) {
  // Separate pinned and regular posts
  const pinnedPosts = posts.filter(p => pinnedPostIds.includes(p.id));
  const regularPosts = posts.filter(p => !pinnedPostIds.includes(p.id));
  
  // Combine with pinned first
  const sortedPosts = [...pinnedPosts, ...regularPosts];

  if (sortedPosts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No posts yet</p>
      </div>
    );
  }

  if (view === "single") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {sortedPosts.map((post, index) => (
          <SinglePostCard 
            key={post.id} 
            post={post} 
            isPinned={pinnedPostIds.includes(post.id)}
            onClick={onPostClick}
            index={index}
          />
        ))}
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      data-testid="profile-grid"
    >
      {sortedPosts.map((post, index) => (
        <GridPostCard 
          key={post.id} 
          post={post} 
          isPinned={pinnedPostIds.includes(post.id)}
          onClick={onPostClick}
          index={index}
        />
      ))}
    </div>
  );
}

function SinglePostCard({ 
  post, 
  isPinned, 
  onClick,
  index 
}: { 
  post: PostWithCreator; 
  isPinned: boolean; 
  onClick?: (post: PostWithCreator) => void;
  index: number;
}) {
  const isPaid = post.hasUserPaid || post.isFree;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/?post=${post.id}`}>
        <Card 
          className="overflow-hidden cursor-pointer hover-elevate active-elevate-2 group"
          data-testid={`card-post-single-${post.id}`}
        >
        {/* Pin Indicator */}
        {isPinned && (
          <div className="absolute top-0 left-0 z-10 bg-amber-500 text-white px-3 py-1.5 rounded-br-lg flex items-center gap-1 shadow-lg">
            <Pin className="w-3 h-3" />
            <span className="text-xs font-semibold">Pinned</span>
          </div>
        )}

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={isPaid ? `/api/posts/${post.id}/media` : post.blurredThumbnailPath}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay with info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <h3 className="text-white font-semibold line-clamp-2">{post.title}</h3>
              <div className="flex items-center gap-3 text-white/90 text-sm">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.viewCount || 0}
                </div>
                <Badge className="bg-primary text-primary-foreground font-mono">
                  {post.price}
                </Badge>
              </div>
            </div>
          </div>

          {/* Lock overlay for unpaid content */}
          {!isPaid && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30">
              <Lock className="w-8 h-8 text-white opacity-80" />
            </div>
          )}

          {/* Viral badge */}
          {post.isViral && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive" className="bg-gradient-to-r from-orange-500 to-red-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                Viral
              </Badge>
            </div>
          )}
        </div>

        {/* Info section */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold line-clamp-1" data-testid={`text-title-${post.id}`}>
            {post.title}
          </h3>
          {post.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.description}
            </p>
          )}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Eye className="w-3 h-3" />
              {post.viewCount || 0} views
            </div>
            <Badge className="font-mono font-bold" data-testid={`badge-price-${post.id}`}>
              {post.isFree ? "FREE" : post.price}
            </Badge>
          </div>
        </div>
        </Card>
      </Link>
    </motion.div>
  );
}

function GridPostCard({ 
  post, 
  isPinned, 
  onClick,
  index 
}: { 
  post: PostWithCreator; 
  isPinned: boolean; 
  onClick?: (post: PostWithCreator) => void;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isPaid = post.hasUserPaid || post.isFree;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
    >
      <Link href={`/?post=${post.id}`}>
        <div
          className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group bg-muted"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-testid={`card-post-grid-${post.id}`}
        >
        {/* Pin Indicator */}
        {isPinned && (
          <div className="absolute top-0 left-0 z-20 bg-amber-500 text-white p-2 rounded-br-lg shadow-lg">
            <Pin className="w-4 h-4" />
          </div>
        )}

        {/* Image */}
        <img
          src={isPaid ? `/api/posts/${post.id}/media` : post.blurredThumbnailPath}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Lock overlay for unpaid content */}
        {!isPaid && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40">
            <Lock className="w-10 h-10 text-white opacity-90" />
          </div>
        )}

        {/* Hover overlay with info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4"
        >
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
            {post.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/90 text-xs">
              <Eye className="w-3 h-3" />
              {post.viewCount || 0}
            </div>
            <Badge className="bg-primary text-primary-foreground font-mono text-xs">
              {post.isFree ? "FREE" : post.price}
            </Badge>
          </div>
        </motion.div>

        {/* Viral badge */}
        {post.isViral && (
          <div className="absolute top-2 right-2 z-10">
            <Badge 
              variant="destructive" 
              className="bg-gradient-to-r from-orange-500 to-red-500 text-xs px-2 py-0.5"
            >
              <TrendingUp className="w-3 h-3" />
            </Badge>
          </div>
        )}
        </div>
      </Link>
    </motion.div>
  );
}
