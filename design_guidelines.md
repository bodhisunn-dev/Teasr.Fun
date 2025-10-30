# TEASR.FUN Design Guidelines

## Design Approach

**Reference-Based Approach** drawing from:
- **Instagram** - Profile layouts, feed design, story circles, social interactions
- **OnlyFans/Patreon** - Content locking patterns, creator monetization UI, subscription flows
- **Stripe/Coinbase** - Payment modals, transaction trust signals, wallet interfaces
- **Linear** - Clean typography, precise spacing, dark mode excellence

This platform prioritizes creator empowerment and payment trust through familiar social patterns enhanced with premium crypto-native interactions.

---

## Color System

### Base Palette
**Backgrounds**:
- Primary: #0A0A0F (near-black, main app background)
- Secondary: #131318 (elevated surfaces, cards)
- Tertiary: #1A1A22 (hover states, modals)

**Text**:
- Primary: #FFFFFF (headings, key content)
- Secondary: #A0A0B0 (body text, metadata)
- Tertiary: #6B6B7B (timestamps, helper text)

**Accent Colors**:
- Primary Purple: #8B5CF6 (CTAs, focus states, premium badges)
- Electric Blue: #3B82F6 (links, interactive elements)
- Success Green: #10B981 (unlocked content, confirmations)
- Warning Amber: #F59E0B (price tags, unlock prompts)

**Borders & Dividers**:
- Subtle: #2A2A35 (default borders)
- Emphasized: #3A3A48 (focused inputs, modal edges)

**Overlays**:
- Modal backdrop: rgba(10, 10, 15, 0.85)
- Locked content blur: backdrop-blur-2xl with purple-tinted overlay

### Gradients
- **Premium Badge**: Linear gradient from #8B5CF6 to #3B82F6
- **Locked Content Overlay**: Radial gradient from transparent purple to dark purple
- **Hero Sections**: Subtle purple-to-blue gradient backgrounds

---

## Typography

**Font Stack**: Inter (UI), JetBrains Mono (addresses/transactions)

**Hierarchy**:
- **Profile Names**: text-4xl font-bold (48px), text-white
- **Section Headers**: text-2xl font-semibold (24px), text-white
- **Content Titles**: text-lg font-medium (18px), text-gray-100
- **Body Text**: text-base (16px), text-gray-300
- **Metadata**: text-sm (14px), text-gray-400
- **Micro-copy**: text-xs (12px), text-gray-500

**Crypto Elements**:
- Wallet addresses: JetBrains Mono, text-sm, text-blue-400
- Transaction amounts: font-semibold, tabular-nums, text-white

---

## Layout System

**Spacing Units**: 4, 6, 8, 12, 16, 24 (Tailwind units)

**Container Structure**:
- Max width: max-w-7xl with mx-auto px-4 (mobile), px-6 (desktop)
- Profile layout: 280px sidebar + flex-1 feed + 320px suggestions (desktop)
- Feed content: max-w-2xl centered for readability

**Grid Patterns**:
- Content gallery: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
- Profile stats: flex justify-around on mobile, gap-12 on desktop
- Payment breakdowns: Two-column split in modals

---

## Component Library

### Navigation
**Desktop Top Bar** (h-16, fixed):
- Dark background (#131318) with subtle bottom border (#2A2A35)
- Logo left with purple gradient glow
- Center search: w-96, rounded-full, dark input with purple focus ring
- Right section: Notification bell + USDC balance display + wallet address (truncated) + circular avatar

**Mobile Bottom Nav** (h-16, fixed):
- Five icons: Home, Explore, Upload (center, elevated), Wallet, Profile
- Active state: Purple underline indicator
- Icons change to filled variants when active

### Profile Components

**Profile Header**:
- Cover image: h-64 with purple-tinted gradient overlay at bottom
- Avatar: w-40 h-40, circular with 4px purple ring, positioned overlapping cover
- Stats row below: Followers, Following, Unlocked count (vertical layout on mobile)
- Bio: text-gray-300, max-w-md
- Action buttons: "Follow" (purple gradient), "Share" (outlined), "More" (icon-only)
- Creator badge: Purple verified checkmark next to username

### Content Cards

**Locked Content Card**:
- Dark card background (#131318) with subtle border (#2A2A35)
- Image preview with heavy blur-2xl + purple-tinted overlay
- Large centered lock icon (w-20 h-20) with subtle purple glow effect
- Price badge: Absolute top-right, rounded-full, amber gradient (#F59E0B), backdrop-blur
- Creator mini-profile: Avatar + username at bottom-left
- "Unlock for X USDC" button: Full-width, purple gradient, prominent
- Hover: Card lifts with shadow-2xl, lock icon pulses gently

**Unlocked Content Card**:
- Full image visible, no blur
- Green checkmark badge top-right (#10B981)
- Unlock timestamp: Bottom overlay, semi-transparent dark background
- Engagement icons: Heart, comment, share (white icons, hover to purple)

**Feed Post**:
- Card background (#131318), rounded-lg, border (#2A2A35)
- Header: Avatar (w-12 h-12) + username + timestamp + follow button
- Image: Full-width, aspect-video or aspect-square
- Footer: Like/comment/share left-aligned, bookmark right-aligned
- Hover: Border transitions to purple (#8B5CF6)

### Payment Components

**Payment Modal** (max-w-3xl, centered overlay):
- Two-column layout (60/40 split): Preview left, details right
- Preview side: Locked content with subtle animation, "What you'll unlock" header
- Details side:
  - Creator info: Large avatar + name + verified badge
  - Price breakdown: Item price (large, white), network fee (gray), total (purple, emphasized)
  - Wallet status: Connected address or "Connect Wallet" prompt
  - "Unlock Now" button: Full-width, purple gradient, extra padding
  - Security badges: LayerZero + Coinbase logos at bottom with "Secured by" text
- Background: Dark (#1A1A22) with emphasized border

**Transaction Progress**:
- Step indicator: Three stages with connecting lines, active step in purple
- Status messages: Large text explaining current state
- Blockchain icon animated: Spinning during processing
- Success screen: Confetti burst (brief), green checkmark, "Content Unlocked" message

**Wallet Panel**:
- Dropdown from nav showing: Balance (large USDC amount), recent transactions list, disconnect option
- Each transaction: Icon + description + amount + timestamp
- "View All Transactions" link at bottom

### Social Elements

**Follow Button States**:
- Unfollowed: Solid purple gradient, "Follow"
- Following: Dark outlined (#3A3A48 border), "Following", hover shows "Unfollow" in red
- Loading: Spinner replaces text, maintains button size

**Creator Discovery Card**:
- Horizontal layout: Avatar (w-16 h-16) + name/bio + follow button
- Purple accent line on left edge for featured creators
- Preview thumbnails (3-4 small images) showing content style

### Notifications

**Toast Notifications** (slide from top-right):
- Dark background (#1A1A22), border-l-4 with color-coded accent (purple = info, green = success, amber = warning)
- Icon + message + close button
- Auto-dismiss after 4 seconds
- Stacked when multiple appear

---

## Images

### Profile Images
- **Cover Photos**: 16:9 ratio (1200x675), creators upload custom banners with purple gradient overlay applied by default
- **Avatars**: Square uploads auto-cropped to circle, min 400x400px, purple ring border

### Content Images
- **Locked Previews**: Heavy blur filter + 40% purple overlay tint, content barely visible
- **Unlocked Content**: Full resolution, aspect ratios preserved (square or vertical recommended)
- **Feed Posts**: User uploads, recommended 1:1 or 16:9

### Placeholder Images
- Default avatars: Geometric purple gradient patterns (not generic silhouettes)
- Missing covers: Animated purple-blue gradient meshes
- Empty states: Custom illustrations in purple/blue palette showing lock icons, confetti, or celebration themes

---

## Interaction Design

**Hover States**:
- Cards: Lift with scale-102, shadow-2xl, border transitions to purple
- Buttons: Gradient shifts slightly lighter, no scale change
- Locked content: Lock icon glows more intensely, subtle bounce animation

**Loading States**:
- Skeleton screens: Dark base with lighter animated shimmer (#2A2A35 to #3A3A48)
- Button spinners: White on purple background, maintains button dimensions
- Image loading: Blurred purple placeholder fades to content

**Focus States**:
- All inputs: 2px purple ring, offset by 2px
- Keyboard navigation: Purple outline on focusable elements
- Tab order follows natural reading flow

**Success Moments**:
- First unlock: Brief confetti animation (purple/blue particles)
- Follow confirmation: Heart icon briefly scales up
- Payment success: Green checkmark animates in with elastic spring

---

## Platform-Specific Elements

### Trust Indicators
- Verified creator badge: Purple checkmark in circle next to username
- Payment security: "Secured by LayerZero & Coinbase" with logos in all payment contexts
- Transaction links: Blue underlined blockchain explorer links
- Network display: Always show "Base" or "Solana" with icon next to amounts

### Web3 UX
- Gas estimates: Shown in gray text below amounts, updates in real-time
- Network selector: Dropdown with chain logos, current selection highlighted in purple
- Wallet states: Clear connected/disconnected indicators, never hidden
- Transaction history: Accessible from wallet panel, shows pending/confirmed states

### Responsive Behavior
- Desktop (1024px+): Three-column profile layout, full navigation
- Tablet (768-1023px): Two-column (feed + sidebar), collapsed suggestions
- Mobile (<768px): Single column, bottom navigation, full-screen modals

### Accessibility
- Color contrast: All text meets WCAG AA on dark backgrounds
- Focus management: Clear purple indicators, logical tab order
- Screen readers: ARIA labels for locked/unlocked states, payment amounts announced
- Reduced motion: Respect prefers-reduced-motion, disable decorative animations

---

## Key Visual Principles

1. **Dark Luxury**: Rich blacks create canvas for vibrant content, purple accents signal premium
2. **Payment Transparency**: Every cost clearly displayed, no hidden fees, trust through clarity
3. **Content Hierarchy**: Locked state unmistakable through blur + icon + color, unlocked content vibrant
4. **Familiar Social DNA**: Follow/like/share mechanics work exactly as Instagram users expect
5. **Crypto-Native Confidence**: Wallet integration feels natural, not tacked-on, blockchain trust signals throughout