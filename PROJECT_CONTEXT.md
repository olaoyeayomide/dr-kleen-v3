# Dr.Kleen Project Context & Architecture

**Project Name:** Dr.Kleen - Professional Cleaning & Hygiene Services  
**Version:** 3.0  
**Type:** Landing Page / SaaS Web Application  
**Location:** Nigeria (Lagos-focused, multi-city service expansion)

---

## 1. Project Overview

Dr.Kleen is a **premium digital cleaning and pest control services platform** that combines:

- Professional cleaning services (residential, commercial, post-construction)
- Pest control and vector management
- Corporate facility maintenance retainers
- E-commerce shop (cleaning products and equipment)
- Interactive assessment tools and booking system

The application is a **single-page application (SPA)** built with React + TypeScript, featuring a comprehensive landing page with integrated booking ecosystem, modals, and digital tools.

---

## 2. Technology Stack

### Core Framework

- **React:** 19.0.1 (latest)
- **TypeScript:** ~5.8.2 (strict mode enabled)
- **Vite:** 6.2.3 (build tool, dev server on port 3000)

### Styling & UI

- **Tailwind CSS:** 4.1.14 (@tailwindcss/vite for integration)
- **Lucide React:** 0.546.0 (icon library)
- **Motion:** 12.23.24 (animation library, currently installed)
- **Font:** Plus Jakarta Sans (Google Fonts - loaded in index.html)

### Build & Development

- **ESBuild:** 0.25.0 (TypeScript transpilation)
- **Autoprefixer:** 10.4.21
- **TSX:** 4.21.0 (TypeScript executor)
- **Vite React Plugin:** 5.0.4

### Backend/Services

- **Express.js:** 4.21.2 (likely for backend API)
- **Google GenAI:** 2.4.0 (AI integration capability)
- **Dotenv:** 17.2.3 (environment variables)

### Development Tools

- **TypeScript Compiler:** No emit mode (type checking only)
- **HMR (Hot Module Replacement):** Configurable via DISABLE_HMR env var
- **Module Resolution:** Bundler strategy with path aliases (@/\*)

---

## 3. Project Structure

```
src/
├── App.tsx                    # Root component, state management hub
├── main.tsx                   # Entry point, React DOM rendering
├── types.ts                   # TypeScript interfaces (data models)
├── index.css                  # Global styles, Tailwind imports, animations
│
├── components/                # 25+ component modules
│   ├── Navbar.tsx            # Header nav with 5 ecosystem doors, cart badge
│   ├── Hero.tsx              # Hero section with parallax, CTAs
│   ├── HeroBackground.tsx    # Animated hero background (bubbles, orbits)
│   ├── NeedSection.tsx       # 5 category cards (Home/Business/Pest/Post-c/Not Sure)
│   ├── NeedSectionBackground.tsx  # Decorative parallax layer
│   ├── ExperienceSection.tsx # Tagline & value props
│   ├── ServicesSection.tsx   # Residential/Commercial/Post-Construction services
│   ├── BeforeAfterSection.tsx # Interactive split-screen comparison
│   ├── PestControlSection.tsx # Pest threat pillars, assessment CTA
│   ├── HowItWorksSection.tsx # 5-step process visualization
│   ├── ProtectionPlansSection.tsx # Cleaning retainer plans
│   ├── CorporateSection.tsx  # B2B corporate facility services
│   ├── CustomerReviewsSection.tsx # Star ratings, testimonials
│   ├── ServiceAreasSection.tsx # Geographic coverage (Currently Serving/Coming Soon)
│   ├── TeamSection.tsx       # Team member profiles with departments
│   ├── ShopSection.tsx       # E-commerce product teaser
│   ├── FinalCTA.tsx          # Last-minute conversion CTA (Book/WhatsApp/Call)
│   ├── Footer.tsx            # 4-column footer with links, social
│   ├── TrustBanner.tsx       # Inline trust/confidence messaging
│   │
│   ├── BookingModal.tsx      # Service booking form (modal)
│   ├── SmartPestAssessmentModal.tsx # 7-step interactive pest diagnosis
│   ├── ServicesDetailModal.tsx     # Full services catalog (expandable)
│   ├── CorporateQuoteModal.tsx     # Corporate facility inspection request
│   ├── PlansModal.tsx              # Protection Plans subscription modal
│   ├── DemoModal.tsx               # (Reserved/unused currently)
│   ├── CustomerPortalModal.tsx     # Customer reviews/portal access
│   ├── CartDrawer.tsx              # E-commerce shopping cart
│   │
│   └── common/
│       ├── Logo.tsx          # Branded logo component (DR•KLEEN)
│       └── SparkleIcon.tsx    # Custom sparkle/star SVG icon
│
├── data/
│   └── mockData.ts          # Seed data for services, products, reviews, teams
│
├── index.css                # Global styles
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript compiler options
├── package.json             # Dependencies & scripts
└── index.html               # HTML entry point, metadata, fonts

```

---

## 4. Key Architecture Decisions

### State Management

- **Centralized in App.tsx**: All stateful modals and UI states managed at root level
- **Props-based communication**: Components receive callbacks (onOpenBooking, onClose, etc.)
- **E-Commerce Cart State**: Maintained in App.tsx, passed to CartDrawer and ShopSection
- **No Redux/Context API**: Simple useState hooks sufficient for current scope

### Component Composition Patterns

1. **Section Components**: Full-height scrollable sections (Hero, Services, etc.)
2. **Modal Components**: Overlay dialogs with backdrop and close handlers
3. **Common Components**: Reusable UI elements (Logo, Icons)
4. **Background Components**: Decorative animated layers (HeroBackground, NeedSectionBackground)

### Styling Approach

- **Utility-First CSS**: Tailwind CSS for all styling
- **Custom Animations**: CSS keyframes defined in index.css
  - `headerSlideDown`, `navItemEntrance`, `logoEntrance`, `ctaEntrance`
  - Motion/animation utilities for scroll-triggered reveals
- **Design System**:
  - Primary Color: `#031F5E` (dark navy blue)
  - Accent Colors: Sky-400 (`#1693d9`), Orange, Yellow, Cyan
  - Typography: Plus Jakarta Sans (system fallback)
  - Spacing: Tailwind scale (4px base unit)
  - Responsive: Mobile-first breakpoints (sm, md, lg)

### Interaction Patterns

- **Parallax Effects**: Mouse-based translateX/Y on Hero and NeedSection
- **Scroll-Triggered Animations**: IntersectionObserver for viewport reveal
- **Accessibility**:
  - Respects `prefers-reduced-motion` media query
  - Touch device detection (disables parallax on mobile)
  - Focus-visible rings for keyboard navigation
  - Semantic HTML with ARIA labels
- **Progressive Enhancement**: Non-critical animations disabled on low-end devices

### Routing Approach

- **No routing library**: Single-page, scroll-to-section navigation
- **Hash-based anchors**: #hero, #services-section, #pest-control, #plans, etc.
- **Smooth scroll behavior**: CSS `scroll-behavior: smooth` + manual scrollIntoView()

---

## 5. Component Inventory & Responsibilities

### Page Sections (Displayed in Order)

1. **Navbar** - Nav links, CTA buttons, cart badge, mobile menu
2. **Hero** - Headline, trust badge, CTAs (Book/Call), parallax background
3. **NeedSection** - 5 category cards with icons and color themes
4. **ExperienceSection** - Value propositions, tagline
5. **ServicesSection** - Service cards (Residential, Commercial, Post-Construction)
6. **BeforeAfterSection** - Before/After image carousel with transformation details
7. **PestControlSection** - Pest threat icons, assessment call-to-action
8. **HowItWorksSection** - 5-step process (01-05) with icons
9. **ProtectionPlansSection** - Cleaning retainer plans pricing tiers
10. **CorporateSection** - B2B sector-specific offerings (Banking, Hospitality, etc.)
11. **CustomerReviewsSection** - 5-star reviews, testimonials with avatars
12. **ServiceAreasSection** - City-based coverage map (Currently Serving vs Coming Soon)
13. **TeamSection** - Team member profiles by department
14. **ShopSection** - E-commerce product showcase (teaser)
15. **FinalCTA** - Last conversion module (Book/WhatsApp/Call)
16. **Footer** - 4-column footer (Brand Info, Services, Company, Contact/Shop)
17. **TrustBanner** - Inline trust indicator (part of Hero)

### Interactive Modals (Overlays)

- **BookingModal** - Service date/time booking form
- **SmartPestAssessmentModal** - 7-step interactive pest diagnosis tool
- **ServicesDetailModal** - Full service catalog with filtering
- **CorporateQuoteModal** - Business facility inspection request
- **PlansModal** - Protection Plans subscription options
- **CustomerPortalModal** - Customer reviews portal access
- **CartDrawer** - Shopping cart sidebar/drawer
- **DemoModal** - Reserved (unused currently)

---

## 6. Data Models & Interfaces

### Core Data Types (from types.ts):

**ServiceCategory**

- `id`, `title`, `description`, `icon`, `colorTheme` (blue|cyan|orange|yellow|sky)

**DetailedService**

- `id`, `category` (residential|commercial|post-construction)
- `title`, `tagline`, `description`, `features[]`
- `startingPrice`, `duration`, `image`, `popular?`

**BeforeAfterItem**

- `title`, `category` (Bedroom|Sofa|Office|Post-construction space)
- `beforeImage`, `afterImage`, `details`, `timeSpent`

**PestPillar**

- `name`, `icon`, `threatLevel`, `description`, `treatment`

**PestAssessmentData** (form submission)

- `pestType`, `area`, `severity`, `duration`, `photoUrl?`
- `address`, `city`, `preferredDate`, `preferredTime`
- `fullName`, `phone`, `notes?`

**ProtectionPlan**

- `name`, `cadence`, `tagline`, `price`, `popular?`
- `targetAudience`, `features[]`, `coverage`

**CorporateSector**

- `name`, `icon`, `description`, `deliverables[]`, `image`

**CustomerReview**

- `name`, `role?`, `rating`, `service`, `location`
- `verified`, `date`, `comment`, `avatar`

**ServiceLocation**

- `city`, `state`, `status` (Currently Serving | Coming Soon)
- `neighborhoods[]`, `hotline`

**TeamMember**

- `name`, `role`, `department` (Operations & QA | Technical Team | Customer Experience | Leadership)
- `bio`, `image`, `experience`

**ShopProduct**

- `id`, `name`, `category` (Hygiene Products|Cleaning Tools|Professional Equipment|Home-Care Essentials)
- `price`, `originalPrice?`, `rating`, `reviewsCount`
- `image`, `description`, `inStock`, `volumeOrSize?`

**CartItem**

- `product: ShopProduct`, `quantity: number`

---

## 7. Key Features & Functionality

### Booking Ecosystem (5 "Doors")

1. **Booking Modal** - Core appointment scheduling
2. **Smart Pest Assessment** - Interactive 7-step diagnostic questionnaire
3. **Services Catalog** - Full service browsing with filtering
4. **Corporate Quotation** - B2B facility inspection requests
5. **Plans Modal** - Retainer subscription management

### E-Commerce System

- **Shop Section** - Product teaser display
- **Cart Management** - Add/update quantity/remove items state
- **Cart Drawer** - Side panel checkout interface
- **Product Categories** - Hygiene, Cleaning Tools, Equipment, Home-Care

### Customer Engagement

- **WhatsApp Integration** - Direct message link with pre-filled text
- **Phone Calls** - Tel: links to +2348003755336
- **Portal Access** - Customer account/review area
- **Service Area Mapping** - City-based hotline directory

---

## 8. Design System & Styling Conventions

### Color Palette

| Name         | Hex                        | Usage                           |
| ------------ | -------------------------- | ------------------------------- |
| Primary Navy | #031F5E                    | Headers, modals, footer, CTA bg |
| Sky/Accent   | #1693d9                    | Links, hover states, highlights |
| Sky-400      | #0ea5e9                    | Badges, borders, soft accents   |
| Orange       | #ff6b35                    | Pest control sections, alerts   |
| Yellow       | #fbbf24                    | Post-construction theme         |
| Cyan         | #06b6d4                    | "Not Sure?" category            |
| Slate        | #64748b, #475569, #64748ba | Text, borders, backgrounds      |
| White        | #ffffff                    | Primary bg, text                |

### Typography

- **Font Family**: Plus Jakarta Sans
- **Font Weights**: 300, 400, 500, 600, 700, 800 (via Google Fonts)
- **Base Size**: System default (16px equivalent)
- **Headings**: Extra bold (800) for prominence
- **Body**: Regular (400), Semi-bold (600) for emphasis

### Spacing & Dimensions

- **Base Unit**: 4px (Tailwind scale)
- **Section Padding**: `py-16 sm:py-20 lg:py-24`
- **Container Max-Width**: `max-w-7xl` (80rem)
- **Gap Scales**: 4, 6, 8, 10 (16px increments)

### Animation & Motion

- **Entrance Delay**: 50-180ms stagger for choreographed reveals
- **Transitions**: 300-500ms (cubic-easing defaults)
- **Parallax Clamping**: ±250px max offset on mouse move
- **Scroll Reveal**: IntersectionObserver with 80px root margin
- **Disabled on**: Touch devices, prefers-reduced-motion setting

---

## 9. Browser & Environment Support

### TypeScript Configuration

- **Target**: ES2022
- **Module Format**: ESNext (bundled by Vite)
- **JSX**: React 17-compatible (automatic runtime)
- **Path Aliases**: `@/*` → root directory for imports
- **Strict Mode**: Enabled (noEmit, strict checking)

### Vite Configuration

- **HMR**: Disabled when `DISABLE_HMR=true` env var set (for AI Studio compatibility)
- **File Watching**: Disabled along with HMR to save CPU during agent edits
- **Dev Server**: Port 3000, host 0.0.0.0
- **Plugins**: React (@vitejs/plugin-react), Tailwind CSS (@tailwindcss/vite)

### Build Output

- **Command**: `vite build` (optimized production bundle)
- **Dev**: `vite --port=3000` (HMR dev server)
- **Clean**: `rm -rf dist server.js` (cleanup task)
- **Linting**: `tsc --noEmit` (type checking via TypeScript)

---

## 10. External Integrations

### APIs & Services

- **Google GenAI** - Capability for AI-powered features (e.g., smart pest assessment)
- **WhatsApp Web API** - Pre-filled message link: `https://wa.me/2348003755336`
- **Phone Direct** - Tel link: `tel:+2348003755336`
- **Google Fonts** - Plus Jakarta Sans (Plus Jakarta Sans)

### Data Sources

- **Mock Data** - All services, products, reviews, team members in mockData.ts
- **No Backend Integration Yet** - Booking/assessment submissions handled client-side
- **Environment Variables** - .env file support via dotenv

---

## 11. Known Limitations & Future Considerations

### Current Constraints

- **No Database**: All data is hardcoded in mockData.ts
- **No Form Submission Backend**: Booking/assessment forms show success UI but don't persist
- **No Payment Processing**: E-commerce cart doesn't integrate with payment gateway
- **No User Authentication**: No login/account system yet
- **No Analytics**: No event tracking or usage metrics
- **No Email/SMS**: No automated confirmation messages

### Expansion Opportunities

1. **Backend API** - Node.js/Express server for form submission, user data
2. **Database** - MongoDB/PostgreSQL for persistent storage
3. **Payment Gateway** - Stripe/Paystack for e-commerce checkout
4. **Admin Dashboard** - Service management, booking fulfillment UI
5. **Customer Accounts** - Login, booking history, invoices
6. **Search/Filtering** - Advanced service discovery, location-based search
7. **Real-time Chat** - Customer support via WhatsApp or chat widget
8. **Multi-language Support** - Yoruba, Hausa, English language variants

---

## 12. Important Design/Technical Decisions

### Why This Architecture?

1. **SPA over MPA**: Single navigable page reduces load times, smooth scrolling UX
2. **Tailwind CSS**: Rapid iteration, consistent design system, small bundle size
3. **Tab-based Modals**: Ecosystem "doors" keep users on one page vs multiple routes
4. **Mock Data**: Allows design refinement before backend integration
5. **IntersectionObserver**: Performant scroll-triggered animations, no scroll listener overhead
6. **Motion Library**: Lightweight animation framework (alternative to Framer Motion overhead)

### Trade-offs Made

- **No React Router**: Simpler for landing page, but limits expandability to multi-page app
- **Client-side State Only**: Simple for MVP, but doesn't survive page refresh
- **Hardcoded Phone Numbers**: Centralized contact (+2348003755336), could be parameterized
- **No Form Validation Library**: Custom validation in modals, could use zod/react-hook-form
- **Parallax on Desktop Only**: Simplifies mobile UX but limits visual richness

---

## 13. Development Workflow

### Available Scripts

```bash
npm run dev          # Start Vite dev server (port 3000, HMR enabled)
npm run build        # Create optimized production bundle
npm run preview      # Preview production build locally
npm run clean        # Remove dist/ and server.js
npm run lint         # Type check with tsc --noEmit
```

### File Watching & HMR

- By default, Vite watches src/ for changes and hot-reloads
- When `DISABLE_HMR=true`, file watching is disabled (for VS Code agent edits)

### Debugging

- React DevTools browser extension compatible
- TypeScript strict mode catches type errors pre-runtime
- Console errors surface in dev tools
- Parallax/animation behavior varies by device (touch, reduced-motion)

---

## 14. Critical Files at a Glance

| File                           | Purpose          | Key Content                                  |
| ------------------------------ | ---------------- | -------------------------------------------- |
| `App.tsx`                      | Root component   | Modal state, cart state, event handlers      |
| `main.tsx`                     | Entry point      | React DOM render, StrictMode                 |
| `types.ts`                     | Type definitions | All interfaces (Service, Review, Team, etc.) |
| `index.css`                    | Global styles    | Tailwind imports, keyframes, utilities       |
| `vite.config.ts`               | Build config     | React plugin, Tailwind, path aliases         |
| `tsconfig.json`                | TS config        | ES2022 target, JSX, strict mode              |
| `mockData.ts`                  | Seed data        | All services, products, reviews hardcoded    |
| `Navbar.tsx`                   | Header           | Nav links, cart badge, mobile toggle         |
| `Hero.tsx`                     | Homepage hero    | Main headline, parallax, CTAs                |
| `BookingModal.tsx`             | Modal form       | Booking form with date/service selection     |
| `SmartPestAssessmentModal.tsx` | Modal tool       | 7-step interactive pest diagnostic           |
| `CartDrawer.tsx`               | E-commerce UI    | Shopping cart interface, quantity controls   |
| `Footer.tsx`                   | Foot             | Links, contact, social media                 |

---

## 15. Next Steps for Modification

When making changes to this project:

1. **For UI/Styling Changes**: Modify component JSX and Tailwind classes
2. **For New Sections**: Create in src/components/, add to App.tsx main element
3. **For Modal Functionality**: Update form handlers, add state prop if needed
4. **For Data Changes**: Edit src/data/mockData.ts, ensure types match types.ts
5. **For Animations**: Add keyframes to index.css, use animationDelay prop
6. **For New Features**: Consider if they need backend integration first

---

**Last Updated:** September 17, 2026  
**Project Status:** Landing page v3 (production-ready MVP)
