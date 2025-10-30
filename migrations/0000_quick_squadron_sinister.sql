CREATE TABLE "comments" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "direct_messages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sender_id" varchar NOT NULL,
	"receiver_id" varchar NOT NULL,
	"post_id" varchar,
	"content" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "follows" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"follower_id" varchar NOT NULL,
	"following_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "follows_follower_id_following_id_unique" UNIQUE("follower_id","following_id")
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"type" text NOT NULL,
	"actor_id" varchar,
	"post_id" varchar,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"post_id" varchar NOT NULL,
	"amount" numeric(18, 6) NOT NULL,
	"cryptocurrency" text DEFAULT 'USDC' NOT NULL,
	"network" text DEFAULT 'base-sepolia' NOT NULL,
	"is_buyout" boolean DEFAULT false NOT NULL,
	"transaction_hash" text,
	"payment_type" text NOT NULL,
	"paid_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "payments_user_id_post_id_payment_type_unique" UNIQUE("user_id","post_id","payment_type")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"creator_id" varchar NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"encrypted_media_path" text NOT NULL,
	"blurred_thumbnail_path" text NOT NULL,
	"media_type" text NOT NULL,
	"encrypted_key" text NOT NULL,
	"iv" text NOT NULL,
	"auth_tag" text NOT NULL,
	"price" numeric(18, 6) NOT NULL,
	"is_free" boolean DEFAULT false NOT NULL,
	"buyout_price" numeric(18, 6),
	"accepted_cryptos" text DEFAULT 'USDC' NOT NULL,
	"comments_locked" boolean DEFAULT false NOT NULL,
	"comment_fee" numeric(18, 6),
	"view_count" integer DEFAULT 0 NOT NULL,
	"upvote_count" integer DEFAULT 0 NOT NULL,
	"downvote_count" integer DEFAULT 0 NOT NULL,
	"is_viral" boolean DEFAULT false NOT NULL,
	"viral_detected_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wallet_address" text NOT NULL,
	"username" text NOT NULL,
	"bio" text,
	"profile_image_path" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_wallet_address_unique" UNIQUE("wallet_address"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "viral_notifications" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" varchar NOT NULL,
	"notified_at" timestamp DEFAULT now() NOT NULL,
	"views_at_notification" integer NOT NULL,
	"upvotes_at_notification" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"vote_type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "votes_user_id_post_id_unique" UNIQUE("user_id","post_id")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "direct_messages" ADD CONSTRAINT "direct_messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "direct_messages" ADD CONSTRAINT "direct_messages_receiver_id_users_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "direct_messages" ADD CONSTRAINT "direct_messages_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_users_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_users_id_fk" FOREIGN KEY ("following_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "viral_notifications" ADD CONSTRAINT "viral_notifications_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;