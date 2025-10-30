CREATE TABLE "referral_codes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"user_id" varchar NOT NULL,
	"max_uses" integer DEFAULT 0,
	"current_uses" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp,
	CONSTRAINT "referral_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"referrer_id" varchar NOT NULL,
	"referred_id" varchar NOT NULL,
	"referral_code_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "referrals_referred_id_unique" UNIQUE("referred_id")
);
--> statement-breakpoint
ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referrer_id_users_id_fk" FOREIGN KEY ("referrer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referred_id_users_id_fk" FOREIGN KEY ("referred_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referral_code_id_referral_codes_id_fk" FOREIGN KEY ("referral_code_id") REFERENCES "public"."referral_codes"("id") ON DELETE set null ON UPDATE no action;