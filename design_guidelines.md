# Design Guidelines: Accompagnement Post-Partum

## Design Approach

**Reference-Based Approach**: Drawing inspiration from premium wellness and service sites like Headspace, Calm, and modern doula/midwife platforms, but elevated with sophisticated animations and autumn warmth. This design will differentiate through fluid micro-interactions, scroll-triggered animations, and a cohesive seasonal aesthetic.

**Core Principle**: Create a nurturing, professional digital sanctuary that feels both calming and impressive—combining the warmth of human connection with the polish of premium web experiences.

---

## Typography System

**Font Families** (via Google Fonts):
- Primary: 'Cormorant Garamond' (serif) - Elegant, maternal, trustworthy
- Secondary: 'Inter' (sans-serif) - Clean, modern, readable

**Hierarchy**:
- Hero Headlines: Cormorant Garamond, 4xl to 6xl, font-semibold
- Section Titles: Cormorant Garamond, 3xl to 4xl, font-medium
- Subheadings: Inter, xl to 2xl, font-semibold
- Body Text: Inter, base to lg, font-normal, leading-relaxed
- Captions/Labels: Inter, sm, font-medium, tracking-wide

---

## Layout & Spacing System

**Tailwind Spacing Units**: 4, 8, 12, 16, 20, 24, 32
- Component padding: p-8, p-12, p-16
- Section spacing: py-20, py-24, py-32
- Element gaps: gap-8, gap-12, gap-16
- Margins: m-4, m-8, m-12

**Container Strategy**:
- Full-width sections with max-w-7xl inner containers
- Content max-w-4xl for readability
- Asymmetric layouts for visual interest

---

## Component Library

### Navigation
**Sticky header** with glassmorphism backdrop-blur effect, transforms on scroll (height reduction, shadow addition). Logo left, navigation center, CTA button right with subtle glow animation.

### Hero Section
**Full-viewport immersive hero** (90vh) with layered parallax:
- Background: Large hero image (warm-toned photo of peaceful mother with newborn)
- Foreground: Animated text reveals (staggered fade-in from bottom)
- Floating particles effect (subtle golden amber dots drifting upward)
- Gradient overlay for text legibility
- Primary CTA with animated gradient border and pulse effect

### Service Cards
**Interactive hover cards** in 3-column grid (2-col tablet, 1-col mobile):
- Initial state: Subtle shadow, soft rounded corners
- Hover: Elevates with increased shadow, slight scale (1.03), border glow
- Icon animation: Rotates/scales on hover
- Content reveals with slide-up animation
- Background gradient shift on interaction

### About/Timeline Section
**Animated vertical timeline** with scroll-triggered reveals:
- Timeline nodes appear sequentially as user scrolls
- Content blocks slide in from alternating sides
- Connecting line draws progressively
- Image elements fade and scale into view

### Testimonials Carousel
**3D rotating carousel** with:
- Card flip transitions between testimonials
- Smooth auto-advance with pause-on-hover
- Navigation dots with progress indicators
- Client photos in circular frames with soft shadows
- Quote marks as decorative animated elements

### Resources/Blog Grid
**Masonry-style grid** with:
- Staggered animations on scroll
- Hover effects: image zoom, overlay fade-in
- Category tags with pill styling
- Smooth filtering animations when categories selected

### Contact Form
**Multi-step animated form** with:
- Progress indicator at top
- Input fields with floating labels
- Real-time validation with smooth color transitions
- Success animation (checkmark with expanding circle)
- Smooth height transitions between steps

### Footer
**Comprehensive footer** with newsletter signup, quick links (Services, About, Resources, FAQ, Contact), social icons with hover animations, professional credentials, and trust badges.

---

## Animation Strategy

**Scroll Animations** (using Intersection Observer or library like AOS):
- Fade-in-up for text blocks (stagger delay: 100ms between elements)
- Slide-in from sides for images (left/right alternating)
- Scale-in for cards and statistics
- Draw animations for decorative lines/shapes

**Micro-Interactions**:
- Button hover: Background shift, subtle elevation, text color transition (200ms ease)
- Link underlines: Animated width expansion from center
- Card hover: Shadow intensity, border glow, content shift
- Icon animations: Rotate, bounce, or pulse on hover

**Page Transitions**:
- Smooth fade between sections during scroll
- Loading animation: Organic breathing circle with brand gradient

**Performance**: Use `transform` and `opacity` for animations, `will-change` sparingly, implement reduced-motion media queries.

---

## Images

**Hero Section**: Large, warm-toned photograph of serene mother holding newborn in soft natural light. Composition allows text overlay on left or center.

**About Section**: Professional portrait of practitioner in warm, inviting setting.

**Services**: Lifestyle imagery showing mother-baby bonding, peaceful home environments, supportive interactions.

**Testimonials**: Circular client headshots with soft focus backgrounds.

**Blog/Resources**: Featured images for articles—mix of illustrations and photography in autumn palette.

**Decorative Elements**: Organic shapes, flowing lines, subtle botanical illustrations as SVG overlays.

---

## Responsive Behavior

- Desktop (lg+): Multi-column layouts, full parallax effects, complex animations
- Tablet (md): 2-column grids, simplified parallax, maintained animations
- Mobile (base): Single column, scroll-based reveals instead of parallax, essential animations only

**Touch Optimization**: Larger hit areas (min 44px), swipe-friendly carousels, no hover-dependent critical content.