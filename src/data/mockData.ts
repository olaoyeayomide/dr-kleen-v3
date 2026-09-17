import {
  ServiceCategory,
  DetailedService,
  BeforeAfterItem,
  PestPillar,
  ProtectionPlan,
  CorporateSector,
  CustomerReview,
  ServiceLocation,
  TeamMember,
  ShopProduct,
  PricingPackage,
  Testimonial
} from '../types';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'home',
    title: 'Home',
    description: 'Deep Cleaning, Fumigation,\nMove In Cleaning & More',
    icon: 'home',
    colorTheme: 'blue'
  },
  {
    id: 'business',
    title: 'Business',
    description: 'Offices, Gyms, Retail & Clinic\nCleaning Services',
    icon: 'building',
    colorTheme: 'sky'
  },
  {
    id: 'pest',
    title: 'Pest Problem',
    description: 'Fast, Safe Pest Control For\nBedbugs, Rodents & Termites',
    icon: 'bug',
    colorTheme: 'orange'
  },
  {
    id: 'post-construction',
    title: 'Post Construction',
    description: 'Deep Site Cleanup, Paint &\nCement Residue Removal',
    icon: 'hard-hat',
    colorTheme: 'yellow'
  },
  {
    id: 'not-sure',
    title: 'Not Sure?',
    description: "Tell Us What's Going On —\nWe'll Recommend The Right Plan",
    icon: 'help-circle',
    colorTheme: 'cyan'
  }
];

export const detailedServices: DetailedService[] = [
  // 1. Residential Category
  {
    id: 'res-deep',
    category: 'residential',
    title: 'Deep Cleaning',
    tagline: 'Comprehensive top-to-bottom sanitization for living spaces',
    description: 'Intensive scrubbing, degreasing, steam extraction, and antibacterial fogging covering kitchen appliances, baseboards, tile grout, and hard-to-reach corners.',
    features: [
      'Degreasing of cooker hood & oven interiors',
      'Tile grout acid wash & steam restoration',
      'Limescale removal from glass shower enclosures',
      'Ceiling fan, air vent & chandelier dusting',
      'Antimicrobial spray mist on high-touch surfaces'
    ],
    startingPrice: '₦45,000',
    duration: '4 - 6 Hours',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'res-movein',
    category: 'residential',
    title: 'Move-In / Move-Out Cleaning',
    tagline: 'Fresh start sanitization before you unpack or handover',
    description: 'Ensure your new residence is spotlessly sanitized, pest-free, and odor-neutralized before your furniture arrives, or prepare old apartments for full deposit returns.',
    features: [
      'Interior wardrobe & cabinetry sanitization',
      'Disinfection of bathroom ceramics & mirrors',
      'Window track debris extraction & glass polishing',
      'Wall spot cleaning & light scuff removal',
      'Balcony power-washing & exterior drain flush'
    ],
    startingPrice: '₦60,000',
    duration: '5 - 8 Hours',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'res-sofa',
    category: 'residential',
    title: 'Sofa & Upholstery Cleaning',
    tagline: 'Deep injection-extraction steam extraction for fabrics & leather',
    description: 'Industrial hot-water injection deep fabric extraction pulls embedded body oils, dust mites, spill stains, and allergens from living room couches, dining chairs, and mattresses.',
    features: [
      'High-pressure hot extraction wand treatment',
      'Enzymatic odor neutralizing pre-spray',
      'Fabric pH-balanced neutralization wash',
      'Accelerated turbo air-mover drying process',
      'Optional Teflon stain-guard protection'
    ],
    startingPrice: '₦25,000',
    duration: '2 - 3 Hours',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80'
  },

  // 2. Commercial Category
  {
    id: 'comm-office',
    category: 'commercial',
    title: 'Office Cleaning',
    tagline: 'Productive, hygienic workstations and reception spaces',
    description: 'Scheduled janitorial service tailored for corporate headquarters, open-plan workspaces, executive suites, and boardrooms with zero operational downtime.',
    features: [
      'Desk, computer peripheral & monitor hygiene wipe',
      'Boardroom leather treatment & conference table polish',
      'Daily waste segregation & bin liner changes',
      'Restroom restocking & hourly audit logs',
      'Pantry microwave & refrigerator interior hygiene'
    ],
    startingPrice: '₦85,000 / mo',
    duration: 'Daily / Flexible Retainer',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'comm-facility',
    category: 'commercial',
    title: 'Facility Cleaning',
    tagline: 'Institutional maintenance for schools, hospitals, and clinics',
    description: 'Compliant decontamination protocol using hospital-grade biocides, auto-scrubber floor machines, and certified hygiene handling for sensitive multi-user environments.',
    features: [
      'Medical-grade disinfectant fogging',
      'Heavy-traffic hallway mechanized scrubbing',
      'Cafeteria food-safe grease trap sanitization',
      'Stairwell handrail sterilization loops',
      'Biohazard & sharp containment handling'
    ],
    startingPrice: 'Custom Retainer',
    duration: 'Ongoing Contract',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'comm-recurring',
    category: 'commercial',
    title: 'Recurring Cleaning Retainers',
    tagline: 'Automated weekly or bi-weekly routine cleaning rosters',
    description: 'Dedicated cleaners assigned to your business with supervisor audits, SLA compliance monitoring, and standardized quality checklists.',
    features: [
      'Dedicated vetted Dr•Kleen personnel',
      'Bi-weekly supervisory quality inspections',
      'Monthly replenishment of certified chemicals',
      'Emergency spill rapid-response within 2 hours',
      'Consolidated monthly corporate billing'
    ],
    startingPrice: '₦120,000 / mo',
    duration: 'Scheduled Roster',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },

  // 3. Post-Construction Category
  {
    id: 'post-cleanup',
    category: 'post-construction',
    title: 'Construction Cleanup',
    tagline: 'Heavy site clearance and initial contractor debris removal',
    description: 'Removal of rubble bags, drywall scraps, wood shavings, and leftover packing materials, preparing newly finished structures for interior detailing.',
    features: [
      'Bulk debris disposal & site clearance',
      'Dry sweep & negative-pressure HEPA vacuuming',
      'Protective film peeling from window joinery',
      'Electrical switchboard dust isolation',
      'External perimeter sweep & entrance wash'
    ],
    startingPrice: '₦75,000',
    duration: '1 - 2 Days',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'post-dust',
    category: 'post-construction',
    title: 'Dust & Debris Removal',
    tagline: 'Micro-silica dust extraction from walls, ducts, and fixtures',
    description: 'Fine concrete and gypsum dust clings to electrical fittings and window frames. We use industrial multi-stage HEPA extractors to ensure pure breathable indoor air.',
    features: [
      'Electrostatic dust-binding cloths for painted walls',
      'Air conditioning duct register decontamination',
      'Recessed ceiling spot extraction',
      'Wardrobe rail & drawer glides vacuuming',
      'Indoor air quality particle measurement'
    ],
    startingPrice: '₦65,000',
    duration: '6 - 8 Hours',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'post-final',
    category: 'post-construction',
    title: 'Final Preparation & Polish',
    tagline: 'Turnkey handover sparkle clean for owners, tenants, and realtors',
    description: 'Acid-free cement wash for porcelain tiles, paint splatter scraping with brass razor edges, stainless steel appliance polishing, and crystal clear window shine.',
    features: [
      'Safe removal of paint specks from tiles & glass',
      'Chemical-free grout line whitening',
      'Sanitary ware polish & tap fixture descaling',
      'Hardwood floor burnishing & protective seal',
      'Turnkey handover inspection sign-off'
    ],
    startingPrice: '₦90,000',
    duration: 'Full Day',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    popular: true
  }
];

export const beforeAfterItems: BeforeAfterItem[] = [
  {
    id: 'ba-bedroom',
    category: 'Bedroom',
    title: 'Master Suite Tile Restoration & Deep Steam Sanitize',
    location: 'Lekki Phase 1, Lagos',
    beforeImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    details: 'Heavy grime, stubborn moisture spots, and dusty baseboards transformed into a spotless, allergen-free sanctuary.',
    timeSpent: '4.5 Hours'
  },
  {
    id: 'ba-sofa',
    category: 'Sofa',
    title: '7-Seater Italian Suede Couch Steam Injection Extraction',
    location: 'Victoria Island, Lagos',
    beforeImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
    details: 'Removed deeply embedded tea spills, body oils, and pet dander. Restored original vibrant beige tone.',
    timeSpent: '2 Hours'
  },
  {
    id: 'ba-office',
    category: 'Office',
    title: 'Fintech Corporate Headquarters Workstation & Floor Scrub',
    location: 'Ikoyi, Lagos',
    beforeImage: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    details: 'Overnight turnaround of 45 workstations, high-traffic carpet steam cleaning, and glass boardroom decalcification.',
    timeSpent: 'Overnight Service (7 Hours)'
  },
  {
    id: 'ba-post',
    category: 'Post-construction space',
    title: 'Luxury 5-Bedroom Duplex Post-Construction Turnkey Clean',
    location: 'Maitama, Abuja',
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    details: 'Removed cement residues from imported marble tiles, paint drops from aluminum frames, and gypsum dust from high ceilings.',
    timeSpent: '12 Hours (Team of 6)'
  }
];

export const pestPillars: PestPillar[] = [
  {
    id: 'bedbugs',
    name: 'Bedbugs',
    icon: '🪳',
    threatLevel: 'Extreme Infestation Risk',
    description: 'Resistant to regular aerosols. Bedbugs hide inside mattress seams, headboards, and electrical wall conduits, biting silently at night.',
    treatment: 'Dual-action thermal steam treatment + synthetic pyrethroid residual barrier spray with 90-day warranty.'
  },
  {
    id: 'rodents',
    name: 'Rodents',
    icon: '🐀',
    threatLevel: 'Health & Wiring Threat',
    description: 'Rats gnaw through electrical cables causing fire hazards while spreading leptospirosis and food contamination in pantries.',
    treatment: 'Tamper-resistant bait stations, physical entry exclusion sealing, and humane rodenticide depopulation.'
  },
  {
    id: 'fumigation',
    name: 'Fumigation',
    icon: '🦟',
    threatLevel: 'Rapid Pest Depopulation',
    description: 'Ultra-low volume (ULV) cold misting reaches attic voids, ceilings, and crawl spaces to eradicate mosquitoes, roaches, and flies.',
    treatment: 'WHO-approved biodegradable insecticides safe for residential re-entry within 3 hours.'
  },
  {
    id: 'prevention',
    name: 'Preventive Protection',
    icon: '🛡️',
    threatLevel: 'Proactive Barrier Defense',
    description: 'Stopping pests before they enter your home or commercial facility through perimeter barriers, drain screens, and regular inspections.',
    treatment: 'Quarterly perimeter defense sprays and moisture reduction audits around foundations.'
  }
];

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Tell us what you need',
    description: 'Book online, start our Smart Pest Assessment, or message us on WhatsApp in under 60 seconds.',
    icon: 'FileText'
  },
  {
    step: '02',
    title: 'We understand your space',
    description: 'We ask precise questions, review photos/videos, or conduct a preliminary on-site inspection.',
    icon: 'Compass'
  },
  {
    step: '03',
    title: 'We confirm',
    description: 'You receive a transparent itemized quotation, scheduled date, and assigned team specialist credentials.',
    icon: 'CheckCircle'
  },
  {
    step: '04',
    title: 'Our team arrives',
    description: 'Uniformed, vetted Dr•Kleen technicians arrive on time equipped with industrial German gear and certified supplies.',
    icon: 'Truck'
  },
  {
    step: '05',
    title: 'We follow up',
    description: 'Post-service quality sign-off, customer satisfaction check, and automated rebooking discounts.',
    icon: 'Award'
  }
];

export const protectionPlans: ProtectionPlan[] = [
  {
    id: 'home-care',
    name: 'Home Care Plan',
    cadence: 'Bi-Weekly / Monthly',
    tagline: 'Consistent luxury freshness without lifting a finger',
    price: '₦75,000',
    popular: true,
    targetAudience: 'Busy professionals, families, expatriates',
    features: [
      '2x Deep Refresh Cleanings per month',
      '1x Sofa or Mattress Steam Clean per quarter',
      'Free Kitchen Appliance Interior Degreasing',
      'Priority weekend booking slots',
      '15% discount on emergency calls'
    ],
    coverage: '2 - 4 Bedroom Apartments & Duplexes'
  },
  {
    id: 'pest-protection',
    name: 'Pest Protection Shield',
    cadence: 'Quarterly',
    tagline: 'Guaranteed pest-free perimeter 365 days a year',
    price: '₦45,000',
    targetAudience: 'Homes, residential compounds, restaurants',
    features: [
      '4x Scheduled Full-Property Fumigations per year',
      'Bedbug, Cockroach, and Rodent immunity guarantee',
      'Free re-treatment if pests reappear within 60 days',
      'Safe botanical formulation for pets and children',
      'Pre-season mosquito yard fogging'
    ],
    coverage: 'Full Property (Interior + Perimeter)'
  },
  {
    id: 'estate-protection',
    name: 'Estate Protection Plan',
    cadence: 'Annual Retainer',
    tagline: 'Integrated community facility and pest hygiene management',
    price: 'Custom Estate SLA',
    targetAudience: 'Gated communities, resident associations, facility managers',
    features: [
      'Central drainage chemical treatment & vector control',
      'Common area power-washing (walkways, clubhouse, gym)',
      'Bulk resident subscription discounts (up to 30% off)',
      'Monthly digital pest surveillance report to estate board',
      'Dedicated on-site emergency sanitation technician'
    ],
    coverage: 'Gated Estates & Residential Enclaves'
  },
  {
    id: 'custom-plan',
    name: 'Custom Tailored Plan',
    cadence: 'Flexible Schedule',
    tagline: 'Engineered specifically around your exact square meters & operating hours',
    price: 'Tailored Quote',
    targetAudience: 'Specialty properties, embassies, commercial enterprises',
    features: [
      'Custom frequency (Daily, Nightly, or Custom Shift)',
      'Bespoke chemical specifications (eco-certified, hypoallergenic)',
      'Dedicated account supervisor & monthly SLA reviews',
      'Multi-site billing consolidation across cities',
      'Full public liability insurance coverage'
    ],
    coverage: 'Any Property Scope Across Nigeria'
  }
];

export const corporateSectors: CorporateSector[] = [
  {
    id: 'offices',
    name: 'Corporate Offices & Tech Hubs',
    icon: '🏢',
    description: 'Pristine workspaces that boost employee wellness, impress visiting investors, and eliminate cross-contamination.',
    deliverables: ['Daily desk wipe & monitor sanitizing', 'Boardroom readiness between meetings', 'Pantry & espresso bar hygiene'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'schools',
    name: 'Schools & Academic Institutions',
    icon: '🏫',
    description: 'Safe, germ-free educational environments protecting students and faculty from viral outbreaks and pests.',
    deliverables: ['Classroom desk & door handle disinfection', 'Restroom hourly bio-wash audit', 'Playground & cafeteria fumigation'],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'hospitality',
    name: 'Hospitality, Hotels & Restaurants',
    icon: '🏨',
    description: '5-star guest hygiene standards that safeguard your brand reputation and earn glowing online customer reviews.',
    deliverables: ['Industrial kitchen grease trap decontamination', 'Guest room mattress anti-dust mite steam', 'Lobby marble mirror burnishing'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'commercial',
    name: 'Commercial Facilities & Showrooms',
    icon: '🏬',
    description: 'Flawless retail floors and automobile showrooms where sparkling cleanliness directly drives sales conversions.',
    deliverables: ['High-gloss epoxy and tile machine scrubbing', 'Streak-free curtain wall window detailing', 'Heavy loading bay degreasing'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'estates',
    name: 'Estates & Facility Management',
    icon: '🏘️',
    description: 'Seamless contractual partnerships with FM firms seeking reliable, insured cleaning and pest eradication vendors.',
    deliverables: ['Perimeter mosquito & reptile suppression', 'Street gutter flushing & weed control', 'Security gatehouse hygiene maintenance'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=700&q=80'
  }
];

export const customerReviews: CustomerReview[] = [
  {
    id: '1',
    name: 'Engr. Femi Adeleke',
    role: 'Homeowner',
    rating: 5,
    service: 'Post-Construction Turnkey Cleaning',
    location: 'Lekki Phase 1, Lagos',
    verified: true,
    date: '3 days ago',
    comment: 'The contractor left my new 5-bedroom duplex covered in paint stains and concrete cement. Dr•Kleen dispatched a team of 6 with heavy steam machinery. By evening, the marble tiles were gleaming and all windows were spotless. Outstanding professionalism!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '2',
    name: 'Dr. Amina Bello',
    role: 'Medical Director, Prime Care Clinic',
    rating: 5,
    service: 'Clinic Fumigation & Antimicrobial Mist',
    location: 'Maitama, Abuja',
    verified: true,
    date: '1 week ago',
    comment: 'In healthcare, hygiene is non-negotiable. Dr•Kleen handles our clinical decontamination quarterly. Zero smell by morning, zero pests, and their team carries full safety credentials. Worth every Naira.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '3',
    name: 'Tunde Bakare',
    role: 'Managing Partner, Lexicon Chambers',
    rating: 5,
    service: 'Corporate Office Retainer',
    location: 'Victoria Island, Lagos',
    verified: true,
    date: '2 weeks ago',
    comment: 'We switched from an unreliable agency to Dr•Kleen 8 months ago. Our law firm has never looked sharper. Punctual staff, proactive supervisors, and the air smells crisp every single morning.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '4',
    name: 'Mrs. Chioma Okonkwo',
    role: 'Resident & Mother of 3',
    rating: 5,
    service: 'Bedbug Eradication & Sofa Steam Wash',
    location: 'Ikeja GRA, Lagos',
    verified: true,
    date: '3 weeks ago',
    comment: 'We battled bedbugs for months using local chemist sprays without success. Dr•Kleen used thermal steam and specialized misting. After just one treatment, our bedrooms are completely quiet and bite-free. Lifesavers!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '5',
    name: 'Babajide Alabi',
    role: 'CEO, NexaTech Solutions',
    rating: 5,
    service: 'Deep Move-In Cleaning',
    location: 'Bodija, Ibadan',
    verified: true,
    date: '1 month ago',
    comment: 'Used their Smart Pest Assessment tool first, then booked the move-in deep clean. The WhatsApp support replied within 3 minutes and the team arrived on time in Ibadan. Very rare level of customer service in Nigeria!',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80'
  }
];

export const serviceLocations: ServiceLocation[] = [
  {
    city: 'Lagos State',
    state: 'Lagos',
    status: 'Currently Serving',
    neighborhoods: ['Lekki Phase 1 & 2', 'Victoria Island (VI)', 'Ikoyi & Banana Island', 'Ikeja GRA', 'Magodo Shangisha & Phase 2', 'Festac Town', 'Maryland & Anthony', 'Surulere', 'Ajah & Sangotedo'],
    hotline: '+234 800 375 5336'
  },
  {
    city: 'Abuja (FCT)',
    state: 'Federal Capital Territory',
    status: 'Currently Serving',
    neighborhoods: ['Maitama', 'Asokoro', 'Wuse 2', 'Garki 1 & 2', 'Gwarinpa Estate', 'Jabi & Utako', 'Guzape District', 'Life Camp'],
    hotline: '+234 800 375 5337'
  },
  {
    city: 'Ibadan',
    state: 'Oyo State',
    status: 'Currently Serving',
    neighborhoods: ['Bodija & Old Bodija', 'Oluyole Estate', 'Agodi GRA', 'Ikolaba', 'Jericho GRA', 'Samonda', 'Alalubosa GRA'],
    hotline: '+234 800 375 5338'
  },
  {
    city: 'Port Harcourt',
    state: 'Rivers State',
    status: 'Coming Soon',
    neighborhoods: ['Old GRA', 'New GRA Phase 1-3', 'Peter Odili Road', 'Trans-Amadi', 'Woji Estate'],
    hotline: 'Launching Q3 2026'
  },
  {
    city: 'Asaba',
    state: 'Delta State',
    status: 'Coming Soon',
    neighborhoods: ['GRA Phase 1 & 2', 'Okpanam Road Corridor', 'Summit Road'],
    hotline: 'Launching Q4 2026'
  },
  {
    city: 'Kano',
    state: 'Kano State',
    status: 'Coming Soon',
    neighborhoods: ['Nasarawa GRA', 'Bompai Commercial Area', 'Tarauni'],
    hotline: 'Launching Q4 2026'
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Kayode Balogun',
    role: 'Head of Quality Assurance & Field Ops',
    department: 'Operations & QA',
    bio: 'Oversees on-site protocols, ISO-compliant chemical handling, and random white-glove supervisory audits across all client locations.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80',
    experience: '12+ Yrs Facilities Mgmt'
  },
  {
    id: '2',
    name: 'Dr. Chidinma Eze',
    role: 'Lead Entomologist & Vector Control Specialist',
    department: 'Technical Team',
    bio: 'Certified public health pest control specialist leading the fumigation formulations, pesticide safety protocols, and commercial IPM programs.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
    experience: 'Ph.D. Applied Entomology'
  },
  {
    id: '3',
    name: 'Zainab Mohammed',
    role: 'Director of Customer Experience & Dispatch',
    department: 'Customer Experience',
    bio: 'Ensures zero-delay scheduling, instant WhatsApp responses, and manages post-service client happiness and warranty resolution.',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=700&q=80',
    experience: '8+ Yrs Luxury Service'
  },
  {
    id: '4',
    name: 'Olumide Adeleke',
    role: 'Founder & Managing Director',
    department: 'Leadership',
    bio: 'Founded Dr•Kleen in 2019 to transform Nigerian facility care into a technology-driven, clinical hygiene experience built on unwavering trust.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
    experience: 'Ex-Real Estate Director'
  }
];

export const shopProducts: ShopProduct[] = [
  {
    id: 'p1',
    name: 'Dr•Kleen Bio-Sanitizing Floor Concentrate',
    category: 'Hygiene Products',
    price: 6500,
    originalPrice: 8000,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80',
    description: 'Hospital-grade botanical disinfectant floor cleaner with eucalyptus and lemongrass notes. Safe for marble, terrazzo, and wood.',
    inStock: true,
    volumeOrSize: '2 Litres'
  },
  {
    id: 'p2',
    name: 'Dr•Kleen Pro Microfiber Weave Set (Pack of 6)',
    category: 'Cleaning Tools',
    price: 4500,
    originalPrice: 5500,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    description: 'Ultra-absorbent 380 GSM split microfiber cloths. Streak-free cleaning on mirrors, TV screens, and granite countertops.',
    inStock: true,
    volumeOrSize: 'Pack of 6 (Color Coded)'
  },
  {
    id: 'p3',
    name: 'Dr•Kleen Heavy Duty Citrus Degreaser Spray',
    category: 'Home-Care Essentials',
    price: 3800,
    rating: 5.0,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80',
    description: 'Instantly dissolves baked-on engine oils, kitchen grease, barbecue burnt stains, and tile grout buildup.',
    inStock: true,
    volumeOrSize: '750ml Trigger Spray'
  },
  {
    id: 'p4',
    name: 'Industrial Turbo Air Mover & Carpet Dryer',
    category: 'Professional Equipment',
    price: 85000,
    originalPrice: 95000,
    rating: 4.9,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    description: 'Commercial 3-speed floor blower designed for rapid drying of washed carpets, wet bathroom floors, and paint walls.',
    inStock: true,
    volumeOrSize: '1/2 HP High-Velocity'
  }
];

export const pricingPackages: PricingPackage[] = [
  {
    id: 'starter',
    name: 'Standard Clean',
    price: '₦35,000',
    period: 'per session',
    description: 'Essential deep refresh for 1-2 bedroom apartments and studio flats.',
    features: [
      'Vacuuming & mopping all floors',
      'Kitchen degreasing & appliance wipe',
      'Complete bathroom sanitization',
      'Dusting baseboards & interior glass'
    ]
  },
  {
    id: 'deep-comfort',
    name: 'Executive Deep',
    price: '₦65,000',
    period: 'per session',
    description: 'Intensive hospital-grade treatment for 3-5 bedroom homes and townhouses.',
    features: [
      'Everything in Standard Clean',
      'Full upholstery steam sanitization',
      'Cabinet interior sanitization',
      'Non-toxic insect perimeter spray',
      'Window frame restoration'
    ],
    isPopular: true
  },
  {
    id: 'commercial-retainer',
    name: 'Corporate Monthly',
    price: '₦180,000',
    period: 'monthly retainer',
    description: 'Scheduled multi-day janitorial and fumigation for offices and schools.',
    features: [
      'Daily dedicated cleaners on site',
      'Consumables restocking management',
      'Monthly vector fumigation included',
      'Supervisor QA reporting app'
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'Dr.Kleen turned around our new corporate headquarters in Victoria Island after contractors left heavy dust and adhesive stains. Completely immaculate.',
    author: 'Chief Babatunde Adeleke',
    role: 'Managing Partner',
    company: 'Sterling Capital Partners, VI',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't2',
    quote: 'The pest assessment diagnostic was shockingly accurate. Their entomologist spotted termite entry points behind our kitchen cabinets that two previous companies missed.',
    author: 'Dr. Folashade Alabi',
    role: 'Resident & Surgeon',
    company: 'Pinnock Beach Estate, Lekki',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
];

