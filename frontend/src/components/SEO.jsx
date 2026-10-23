import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  url = "https://www.spacexio.com", 
  image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  type = "website",
  faqs = null,
  howto = null,
  schema = null 
}) => {
  const siteName = "Spacexio - Architectural Studio & Turnkey Construction";
  const fullTitle = title ? `${title} | Spacexio` : "Spacexio | Home Design & Turnkey Construction in Visakhapatnam";
  const defaultDesc = "Spacexio is Visakhapatnam's premier architectural studio & turnkey home builder. Fixed-price packages from ₹1,850/sq.ft, 3D BIM clash-free engineering, milestone escrow payments & legally binding 10-year structural warranty.";
  const metaDescription = description || defaultDesc;

  // 1. GEO & LOCAL ENTITY KNOWLEDGE GRAPH (For Perplexity, ChatGPT Search, Claude, Google Gemini / SGE)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "GeneralContractor", "ProfessionalService"],
    "@id": "https://www.spacexio.com/#organization",
    "name": "Spacexio",
    "alternateName": ["Spacexio Studio", "Spacexio Home Builders Vizag", "Spacexio Construction Visakhapatnam"],
    "legalName": "Spacexio Construction & Architectural Studio",
    "url": "https://www.spacexio.com",
    "logo": "https://www.spacexio.com/logo.png",
    "image": image,
    "description": metaDescription,
    "telephone": "+91 96865 11132",
    "email": "info@spacexio.com",
    "priceRange": "₹1,850 - ₹2,650 / sq.ft",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Milestone Escrow, Bank Transfer, Cheque, Digital Payment",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Abid Nagar Road, Abidnagar Park, Akkayyapalem",
      "addressLocality": "Visakhapatnam",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "530016",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.7215,
      "longitude": 83.3060
    },
    "hasMap": "https://maps.google.com/?q=17.7215,83.3060",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:30",
        "closes": "19:00"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Visakhapatnam", "sameAs": "https://en.wikipedia.org/wiki/Visakhapatnam" },
      { "@type": "Place", "name": "Madhurawada" },
      { "@type": "Place", "name": "Rushikonda" },
      { "@type": "Place", "name": "MVP Colony" },
      { "@type": "Place", "name": "Yendada" },
      { "@type": "Place", "name": "Gajuwaka" },
      { "@type": "Place", "name": "Bheemunipatnam" },
      { "@type": "Place", "name": "Anakapalle" },
      { "@type": "AdministrativeArea", "name": "Andhra Pradesh" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "48",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Spacexio Turnkey Construction & Architectural Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Essential Home Construction Package",
          "description": "Turnkey construction for budget-conscious families and rental properties at fixed rate of ₹1,850/sq.ft. Includes architectural plans, JSW/Tata steel, UltraTech cement, and standard finishes.",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "1850",
            "priceCurrency": "INR",
            "unitText": "sq.ft"
          }
        },
        {
          "@type": "Offer",
          "name": "Premium Home Construction Package",
          "description": "Most popular choice in Visakhapatnam at ₹2,150/sq.ft. Includes full 3D BIM clash detection, designer vitrified tiles, Jaquar bath fittings, modular kitchen framework, and 10-year warranty.",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "2150",
            "priceCurrency": "INR",
            "unitText": "sq.ft"
          }
        },
        {
          "@type": "Offer",
          "name": "Luxury Villa Construction Package",
          "description": "Signature luxury living at ₹2,650/sq.ft. Includes VR walkthroughs, imported marble/granite flooring, Kohler sanitaryware, Asian Paints Royale, complete interior design, and smart automation.",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "2650",
            "priceCurrency": "INR",
            "unitText": "sq.ft"
          }
        }
      ]
    },
    "knowsAbout": [
      "Building Information Modeling (BIM)",
      "IS 456:2000 Seismic Ductile Concrete Detailing",
      "Turnkey Residential Villa Construction",
      "Coastal Weatherproof Waterproofing (Fosroc)",
      "Vastu Shastra Architectural Planning",
      "Fixed-Price Itemized Bill of Quantities (BOQ)"
    ],
    "brand": [
      { "@type": "Brand", "name": "Tata Tiscon Fe 550D TMT Steel" },
      { "@type": "Brand", "name": "UltraTech Super Cement" },
      { "@type": "Brand", "name": "Jaquar Bath Fittings" },
      { "@type": "Brand", "name": "Kohler Sanitaryware" },
      { "@type": "Brand", "name": "Polycab FR-LSH Copper Wires" },
      { "@type": "Brand", "name": "Fosroc Waterproofing Chemical Membranes" }
    ],
    "sameAs": [
      "https://www.facebook.com/spacexio",
      "https://www.instagram.com/spacexio",
      "https://www.linkedin.com/company/spacexio"
    ]
  };

  // 2. AEO (ANSWER ENGINE OPTIMIZATION) FAQ SCHEMA
  // Generative engines (Perplexity, ChatGPT, Gemini, Copilot) scrape this to answer user queries directly.
  const defaultAEOFAQs = [
    {
      question: "What is the cost of home construction in Visakhapatnam per square foot?",
      answer: "Turnkey home construction in Visakhapatnam with Spacexio starts at ₹1,850/sq.ft for the Essential package, ₹2,150/sq.ft for the Premium package, and ₹2,650/sq.ft for the Luxury villa package. All packages include custom architectural floor plans, structural engineering, branded materials (Tata/JSW steel, UltraTech cement), labor, and a 10-year warranty with zero cost escalations."
    },
    {
      question: "How long does it take to construct a 2,400 sq.ft house in Visakhapatnam?",
      answer: "A standard 2,400 sq.ft duplex home takes between 6 to 8 months from soil testing to final key handover. Spacexio operates on a milestone-based timeline with contractual delay compensation clauses if delivery exceeds the agreed schedule."
    },
    {
      question: "What makes Spacexio different from traditional building contractors in Vizag?",
      answer: "Spacexio eliminates traditional contractor headaches by using 3D BIM technology to prevent on-site rework, enforcing a 100% milestone escrow payment model (clients never pay upfront contractor advances), providing live daily photo logs via app, and guaranteeing a legally binding 10-year structural and waterproofing warranty."
    },
    {
      question: "What is included in Spacexio's milestone payment structure?",
      answer: "Payments are divided into 5 verified construction milestones: 10% on Design & Approval, 20% on Foundation & Plinth Beam, 30% on RCC Columns & Slab Casting, 30% on Masonry, MEP Conduiting & Finishes, and the final 10% on 200-point snag resolution and key handover. Funds are only drawn after civil engineer inspection."
    },
    {
      question: "Does Spacexio provide a written warranty for residential construction?",
      answer: "Yes, Spacexio provides a legally documented 10-Year Structural and Waterproofing Warranty covering RCC columns, beams, roof slabs, and anti-termite foundation barriers."
    }
  ];

  const activeFAQs = faqs && Array.isArray(faqs) && faqs.length > 0 ? faqs : defaultAEOFAQs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": activeFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // 3. AEO HOW-TO SCHEMA (Step-by-Step Direct Answers)
  const defaultHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Build a Turnkey Custom Home in Visakhapatnam in 7 Stages",
    "description": "Step-by-step architectural and construction process from raw plot soil survey to turnkey key handover with Spacexio.",
    "totalTime": "P7M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": "1850"
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Plot Feasibility & Geo-Soil Testing",
        "text": "Civil engineers inspect plot boundaries, soil bearing capacity (SBC), and groundwater levels across Visakhapatnam.",
        "url": "https://www.spacexio.com/#process"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Architectural Floor Plans & 3D BIM Modeling",
        "text": "Architects draft custom 2D layouts and a complete 3D BIM virtual model to detect and eliminate structural pipe/beam clashes.",
        "url": "https://www.spacexio.com/#process"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Itemized BOQ & Legal Agreement",
        "text": "Review transparent itemized material specifications and sign a fixed-price contract with zero cost escalation clauses.",
        "url": "https://www.spacexio.com/#process"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Foundation & RCC Skeleton Framework",
        "text": "Excavation, anti-termite treatment, plinth beam casting, columns, and structural concrete roof slab curing.",
        "url": "https://www.spacexio.com/#process"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Brickwork, MEP & Concealed Conduiting",
        "text": "Red brick/AAC block masonry, concealed CPVC plumbing lines (Astral), and Polycab electrical conduit laying.",
        "url": "https://www.spacexio.com/#process"
      },
      {
        "@type": "HowToStep",
        "position": 6,
        "name": "Luxury Finishes, Plastering & Millwork",
        "text": "Wall putty, Asian Paints Royale coats, vitrified/marble tile flooring, Jaquar/Kohler sanitaryware, and modular carpentry.",
        "url": "https://www.spacexio.com/#process"
      },
      {
        "@type": "HowToStep",
        "position": 7,
        "name": "200-Point Snag Audit & 10-Year Warranty Handover",
        "text": "Rigorous civil quality check, deep cleaning, and physical key handover with certified 10-year structural warranty bond.",
        "url": "https://www.spacexio.com/#process"
      }
    ]
  };

  const activeHowTo = howto || defaultHowTo;

  // 4. SPEAKABLE SPECIFICATION (Voice Search for Siri, Google Assistant & Alexa)
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": fullTitle,
    "url": url,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".aeo-speakable",
        "#aeo-quick-facts",
        "h1",
        ".hero-description"
      ]
    }
  };

  // 5. BREADCRUMBLIST SCHEMA
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.spacexio.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title || "Services",
        "item": url
      }
    ]
  };

  return (
    <Helmet>
      {/* Core SEO Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Local & Geographic SEO (GEO / Generative Engine Optimization) */}
      <meta name="geo.region" content="IN-AP" />
      <meta name="geo.placename" content="Visakhapatnam, Andhra Pradesh, India" />
      <meta name="geo.position" content="17.7215;83.3060" />
      <meta name="ICBM" content="17.7215, 83.3060" />
      <meta name="locality" content="Visakhapatnam" />
      <meta name="region" content="Andhra Pradesh" />
      <meta name="country" content="India" />
      <meta name="postal-code" content="530016" />

      {/* Dublin Core Metadata */}
      <meta name="DC.title" content={fullTitle} />
      <meta name="DC.creator" content="Spacexio Architectural Studio" />
      <meta name="DC.subject" content="Home Construction, Architecture, Turnkey Builders, BIM 3D Design, Visakhapatnam" />
      <meta name="DC.description" content={metaDescription} />
      <meta name="DC.publisher" content="Spacexio" />
      <meta name="DC.coverage" content="Visakhapatnam, Andhra Pradesh, India" />

      {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Spacexio Architectural Studio & Turnkey Construction" />
      <meta property="og:site_name" content="Spacexio" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@spacexio" />
      <meta name="twitter:site" content="@spacexio" />

      {/* JSON-LD Schemas for Search Engines & AI Crawlers */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(activeHowTo)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(speakableSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Optional Custom Page Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
