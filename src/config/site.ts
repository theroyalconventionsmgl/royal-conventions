export interface VenueSpec {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: string;
  seatingCapacity: number;
  seatingCapacityLabel?: string; // e.g. "800 – 900" for range displays
  floatingCapacity: number;
  areaSqFt: number;
  description: string;
  shortDescription: string;
  features: string[];
  suitedFor: string[];
  heroImage: string;
  galleryImages: { url: string; caption: string; category: string }[];
  amenities: { name: string; icon: string; desc: string }[];
  diningCapacity: number;
  diningCapacityLabel?: string; // e.g. "180 Sit-down / 100 Ground Floor Buffet"
  greenRooms: number;
  lodgingAttached: boolean;
  // Extended specs
  parkingCars?: number;
  parkingMotorcycles?: number;
  kitchenSpec?: string;
  outdoorSpace?: string;
  billingNotes?: string;
  acRooms?: number;
  hasSoundproof?: boolean;
  hasJumboCoolers?: boolean;
  isAffiliate?: boolean; // true for regional affiliate halls
  complimentaryInclusions?: string[];
  mapUrl?: string; // Official Google Maps link for this venue
  acType?: string; // "Air Conditioned" | "Non-AC"
  sizeRank?: string; // e.g. "1st Largest", "Newest & Intimate"
}

export const siteConfig = {
  name: "The Royal Conventions",
  legalName: "The Royal Conventions & Banquets",
  tagline: "Where Grand Celebrations Meet Timeless Elegance",
  description:
    "Mangalagiri's premier luxury multi-venue destination featuring Royal Convention, Royal Banquets with Deluxe Lodging, and Vaishnavi Vaidehi. Designed for magnificent weddings, prestigious corporate galas, and bespoke family milestones.",
  url: "https://theroyalconventions.com",
  proprietor: {
    name: "N. Nageswara Rao",
    title: "Proprietor & Founder",
    phone: "+91 9849323300",
    bio: "With over two decades of dedicated hospitality excellence and community leadership in the Amaravati-Guntur region, Sri N. Nageswara Rao established The Royal Conventions to provide world-class, pillarless convention facilities with royal hospitality standards.",
    image: "/images/proprietor.jpg",
  },
  management: [
    {
      name: "Bhaskar Rao",
      role: "General Manager - Operations & Events",
      phone: "+91 9866333055",
    },
    {
      name: "Srikanth",
      role: "Operations Manager - Hospitality & Bookings",
      phone: "+91 9959111977",
    },
  ],
  contact: {
    address: {
      street: "Near RTC Depot Road Corner, Gowtham Buddha Road",
      locality: "Mangalagiri",
      district: "Guntur District",
      state: "Andhra Pradesh",
      postalCode: "522503",
      country: "India",
      landmark: "Opposite RTC Bus Depot junction, connecting NH-16 & Vijayawada-Guntur Express Corridor",
    },
    primaryPhone: "+91 9866333055",
    secondaryPhone: "+91 9959111977",
    landline: "+91 8645 234567",
    email: "contact@theroyalconventions.com",
    reservationEmail: "bookings@theroyalconventions.com",
    whatsappNumber: "919866333055",
    whatsappLink:
      "https://wa.me/919866333055?text=Namaste%2C%20I%20would%20like%20to%20inquire%20about%20event%20availability%20at%20The%20Royal%20Conventions.",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15309.845012586717!2d80.5487123!3d16.4358941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f1a5f6e80b27%3A0x6b876a3b2b800100!2sMangalagiri%2C%20Andhra%20Pradesh%20522503!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsDirectLink: "https://maps.google.com/?q=The+Royal+Conventions+Gowtham+Buddha+Road+Mangalagiri",
  },
  socials: {
    instagram: "https://instagram.com/theroyalconventions",
    facebook: "https://facebook.com/theroyalconventions",
    youtube: "https://youtube.com/@theroyalconventions",
  },

  // ─── PRIMARY CAMPUS VENUES ────────────────────────────────────────────────
  venues: [
    {
      id: "royal-convention",
      name: "Royal Convention",
      slug: "royal-convention",
      category: "Largest Flagship AC Hall",
      tagline: "Premier Destination for Grand Weddings & Massive Receptions",
      seatingCapacity: 900,
      seatingCapacityLabel: "900",
      floatingCapacity: 900,
      areaSqFt: 22000,
      diningCapacity: 350,
      diningCapacityLabel: "350 Sit-down Dining",
      greenRooms: 2,
      lodgingAttached: false,
      parkingCars: 250,
      parkingMotorcycles: 350,
      kitchenSpec: "150 ft × 18 ft Spacious Heavy-Duty Cooking Area",
      outdoorSpace: "Dedicated outdoor space for Buffet, Snack & Ice Cream counters",
      description:
        "The flagship venue featuring the largest capacity on campus. Built for grand royal weddings, large scale receptions, and major conventions with a centralized heavy-duty AC system.",
      shortDescription:
        "Largest flagship AC hall — premier destination for grand weddings & massive receptions.",
      features: [
        "Largest hall capacity across all properties",
        "Centralized heavy-duty air-conditioned system",
        "Expansive stage & grand sit-down dining hall",
        "Direct access to campus parking and bridal suites",
      ],
      suitedFor: [
        "Grand Indian Royal Weddings & Receptions",
        "Mega Corporate Conventions",
        "State & District Level Summits",
      ],
      heroImage: "/images/royal-convention-hero.jpg",
      galleryImages: [
        { url: "/images/royal-convention-hero.jpg", caption: "Grand flagship AC convention hall", category: "Interiors" },
      ],
      amenities: [],
      mapUrl: "https://maps.app.goo.gl/B6ZABJmrSkyobdeg7",
      acType: "Air Conditioned",
      sizeRank: "1st Largest",
    },
    {
      id: "vaishnavi-vaidehi",
      name: "Vaishnavi Vaidehi",
      slug: "vaishnavi-vaidehi",
      category: "2nd Largest AC Hall",
      tagline: "Grand Celebrations & Large Gatherings",
      seatingCapacity: 650,
      seatingCapacityLabel: "650",
      floatingCapacity: 650,
      areaSqFt: 0,
      diningCapacity: 180,
      diningCapacityLabel: "180 Guests (Air-Conditioned Dining Hall)",
      greenRooms: 2,
      lodgingAttached: true,
      acRooms: 4,
      hasJumboCoolers: true,
      description:
        "The second largest venue complex designed for large scale family weddings, receptions, and corporate summits with full AC support, AC stage, and four attached AC deluxe rooms.",
      shortDescription:
        "Second largest AC hall complex — grand celebrations, traditional rituals & receptions.",
      features: [
        "High-capacity main event hall",
        "Fully air-conditioned interior",
        "Dedicated dining and buffet layout",
        "Convenient guest access & parking support",
        "4 AC deluxe rooms & 1 AC dormitory suite",
      ],
      suitedFor: [
        "Traditional Telugu & Hindu Weddings",
        "Grand Receptions & Sangeets",
        "Corporate Summits",
      ],
      heroImage: "/images/royal-convention-hall-hero.webp",
      galleryImages: [
        { url: "/images/royal-convention-hall-hero.webp", caption: "Second-largest AC hall complex", category: "Interiors" },
      ],
      amenities: [],
      mapUrl: "https://maps.app.goo.gl/BGnDYJinohxHeBFC6",
      acType: "Air Conditioned",
      sizeRank: "2nd Largest",
    },
    {
      id: "nannapaneni-lakshmi",
      name: "Smt. Nannapaneni Lakshmi Function Hall",
      slug: "nannapaneni-lakshmi",
      category: "Spacious Traditional Non-AC Hall",
      tagline: "Spacious Traditional Non-AC Kalyanamandapam",
      seatingCapacity: 150,
      seatingCapacityLabel: "150",
      floatingCapacity: 500,
      areaSqFt: 0,
      diningCapacity: 150,
      diningCapacityLabel: "150 Guests (Simultaneous Sit-down Dining)",
      greenRooms: 0,
      lodgingAttached: false,
      description:
        "Spacious traditional Non-AC function hall suited for authentic cultural ceremonies, large traditional gatherings, and budget-conscious grand events.",
      shortDescription:
        "Large Non-AC traditional kalyanamandapam with direct simultaneous dining layout.",
      features: [
        "Traditional open-airflow Non-AC architecture",
        "Large seating and stage area for classic rituals",
        "Dedicated sit-down dining layout",
        "Authentic community Kalyanamandapam setup",
      ],
      suitedFor: [
        "Traditional Ceremonies",
        "Community & Religious Gatherings",
        "Budget-Conscious Grand Events",
      ],
      heroImage: "/images/nannapaneni-lakshmi-hero.jpg",
      galleryImages: [
        { url: "/images/nannapaneni-lakshmi-hero.jpg", caption: "Traditional Non-AC kalyanamandapam", category: "Interiors" },
      ],
      amenities: [],
      mapUrl: "https://maps.google.com/?q=16.411716,80.558731",
      acType: "Non-AC",
      sizeRank: "Large Non-AC",
    },
    {
      id: "royal-banquets",
      name: "Royal Banquets",
      slug: "royal-banquets",
      category: "Newest AC Banquet",
      tagline: "Latest Modern AC Banquet Hall",
      seatingCapacity: 200,
      seatingCapacityLabel: "200",
      floatingCapacity: 600,
      areaSqFt: 8500,
      diningCapacity: 180,
      diningCapacityLabel: "180 Sit-down / 100 Ground Floor Buffet",
      greenRooms: 2,
      lodgingAttached: true,
      hasSoundproof: true,
      billingNotes: "Electricity usage, custom decoration & labour staff charges billed separately.",
      complimentaryInclusions: ["Event Chairs", "Dining Tables & Chairs"],
      description:
        "The newest addition to the campus featuring contemporary finishes, soundproofing, and attached deluxe lodging rooms for intimate functions.",
      shortDescription:
        "Newest modern AC banquet with soundproofing & attached deluxe lodging suites.",
      features: [
        "Brand new modern interior design",
        "Fully air-conditioned with soundproofing",
        "Directly connected to deluxe lodging suites",
        "Located at RTC Depot Road Corner, Gowtham Buddha Road",
      ],
      suitedFor: [
        "Intimate Wedding Receptions",
        "Sangeet, Haldi & Mehendi",
        "Executive Corporate Meets",
      ],
      heroImage: "/images/royal-banquet-hero.webp",
      galleryImages: [
        { url: "/images/royal-banquet-hero.webp", caption: "Newest AC banquet with attached lodging", category: "Interiors" },
        { url: "/images/deluxe-room-floral.jpg", caption: "Attached deluxe king suite", category: "Deluxe Rooms" },
      ],
      amenities: [],
      mapUrl: "https://maps.google.com/?q=16.421812,80.563797",
      acType: "Air Conditioned",
      sizeRank: "Newest & Intimate",
    },
  ] as VenueSpec[],

  // ─── NO SEPARATE AFFILIAT HALLS — all properties are now officially listed above ───
  affiliateVenues: [] as VenueSpec[],

  accommodation: {
    title: "Attached Deluxe Guest Lodging",
    subtitle: "Exclusively at Royal Banquets Campus",
    description:
      "Eliminate guest transit hassles on your auspicious day. Royal Banquet features 8 impeccably maintained, air-conditioned deluxe guest lodging rooms with modern ensuite bathrooms, 24-hour hot water, and personalized room service support for family elders and special guests.",
    totalRooms: 8,
    features: [
      "Custom king & queen spring mattresses with 300-thread-count linens",
      "Individually controlled Daikin split air-conditioners",
      "Modern ensuite bathrooms with Kohler fittings & 24/7 solar + geyser hot water",
      "High-speed complimentary Wi-Fi and smart LED televisions",
      "Secure keycard / digital locking systems & dedicated wardrobe with electronic safe",
      "Direct internal elevator and corridor access to Royal Banquet & Convention venues",
      "Housekeeping and morning tea/coffee beverage coordination",
    ],
    roomTypes: [
      {
        name: "Deluxe King Suite",
        count: 4,
        occupancy: "2-3 Adults",
        bed: "1 King Bed + Extra rollaway bed on request",
        image: "/images/deluxe-room-floral.jpg",
      },
      {
        name: "Deluxe Twin Executive",
        count: 4,
        occupancy: "2-3 Adults",
        bed: "2 Queen Twin Beds",
        image: "/images/deluxe-room-ac.jpg",
      },
    ],
  },
  facilities: [
    {
      title: "Air-Conditioned Event Halls",
      desc: "Centralized AC across primary campus halls. Royal Banquet's soundproof hall and the main convention hall deliver crisp, cool comfort even in peak Andhra summers.",
      icon: "Wind",
    },
    {
      title: "100% Zero-Break Generator Power",
      desc: "Twin industrial Caterpillar / Cummins DG gensets guarantee zero disruption during sacred muhurtham rituals or live stage performances.",
      icon: "Zap",
    },
    {
      title: "250 Car + 350 Motorcycle Parking",
      desc: "Royal Convention features dedicated parking for 250 cars and 350 motorcycles — one of the largest private event parking lots in Mangalagiri.",
      icon: "Car",
    },
    {
      title: "Luxury Bridal Green Rooms",
      desc: "Opulent bridal and groom lounges furnished with full-length vanity mirrors, private bathrooms, lockers, and relaxing lounges.",
      icon: "Sparkles",
    },
    {
      title: "8 On-Campus Deluxe Lodging Rooms",
      desc: "Attached directly to the Royal Banquet complex for comfortable overnight stays for bridal party, family elders, and VIP dignitaries.",
      icon: "Hotel",
    },
    {
      title: "Heavy-Duty 150ft Kitchen & Outdoor Buffet Zone",
      desc: "Royal Convention's 150ft × 18ft professional kitchen is backed by a dedicated outdoor buffet, snack, and ice cream counter zone for elaborate event catering.",
      icon: "Utensils",
    },
    {
      title: "Acoustics & High-Tech AV Infrastructure",
      desc: "Engineered soundproof acoustic wall fabrics at Royal Banquet, JBL/Bose digital line arrays, wireless microphones, and HD LED screen mounting points.",
      icon: "Tv",
    },
    {
      title: "Wheelchair Accessible & Elevators",
      desc: "Step-free ramps, spacious Schindler elevators, and elder-friendly wide doorways across all floors and hall entrances.",
      icon: "ShieldCheck",
    },
  ],
  shifts: [
    {
      id: "MORNING_SHIFT",
      name: "Morning Shift",
      time: "06:00 AM – 02:00 PM",
      description: "Ideal for Muhurthams, Pelli ceremonies, Vrathams, and Morning Breakfast Receptions",
    },
    {
      id: "EVENING_SHIFT",
      name: "Evening Shift",
      time: "04:00 PM – 11:30 PM",
      description: "Ideal for Grand Evening Receptions, Sangeet Celebrations, and Corporate Galas",
    },
    {
      id: "FULL_DAY",
      name: "Full Day (24 Hours)",
      time: "06:00 AM – Next Day 05:00 AM",
      description: "Comprehensive reservation for all-day rituals, decor preparation, and royal celebrations",
    },
  ],
};
