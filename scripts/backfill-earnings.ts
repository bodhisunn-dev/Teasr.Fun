
import { db } from '../server/db';
import { posts, payments, investors } from '../shared/schema';
import { eq, and, sql } from 'drizzle-orm';

async function backfillInvestorEarnings() {
  console.log('Starting investor earnings backfill...');

  // Get all posts with buyout pricing
  const postsWithBuyout = await db.select()
    .from(posts)
    .where(sql`${posts.buyoutPrice} IS NOT NULL`);

  console.log(`Found ${postsWithBuyout.length} posts with buyout pricing`);

  let totalUpdated = 0;

  for (const post of postsWithBuyout) {
    console.log(`\nProcessing post: ${post.title} (${post.id})`);

    // Get all payments for this post
    const postPayments = await db.select()
      .from(payments)
      .where(and(
        eq(payments.postId, post.id),
        eq(payments.paymentType, 'content')
      ))
      .orderBy(payments.paidAt);

    console.log(`  Found ${postPayments.length} payments`);

    // Get investors for this post
    const postInvestors = await db.select()
      .from(investors)
      .where(eq(investors.postId, post.id))
      .orderBy(investors.position);

    if (postInvestors.length === 0) {
      console.log('  No investors found, skipping...');
      continue;
    }

    console.log(`  Found ${postInvestors.length} investors`);

    // Reset all investor earnings to 0
    for (const investor of postInvestors) {
      await db.update(investors)
        .set({ totalEarnings: '0' })
        .where(eq(investors.id, investor.id));
    }

    // Calculate earnings based on payments after first 10
    const paymentsAfterFirst10 = postPayments.slice(10);
    const earningsPerInvestor = paymentsAfterFirst10.length * 0.05;

    console.log(`  Payments after first 10: ${paymentsAfterFirst10.length}`);
    console.log(`  Earnings per investor: $${earningsPerInvestor.toFixed(2)}`);

    // Update each investor's earnings
    for (const investor of postInvestors) {
      const newEarnings = earningsPerInvestor.toFixed(2);
      await db.update(investors)
        .set({ totalEarnings: newEarnings })
        .where(eq(investors.id, investor.id));
      console.log(`    Updated investor position ${investor.position}: $${newEarnings}`);
      totalUpdated++;
    }
  }

  console.log(`\nBackfill complete! Updated ${totalUpdated} investor records across ${postsWithBuyout.length} posts`);
  process.exit(0);
}

backfillInvestorEarnings().catch((error) => {
  console.error('Backfill failed:', error);
  process.exit(1);
});
