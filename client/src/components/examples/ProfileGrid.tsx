import { useState } from "react";
import { ProfileGrid } from "../ProfileGrid";
import { GridToggle } from "../GridToggle";
import { PostWithCreator } from "@shared/schema";

// Mock data for demo
const mockPosts: PostWithCreator[] = [
  {
    id: "1",
    title: "Sunset at the Beach",
    description: "Beautiful golden hour photography",
    price: "$5.99",
    blurredThumbnailPath: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&blur=50",
    hasUserPaid: true,
    isFree: false,
    viewCount: 1234,
    upvoteCount: 89,
    downvoteCount: 2,
    isViral: true,
    acceptedCryptos: "USDC",
    creatorId: "creator1",
    creator: {
      id: "creator1",
      username: "photographer",
      walletAddress: "0x123",
      profileImagePath: null,
      bio: null,
      createdAt: new Date().toISOString(),
    },
    mediaType: "image",
    commentCount: 45,
    encryptedMediaPath: "",
    commentsLocked: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Mountain Adventure",
    description: "Hiking the peaks",
    price: "$3.99",
    blurredThumbnailPath: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&blur=50",
    hasUserPaid: false,
    isFree: false,
    viewCount: 567,
    upvoteCount: 34,
    downvoteCount: 1,
    isViral: false,
    acceptedCryptos: "USDC",
    creatorId: "creator1",
    creator: {
      id: "creator1",
      username: "photographer",
      walletAddress: "0x123",
      profileImagePath: null,
      bio: null,
      createdAt: new Date().toISOString(),
    },
    mediaType: "image",
    commentCount: 12,
    encryptedMediaPath: "",
    commentsLocked: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "City Lights",
    description: "Urban night photography",
    price: "$4.99",
    blurredThumbnailPath: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=500&blur=50",
    hasUserPaid: true,
    isFree: false,
    viewCount: 890,
    upvoteCount: 67,
    downvoteCount: 3,
    isViral: false,
    acceptedCryptos: "USDC",
    creatorId: "creator1",
    creator: {
      id: "creator1",
      username: "photographer",
      walletAddress: "0x123",
      profileImagePath: null,
      bio: null,
      createdAt: new Date().toISOString(),
    },
    mediaType: "image",
    commentCount: 23,
    encryptedMediaPath: "",
    commentsLocked: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Ocean Waves",
    description: "Peaceful seascape",
    price: "FREE",
    blurredThumbnailPath: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&blur=50",
    hasUserPaid: false,
    isFree: true,
    viewCount: 2341,
    upvoteCount: 156,
    downvoteCount: 5,
    isViral: true,
    acceptedCryptos: "USDC",
    creatorId: "creator1",
    creator: {
      id: "creator1",
      username: "photographer",
      walletAddress: "0x123",
      profileImagePath: null,
      bio: null,
      createdAt: new Date().toISOString(),
    },
    mediaType: "image",
    commentCount: 78,
    encryptedMediaPath: "",
    commentsLocked: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Forest Trail",
    description: "Nature walk",
    price: "$2.99",
    blurredThumbnailPath: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&blur=50",
    hasUserPaid: false,
    isFree: false,
    viewCount: 456,
    upvoteCount: 28,
    downvoteCount: 1,
    isViral: false,
    acceptedCryptos: "USDC",
    creatorId: "creator1",
    creator: {
      id: "creator1",
      username: "photographer",
      walletAddress: "0x123",
      profileImagePath: null,
      bio: null,
      createdAt: new Date().toISOString(),
    },
    mediaType: "image",
    commentCount: 9,
    encryptedMediaPath: "",
    commentsLocked: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Desert Dunes",
    description: "Golden sands",
    price: "$6.99",
    blurredThumbnailPath: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=500&blur=50",
    hasUserPaid: true,
    isFree: false,
    viewCount: 723,
    upvoteCount: 45,
    downvoteCount: 2,
    isViral: false,
    acceptedCryptos: "USDC",
    creatorId: "creator1",
    creator: {
      id: "creator1",
      username: "photographer",
      walletAddress: "0x123",
      profileImagePath: null,
      bio: null,
      createdAt: new Date().toISOString(),
    },
    mediaType: "image",
    commentCount: 15,
    encryptedMediaPath: "",
    commentsLocked: false,
    createdAt: new Date().toISOString(),
  },
];

export default function ProfileGridExample() {
  const [view, setView] = useState<"single" | "grid">("grid");
  const pinnedPostIds = ["1"]; // First post is pinned

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold">Profile Posts</h2>
        <GridToggle view={view} onChange={setView} />
      </div>
      
      <div className="max-w-6xl mx-auto">
        <ProfileGrid 
          posts={mockPosts} 
          view={view}
          pinnedPostIds={pinnedPostIds}
          onPostClick={(post) => console.log("Clicked post:", post.title)}
        />
      </div>
    </div>
  );
}
