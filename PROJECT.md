# The Royal Conventions & Banquets, Mangalagiri
## Premium Multi-Venue Web Platform & Deterministic Availability Management System

A hospitality platform and management dashboard for **The Royal Conventions**, located near RTC Depot Road Corner, Gowtham Buddha Road, Mangalagiri, Andhra Pradesh, India.

---

### Campus Venue Portfolio
1. **Royal Convention:** Flagship mega auditorium (1,800 seating, 3,000+ floating capacity, 28ft pillarless span, 60ft designer stage, separate 900-seat dining hall, 4 bridal executive suites).
2. **Royal Banquet:** Premium medium-sized banquet hall (450 seating, 850 floating) with **8 attached Deluxe AC Guest Lodging Rooms** directly on-campus for wedding host families and VIP delegates.
3. **Royal Convention Hall:** Intimate celebration & corporate hall (250 seating, 500 floating) with modular layouts, stage podium, and dedicated dining.

---

### Core Business Rules Implemented
- **Strict No Public Pricing:** Zero public tariff rates or packages displayed. All pricing is kept strictly confidential and communicated via management consultations.
- **Soft-Check Lead Funnel:** Interactive real-time availability checker and inquiry pipeline without automated public payment checkouts.
- **Deterministic Concurrency Protection:** Guarantees two confirmed bookings never occupy the same venue on conflicting shifts (`FULL_DAY`, `MORNING_SHIFT`, `EVENING_SHIFT`).
- **Entity SEO Integration:** Comprehensive JSON-LD structured data (`EventVenue`, `LocalBusiness`, and `Person` for Proprietor Sri N. Nageswara Rao).

---

### Architecture & Tech Stack
- **Framework:** Next.js 16+ (App Router) with TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS + Custom Luxury Gold & Warm Ivory Design System Tokens
- **Database & ORM:** Prisma schema (`prisma/schema.prisma`) with PostgreSQL/Supabase compatibility and persistent in-memory repository fallback
- **State & Form Validation:** Zod schemas paired with React Hook Form
- **Micro-Animations & Visuals:** Canvas Confetti, BlurDataURL luxury image lazy-loading
- **Admin Portal (`/admin`):**
  - `/admin/dashboard`: Real-time KPI metrics, private quote pipeline, live lead log
  - `/admin/calendar`: Multi-Hall Unified Matrix (Green = Available, Yellow = Provisional, Red = Confirmed Booked, Grey = Maintenance Block)
  - `/admin/enquiries`: Kanban board & table pipeline (New Inquiry → Quote Shared → Provisional Hold → Confirmed → Rejected)
  - `/admin/bookings`: Manual walk-in logging & facility date blocking tool
  - `/admin/media`: Gallery image manager with venue tag mapping
