// Mock data for Spacexio - Complete Home Design & Construction

export const heroData = {
  title: "Let's Build Your Dream Home Together",
  subtitle: "Modern Construction. Transparent Process. Fixed Pricing.",
  description: "From foundation to finish. Fixed-price packages, transparent process, and guaranteed quality. Starting at ₹1,850/sq.ft",
  cta: {
    primary: "Start Your Project",
    secondary: "Book Free Consultation"
  },
  features: [
    "3D Design Visualization",
    "Transparent Pricing",
    "On-Time Delivery",
    "10-Year Warranty"
  ],
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
};

export const statsData = [
  { value: "₹1850", label: "Starting Price/Sq.ft" },
  { value: "6-8", label: "Months Avg. Timeline" },
  { value: "10 Yr", label: "Warranty" },
  { value: "100%", label: "Satisfaction Focus" }
];

export const whySpacexioData = [
  {
    icon: "Shield",
    title: "Safe Payment Model",
    description: "Pay only for completed milestones. No advance payments. Your money is protected."
  },
  {
    icon: "Eye",
    title: "Complete Transparency",
    description: "Track your project live. Detailed quotations. Daily progress updates via app."
  },
  {
    icon: "Cpu",
    title: "Technology-Driven",
    description: "BIM modeling & 3D visualization. Digital quality checks. Precision engineering."
  },
  {
    icon: "Clock",
    title: "On-Time Guarantee",
    description: "Fixed timelines. Milestone-based tracking. Zero tolerance for delays."
  }
];

export const constructionPackagesData = [
  {
    id: 1,
    name: "Essential",
    tagline: "Budget-Friendly Quality",
    pricePerSqft: "1,850",
    popular: false,
    features: [
      "✓ 2D Floor Plans + 3D Elevation",
      "✓ Standard JSW Steel & Cement",
      "✓ Vitrified Tiles (₹50/sqft)",
      "✓ Standard Bathroom Fittings",
      "✓ Emulsion Paint",
      "✓ Basic Electrical & Plumbing",
      "✓ 10' Ceiling Height"
    ],
    idealFor: "30-50 Lakhs Budget"
  },
  {
    id: 2,
    name: "Premium",
    tagline: "Most Popular Choice",
    pricePerSqft: "2,150",
    popular: true,
    features: [
      "✓ Full BIM Modeling + 3D Walkthrough",
      "✓ Premium JSW Steel & Cement",
      "✓ Designer Tiles (₹100/sqft)",
      "✓ Branded Bathroom Fittings (Jaquar)",
      "✓ Premium Paint Finish",
      "✓ Modular Kitchen Basic",
      "✓ False Ceiling in Living",
      "✓ 10.5' Ceiling Height"
    ],
    idealFor: "50-80 Lakhs Budget"
  },
  {
    id: 3,
    name: "Luxury",
    tagline: "Premium Living",
    pricePerSqft: "2,650",
    popular: false,
    features: [
      "✓ Advanced BIM + VR Walkthrough",
      "✓ Premium Materials Throughout",
      "✓ Imported Tiles & Marble (₹140/sqft)",
      "✓ High-End Sanitaryware (Kohler)",
      "✓ Luxury Paint (Asian Royale)",
      "✓ Full Modular Kitchen",
      "✓ Complete Interior Design",
      "✓ Smart Home Integration",
      "✓ 11' Ceiling Height"
    ],
    idealFor: "80 Lakhs - 1.5 Cr+"
  }
];

export const servicesData = [
  {
    id: 1,
    title: "Architecture",
    description: "Complete architectural design services from concept to construction-ready drawings with BIM integration.",
    icon: "PenTool",
    category: "primary",
    features: ["Custom Floor Plans", "3D Visualization", "Structural Design", "Vastu Consultation"]
  },
  {
    id: 2,
    title: "Interior Design",
    description: "Premium interior design solutions for residential and commercial spaces with complete execution.",
    icon: "Sofa",
    category: "primary",
    features: ["Space Planning", "Modular Kitchens", "Designer Wardrobes", "Complete Home Interiors"]
  },
  {
    id: 3,
    title: "Construction",
    description: "End-to-end home construction with technology-driven precision and transparent pricing.",
    icon: "Home",
    category: "primary",
    features: ["Villa Construction", "Duplex Homes", "Individual Houses", "Quality Management"]
  },
  {
    id: 4,
    title: "BIM Services",
    description: "Advanced Building Information Modeling for accurate planning, clash detection, and project coordination.",
    icon: "Cpu",
    category: "primary",
    features: ["3D BIM Modeling", "Clash Detection", "Coordination", "Digital Quality Checks"]
  }
];

export const constructionProcessData = [
  {
    step: 1,
    title: "Site Visit & Consultation",
    description: "Our technical team visits your plot, understands requirements, and provides initial cost estimate.",
    duration: "Day 1-2",
    icon: "MapPin"
  },
  {
    step: 2,
    title: "Design & BIM Modeling",
    description: "Architects create custom floor plans. BIM team builds 3D model with accurate measurements.",
    duration: "Week 1-2",
    icon: "PenTool"
  },
  {
    step: 3,
    title: "Detailed Quotation",
    description: "Transparent, itemized quote with materials, labor, timeline. Pay 10% to confirm booking.",
    duration: "Week 2",
    icon: "FileText"
  },
  {
    step: 4,
    title: "Soil Test & Approvals",
    description: "Soil testing, structural design, and assistance with municipal approvals.",
    duration: "Week 3-4",
    icon: "CheckCircle"
  },
  {
    step: 5,
    title: "Foundation & Structure",
    description: "Foundation laying, column work, slab casting. Quality checks at every stage.",
    duration: "Month 2-4",
    icon: "Layers"
  },
  {
    step: 6,
    title: "Finishing & Interiors",
    description: "Flooring, painting, electrical, plumbing, doors & windows. Interior work if opted.",
    duration: "Month 5-6",
    icon: "Paintbrush"
  },
  {
    step: 7,
    title: "Quality Check & Handover",
    description: "Final inspection, snag list resolution, handover with 10-year warranty documents.",
    duration: "Month 7",
    icon: "Key"
  }
];

export const projectsData = [
  {
    id: 1,
    title: "Modern Villa - MVP Colony",
    category: "Villa",
    location: "MVP Colony, Visakhapatnam",
    area: "2,400 sq.ft",
    budget: "65 Lakhs",
    package: "Premium",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    description: "3BHK villa with premium finishes, modular kitchen, and landscaping.",
    features: ["3 BHK", "Premium Package", "Completed in 7 months"]
  },
  {
    id: 2,
    title: "Contemporary Duplex - Madhurawada",
    category: "Duplex",
    location: "Madhurawada, Visakhapatnam",
    area: "3,200 sq.ft",
    budget: "95 Lakhs",
    package: "Luxury",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    description: "Luxury duplex with smart home integration and complete interior design.",
    features: ["4 BHK Duplex", "Luxury Package", "Smart Home"]
  },
  {
    id: 3,
    title: "Budget Home - Gajuwaka",
    category: "Individual House",
    location: "Gajuwaka, Visakhapatnam",
    area: "1,200 sq.ft",
    budget: "28 Lakhs",
    package: "Essential",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    description: "Affordable 2BHK home with quality construction and smart space utilization.",
    features: ["2 BHK", "Essential Package", "Budget-Friendly"]
  },
  {
    id: 4,
    title: "Farmhouse Villa - Anakapalle",
    category: "Villa",
    location: "Anakapalle",
    area: "3,500 sq.ft",
    budget: "1.2 Cr",
    package: "Luxury",
    year: "2023",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    description: "Luxury farmhouse with resort-style amenities and complete landscaping.",
    features: ["5 BHK", "Luxury + Landscape", "Resort Style"]
  }
];

export const testimonialsData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    project: "3BHK Villa, MVP Colony",
    location: "Visakhapatnam",
    content: "Spacexio delivered exactly what they promised. The 3D model helped us visualize everything before construction. Project completed in 7 months without any delays.",
    rating: 5,
    package: "Premium",
    videoUrl: null
  },
  {
    id: 2,
    name: "Priya & Srinivas",
    project: "4BHK Duplex, Madhurawada",
    location: "Visakhapatnam",
    content: "Their technology-driven approach impressed us. We could track progress daily on the app. The BIM modeling eliminated all construction errors.",
    rating: 5,
    package: "Luxury",
    videoUrl: null
  },
  {
    id: 3,
    name: "Venkat Rao",
    project: "2BHK Home, Gajuwaka",
    location: "Visakhapatnam",
    content: "Built my home within budget using the Essential package. Quality was not compromised. Very transparent pricing and payment process.",
    rating: 5,
    package: "Essential",
    videoUrl: null
  }
];

export const locationsData = {
  primary: {
    city: "Visakhapatnam",
    office: "Near Abid Nagar Road, Abidnagar Park, Akkayyapalem",
    phone: "+91 96865 11132",
    email: "info@spacexio.com",
    emailAlt: "hellospacexio@gmail.com",
    hours: "9:30 AM - 7:00 PM (Mon-Sat)"
  },
  serviceCities: [
    "Visakhapatnam",
    "Rajahmundry",
    "Kakinada",
    "Srikakulam",
    "Vijayanagram"
  ]
};

export const guaranteeData = {
  warranty: "10-Year Structural Warranty",
  timeline: "Fixed Timeline with Milestone Tracking",
  pricing: "Transparent Fixed-Price Contracts",
  payment: "Milestone-Based Payments - No Advance"
};

export const faqData = [
  {
    q: "What makes Spacexio different from local contractors?",
    a: "We use BIM technology for accurate planning, provide 3D visualization before construction, offer transparent fixed-price contracts, milestone-based payments, and 10-year structural warranty. Our projects are digitally tracked with daily updates."
  },
  {
    q: "What is included in the construction packages?",
    a: "Each package includes design, materials, labor, and construction. Essential starts at ₹1,850/sqft with standard materials. Premium at ₹2,150/sqft adds BIM modeling and better finishes. Luxury at ₹2,650/sqft includes complete interior design."
  },
  {
    q: "How long does construction take?",
    a: "Typical timeline is 6-8 months for a single-floor home (1200-2000 sqft). Duplex homes take 8-10 months. Timeline depends on design complexity and size. We provide fixed timeline commitments."
  },
  {
    q: "What is the payment structure?",
    a: "10% booking amount covers design and approvals. Remaining 90% is paid in milestones: Foundation (20%), Structure (30%), Finishing (30%), Final (10%). No advance payments to contractors."
  },
  {
    q: "Do you provide interior design services?",
    a: "Yes, premium interior design is available as an add-on or can be included in Luxury package. We specialize in modular kitchens, wardrobes, and complete home interiors."
  },
  {
    q: "How do you ensure quality?",
    a: "We conduct 200+ quality checks per project using digital checklists. BIM technology eliminates construction errors. Third-party inspections at key milestones. All materials are from certified brands."
  },
  {
    q: "Can I track my project progress?",
    a: "Yes, our mobile app provides daily photo updates, milestone completion status, payment tracking, and direct communication with project manager and site engineer."
  },
  {
    q: "What areas do you serve?",
    a: "Primary focus is Visakhapatnam and surrounding areas. We also serve Rajahmundry, Kakinada, Srikakulam, and Vijayanagram with the same quality standards."
  }
];

export const techAdvantagesData = [
  {
    title: "BIM Modeling",
    description: "3D Building Information Modeling for accurate planning and zero construction errors",
    icon: "Box"
  },
  {
    title: "3D Walkthroughs",
    description: "Virtual reality tours of your home before construction begins",
    icon: "Eye"
  },
  {
    title: "Digital Quality Checks",
    description: "200+ automated quality checkpoints tracked digitally",
    icon: "CheckSquare"
  },
  {
    title: "Project Tracking App",
    description: "Real-time updates, photos, and milestone tracking on mobile",
    icon: "Smartphone"
  }
];

// For backward compatibility with other pages
export const processData = constructionProcessData;
export const industriesData = [
  {
    id: 1,
    title: "1-2 BHK Homes",
    description: "Compact, efficient homes perfect for small families and first-time homeowners.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    capabilities: ["Essential Package", "Smart Space Planning", "Budget-Friendly", "Quick Delivery"]
  },
  {
    id: 2,
    title: "3-4 BHK Villas",
    description: "Spacious family homes with premium finishes and modern amenities.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    capabilities: ["Premium Package", "Custom Layouts", "Garden Space", "Luxury Finishes"]
  },
  {
    id: 3,
    title: "Duplex & Multi-Story",
    description: "Multi-level homes with separate living spaces and modern architecture.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    capabilities: ["Luxury Package", "Multi-Floor Design", "Separate Entrances", "Premium Materials"]
  },
  {
    id: 4,
    title: "Farmhouse & Villas",
    description: "Luxury homes with expansive layouts, landscaping, and resort-style amenities.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    capabilities: ["Ultra-Luxury", "Landscape Design", "Smart Home", "Premium Amenities"]
  }
];

export const blogData = [
  {
    id: "bim-cost-savings",
    title: "How BIM Technology Reduces Construction Costs by 15-20%",
    excerpt: "Discover how Building Information Modeling eliminates errors, prevents rework, and delivers significant cost savings in home construction projects.",
    category: "BIM & Engineering",
    date: "2025-01-10",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
  },
  {
    id: "construction-guide-visakhapatnam",
    title: "Complete Guide to Home Construction in Visakhapatnam 2025",
    excerpt: "Everything you need to know about building your dream home in Vizag—costs, approvals, timelines, and expert tips from experienced builders.",
    category: "Construction & Execution",
    date: "2025-01-15",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
  },
  {
    id: "construction-package-comparison",
    title: "Essential vs Premium vs Luxury: Which Construction Package Should You Choose?",
    excerpt: "Detailed comparison of construction packages to help you make the right decision based on your budget, lifestyle, and long-term goals.",
    category: "Design & Interiors",
    date: "2025-01-05",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80"
  },
  {
    id: "construction-timeline",
    title: "Home Construction Timeline: 6-8 Month Journey from Foundation to Handover",
    excerpt: "Month-by-month breakdown of what happens during home construction, milestone payments, and how to track progress effectively.",
    category: "Construction & Execution",
    date: "2024-12-28",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80"
  }
];

export const teamData = [
  {
    id: 1,
    name: "Architecture Team",
    position: "Design Architects",
    expertise: "Residential Design & Planning",
    experience: "15+ years"
  },
  {
    id: 2,
    name: "BIM & Engineering",
    position: "Technical Team",
    expertise: "BIM Modeling & Structural Engineering",
    experience: "12+ years"
  },
  {
    id: 3,
    name: "Construction Management",
    position: "Project Managers",
    expertise: "Site Management & Quality Control",
    experience: "18+ years"
  },
  {
    id: 4,
    name: "Interior Design",
    position: "Interior Designers",
    expertise: "Premium Home Interiors",
    experience: "10+ years"
  }
];

export const certificationsData = [
  "10-Year Structural Warranty",
  "BIM Certified Professionals",
  "Licensed Architects & Engineers",
  "ISO Quality Standards",
  "RERA Compliant",
  "Insured Projects"
];
