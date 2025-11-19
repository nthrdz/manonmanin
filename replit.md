# Accompagnement Post-Partum

## Overview

This is a premium wellness website for post-partum accompaniment services, designed to provide a nurturing digital sanctuary for new mothers. The application features a sophisticated single-page design with smooth animations, parallax effects, and an elegant autumn-themed aesthetic inspired by premium wellness platforms like Headspace and Calm.

The site showcases services for post-partum support, including emotional guidance, home visits, mother circles, and educational resources. It includes contact form functionality with email notifications and a resource library.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Single Page Application (SPA) architecture using Wouter for lightweight client-side routing

**UI Component Library**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component system with "new-york" style variant
- Tailwind CSS for utility-first styling with custom design tokens

**Design System**
- Custom autumn color palette with warm, nurturing tones (oranges, ambers, creams)
- Typography: Cormorant Garamond (serif) for headlines, Inter (sans-serif) for body text
- Glassmorphism effects and sophisticated animations throughout
- Responsive design with mobile-first approach

**Animation & Visual Effects**
- Framer Motion for declarative animations and transitions
- TSParticles for floating particle effects in hero section
- React Intersection Observer for scroll-triggered animations
- React Scroll Parallax for depth and layering effects

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management
- React Hook Form with Zod validation for form handling
- Contact form with client-side validation and optimistic updates

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Custom middleware for logging and error handling
- RESTful API endpoints for contact form submissions

**Development vs Production**
- Development: Vite middleware integration with HMR
- Production: Static file serving with pre-built assets
- Environment-based configuration

**API Endpoints**
- `POST /api/contact` - Submit contact form with validation
- `GET /api/contacts` - Retrieve all contact submissions (admin)
- `GET /api/contacts/:id` - Retrieve specific contact by ID

**Data Validation**
- Zod schemas shared between client and server
- Type-safe request/response handling
- Comprehensive error handling with user-friendly messages

### Data Storage

**Current Implementation**
- In-memory storage using Map data structure (MemStorage class)
- Volatile storage suitable for development/testing
- Interface-based design (IStorage) allowing for future database integration

**Database Schema (Prepared for PostgreSQL)**
- Drizzle ORM configured for PostgreSQL migrations
- Schema defined in `shared/schema.ts`
- Contact form data structure: name, email, phone (optional), message, accompaniment type

**Storage Interface**
- `saveContact()` - Persist contact form submission with UUID
- `getAllContacts()` - Retrieve all contacts sorted by creation date
- `getContact(id)` - Retrieve specific contact by ID
- All methods return Promises for async/database compatibility

### External Dependencies

**Email Service**
- Nodemailer for email delivery
- Dual-mode operation:
  - Development: Ethereal test accounts for email previewing
  - Production: SMTP configuration via environment variables
- Two email types:
  - Admin notification emails when forms are submitted
  - User confirmation emails
- Graceful fallback if SMTP not configured

**Third-Party UI Libraries**
- Radix UI primitives (20+ components): accordion, dialog, dropdown, popover, etc.
- React Hook Form for form state management
- Zod for runtime type validation
- class-variance-authority for component variant styling
- clsx & tailwind-merge for className utilities

**Animation & Visual Libraries**
- Framer Motion for animation primitives
- TSParticles (slim variant) for particle effects
- React Intersection Observer for viewport detection
- React Scroll Parallax for parallax scrolling

**Development Tools**
- Replit-specific plugins for runtime error handling and development banner
- ESBuild for server bundling in production
- PostCSS with Autoprefixer for CSS processing

**Environment Variables Required**
- `DATABASE_URL` - PostgreSQL connection string (when database is added)
- `SMTP_HOST` - Email server hostname (optional, uses test account if not set)
- `SMTP_PORT` - Email server port (default: 587)
- `SMTP_USER` - Email authentication username
- `SMTP_PASS` - Email authentication password
- `SMTP_SECURE` - Use TLS/SSL (true/false)
- `NODE_ENV` - Environment indicator (development/production)

**Asset Management**
- Static assets served from `attached_assets` directory
- Generated images for hero, about section, and resources
- Google Fonts (Cormorant Garamond, Inter) loaded via CDN