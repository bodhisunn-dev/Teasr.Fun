import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Loader2, Check } from "lucide-react";
import { useRef } from "react";

interface ProfileHeaderProps {
  user: {
    id: string;
    username: string;
    displayName?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
    coverImageUrl?: string | null;
  };
  stats: {
    followers: number;
    following: number;
    unlockedContent: number;
  };
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  isFollowLoading?: boolean;
  onFollow?: () => void;
  onAvatarUpload?: (file: File) => void;
  isUploadingAvatar?: boolean;
}

export default function ProfileHeader({
  user,
  stats,
  isOwnProfile = false,
  isFollowing = false,
  isFollowLoading = false,
  onFollow,
  onAvatarUpload,
  isUploadingAvatar = false,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (isOwnProfile && !isUploadingAvatar) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarUpload) {
      onAvatarUpload(file);
    }
  };

  return (
    <div className="bg-card border-b border-card-border">
      {/* Cover Image */}
      {user.coverImageUrl && (
        <div className="h-48 md:h-64 bg-muted overflow-hidden">
          <img
            src={user.coverImageUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {!user.coverImageUrl && (
        <div className="h-48 md:h-64 bg-gradient-to-br from-primary/20 to-primary/5" />
      )}

      {/* Profile Info */}
      <div className="max-w-5xl mx-auto px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 md:-mt-20">
          {/* Avatar */}
          <div className="relative">
            <div
              className={`relative ${isOwnProfile ? "cursor-pointer group" : ""}`}
              onClick={handleAvatarClick}
            >
              <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-background shadow-xl">
                <AvatarImage 
                  src={user.avatarUrl || undefined} 
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl">
                  {user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {isUploadingAvatar ? (
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  ) : (
                    <Camera className="w-8 h-8 text-white" />
                  )}
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              data-testid="input-avatar-upload"
            />
          </div>

          {/* Info & Actions */}
          <div className="flex-1 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-display-name">
                  {user.displayName || user.username}
                </h1>
                <p className="text-muted-foreground" data-testid="text-username">
                  @{user.username}
                </p>
              </div>
              {user.bio && (
                <p className="text-sm max-w-md" data-testid="text-bio">
                  {user.bio}
                </p>
              )}
              
              {/* Stats */}
              <div className="flex items-center gap-6 pt-2">
                <div className="text-center">
                  <p className="text-xl font-bold" data-testid="text-followers-count">{stats.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold" data-testid="text-following-count">{stats.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold" data-testid="text-unlocked-count">{stats.unlockedContent}</p>
                  <p className="text-xs text-muted-foreground">Unlocked</p>
                </div>
              </div>
            </div>

            {/* Follow Button */}
            {!isOwnProfile && (
              <Button
                onClick={onFollow}
                variant={isFollowing ? "outline" : "default"}
                size="lg"
                className={`gap-2 ${isFollowing ? "hover:bg-destructive hover:text-destructive-foreground hover:border-destructive" : ""}`}
                disabled={isFollowLoading}
                data-testid="button-follow"
              >
                {isFollowLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isFollowing ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="group-hover:hidden">Following</span>
                    <span className="hidden group-hover:inline">Unfollow</span>
                  </>
                ) : (
                  "Follow"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
