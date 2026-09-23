export interface Project {
  id: string;
  client: string;
  location: string;
  scope: string;
  status: 'executed' | 'under_execution';
  category: 'Electrical' | 'Fire Fighting' | 'CCTV & Security' | 'Integrated Systems';
  year?: string;
  keyHighlights: string[];
  image: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  applications: string[];
}

export interface Credential {
  title: string;
  subtitle: string;
  regNumber: string;
  authority: string;
  issuedDate: string;
  badge: string;
  description: string;
}

export const COMPANY_INFO = {
  name: "KELTCH ENGINEERING",
  legalName: "KELTCH ENGINEERING",
  tagline: "DELIVERING EXCELLENCE",
  establishedYear: "2024",
  incorporationDate: "12.01.2024",
  founder: {
    name: "Mr. D. D. Mishra",
    role: "Founder & Managing Director",
    experienceYears: 14,
    priorCompany: "M/s Milestones Engineering Pvt. Ltd.",
    summary: "Over 14 years of hands-on expertise in high-voltage electrical distribution, industrial fire protection systems, and turnkey MEP project execution."
  },
  msmeReg: "UDYAM-UP-28-0096676",
  gstin: "09ARUPM2795F1Z2",
  isoCert: "ISO 9001:2015",
  isoScope: "Trading of Electrical Items, Installation of complete electrical system, security system and civil construction works",
  isoBody: "TNV Certification Pvt. Ltd. / UAF / IAF",
  officeAddress: {
    line1: "First Floor Office No. 2, Chaudhary Sher Singh Complex",
    line2: "Dadri Main Road, Pillar No. 40, Baraula",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201304",
    country: "India",
    full: "First Floor Office No. 2, Chaudhary Sher Singh Complex, Dadri Main Road, Pillar No. 40, Baraula, Noida, Uttar Pradesh - 201304"
  },
  registeredAddress: {
    line1: "A-107, Tower-A, Sukhdham Residency",
    line2: "Hazipur, Sector-104",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201304",
    country: "India",
    full: "A-107, Tower-A, Sukhdham Residency, Hazipur, Sector-104, Noida (U.P.) 201304"
  },
  contacts: {
    phone: "9899259051",
    formattedPhone: "+91 9899259051",
    whatsapp: "919899259051",
    primaryEmail: "Keltchengineering@outlook.com",
    secondaryEmail: "Tokeltch@outlook.com",
  },
  stats: {
    established: 2024,
    totalListedProjects: 10,
    executedProjectsCount: 6,
    underExecutionProjectsCount: 4,
    serviceAreasCount: 8,
    sectorsCount: 6,
  }
};

export const SERVICES: Service[] = [
  {
    id: "electrification",
    number: "01",
    title: "Electrification of Projects",
    shortDesc: "Tailor-made HT & LT electrical distribution and turnkey power infrastructure for commercial, industrial, and institutional complexes.",
    fullDesc: "Comprehensive electrification design, supply, layout planning, and field execution tailored to industrial standards. Covers main distribution panels, busbar trunking, power cabling, transformer installations, and precision load balancing.",
    iconName: "Zap",
    deliverables: [
      "HT/LT Cable Laying & Tray Installations",
      "Power Distribution Panels & Busbar Trunking Systems (BBT)",
      "Internal & External Point Wiring & DB Terminations",
      "Lighting & Energy Management Systems"
    ],
    applications: ["Industrial Plants", "Commercial Towers", "Hospitals", "Warehouses", "Institutional Campuses"]
  },
  {
    id: "supply-installation",
    number: "02",
    title: "Supply & Installation",
    shortDesc: "End-to-end procurement, site delivery, testing, and commissioning of heavy electrical & fire safety equipment.",
    fullDesc: "Authorized sourcing and certified site mounting of heavy-duty switchgears, servo stabilizers, DG sync panels, UPS backups, light fixtures, raceways, and earthings.",
    iconName: "Truck",
    deliverables: [
      "Servo Stabilizers & Isolation Transformers",
      "DG Sync Panels & ATS Switch Board Panels",
      "Industrial Cable Trays & Earthing Systems",
      "High-Efficiency Indoor & Outdoor Light Fixtures"
    ],
    applications: ["Manufacturing Facilities", "Data Centers", "Corporate Head Offices", "Warehouses"]
  },
  {
    id: "substations",
    number: "03",
    title: "Indoor & Outdoor Substations",
    shortDesc: "Erection, cabling, transformer commissioning, and AVR integration for indoor/outdoor high-voltage substations.",
    fullDesc: "Engineering design and execution of indoor unitized substations (USS) and outdoor step-down substation yards up to 11kV/415V. Complete with 1000kV/3 MVA transformers, HT AVRs, switchgears, and safety earth rings.",
    iconName: "Cpu",
    deliverables: [
      "11kV / 415V Power & Distribution Transformers (up to 3 MVA)",
      "1000kV Unitized Substation (USS) Integration",
      "HT AVR & Automatic Voltage Regulation Panels",
      "Substation Grid Earthing & Surge Arresters"
    ],
    applications: ["Large Scale Manufacturing Units", "Educational Campuses", "Industrial Complexes"]
  },
  {
    id: "pa-systems",
    number: "04",
    title: "P.A. Systems (Public Address)",
    shortDesc: "Commercial public address and voice evacuation acoustic infrastructure for clear mass alerts and background audio.",
    fullDesc: "Turnkey acoustics, amplifier routing, zone selectors, ceiling/wall speakers, and Cat-6 cabling for institutional and commercial buildings. Seamlessly integrated with fire alarm notification panels for emergency voice broadcasts.",
    iconName: "Volume2",
    deliverables: [
      "Multi-zone Voice Alarm & Public Address Controllers",
      "High-Clarity Ceiling & Wall Speaker Networks",
      "Cat-6 Backbone Cabling & Rack Routing",
      "Emergency Automated Override Integration"
    ],
    applications: ["Schools & Colleges", "Corporate Reception Areas", "Retail & Office Buildings"]
  },
  {
    id: "cctv",
    number: "05",
    title: "CCTV & Surveillance",
    shortDesc: "High-definition IP surveillance networks, NVR storage, and Cat-6 structural cabling for modern facility security.",
    fullDesc: "Designing robust CCTV coverage for critical entry/exit points, inventory aisles, reception spaces, and perimeters. Includes high-capacity network video recorders, switch networks, and cabling.",
    iconName: "Camera",
    deliverables: [
      "High-Resolution HD IP & Bullet Cameras",
      "NVR / DVR Storage & Centralized Monitoring Consoles",
      "Cat-6 Structured Cabling & Conduit Routing",
      "Remote Facility Surveillance System"
    ],
    applications: ["Commercial Offices", "Educational Institutions", "Logistics Hubs", "Government Facilities"]
  },
  {
    id: "lightning-protection",
    number: "06",
    title: "Lightning Protection Systems (LPS)",
    shortDesc: "Advanced ESE & passive lightning protection networks, earth pits, and surge protection devices to safeguard buildings.",
    fullDesc: "Comprehensive LPS design adhering to safety standards. Protects structural assets, electronic switchgears, and personnel from atmospheric electrical surges using air terminals, down conductors, and dedicated low-resistance chemical earthings.",
    iconName: "ShieldAlert",
    deliverables: [
      "Early Streamer Emission (ESE) Air Terminals",
      "Copper/GI Down Conductors & Roof Grid Networks",
      "Chemical Maintenance-Free Earthing Pits",
      "Surge Protection Device (SPD) Integration"
    ],
    applications: ["High-Rise Structures", "Head Office Towers", "Industrial Plants", "Warehouses"]
  },
  {
    id: "fas-systems",
    number: "07",
    title: "Fire Alarm Systems (FAS)",
    shortDesc: "Addressable and conventional fire alarm detection, smoke sensors, heat detectors, and automated alert panels.",
    fullDesc: "Life-safety fire detection infrastructure. Installation of intelligent main fire alarm control panels (FACP), optical smoke detectors, thermal sensors, manual call points (MCP), and strobe hooters.",
    iconName: "Bell",
    deliverables: [
      "Addressable & Conventional Fire Alarm Control Panels",
      "Optical Smoke & Thermal Rate-of-Rise Detectors",
      "Manual Call Points (MCP) & Electronic Hooters",
      "Cat-6 & Armored Signal Wire Interconnections"
    ],
    applications: ["Commercial Head Offices", "Hospitals", "Warehouses", "Government Complexes"]
  },
  {
    id: "fire-fighting",
    number: "08",
    title: "Fire Fighting Systems",
    shortDesc: "Complete wet riser, sprinkler networks, hydrant valves, fire pump sets, and automatic suppression systems.",
    fullDesc: "Turnkey fire suppression engineering. Erection of main fire diesel/electric pump sets, jockey pumps, wet riser piping, automatic sprinkler grids, hose reel drums, and portable fire extinguishers for full building safety compliance.",
    iconName: "Flame",
    deliverables: [
      "Main Diesel Engine & Electric Motor Fire Pump Sets",
      "Automatic Sprinkler Line Networks & Alarm Valves",
      "External & Internal Hydrant Valves & Hose Cabinets",
      "Split Air & Gas Suppression Systems"
    ],
    applications: ["Industrial Plants", "Residential Complexes", "Commercial High-Rises", "Institutional Campus"]
  }
];

export const PROJECTS: Project[] = [
  // Executed Projects
  {
    id: "gyanshree-school-noida",
    client: "Gyanshree School, Noida (Haldiram's Group)",
    location: "Sector 127, Noida (U.P.)",
    scope: "SITC of LT Panels, HT, LT Cabling, Cable Trays, Earthings, & 11/415 V Installation TRF 3 MVA With HT AVR.",
    status: "executed",
    category: "Electrical",
    year: "2024",
    keyHighlights: [
      "3 MVA Transformer installation with HT AVR",
      "Complete HT & LT Cabling & Cable Tray routing",
      "Precision Earthing System execution"
    ],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "multibud-foods-aligarh",
    client: "Multibud Foods Pvt. Ltd.",
    location: "Aligarh (U.P.) Ph-1",
    scope: "SITC of HT, LT Cabling, LT Servo, Earthings, Raceways, Light Fixtures & 11/415 V Installation TRF 1 MVA.",
    status: "executed",
    category: "Electrical",
    year: "2024",
    keyHighlights: [
      "1 MVA Step-down Transformer installation",
      "LT Servo stabilizer & industrial raceways",
      "Complete factory illumination & power distribution"
    ],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "rattan-singh-builders-noida",
    client: "Rattan Singh Builders",
    location: "Sector 67, Noida (U.P.)",
    scope: "SITC of CCTV & Cat-6 Cabling.",
    status: "executed",
    category: "CCTV & Security",
    year: "2024",
    keyHighlights: [
      "HD IP Camera network installation",
      "Structured Cat-6 Gigabit network backbone",
      "Centralized NVR storage & monitoring setup"
    ],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "gyanshree-reception-noida",
    client: "Gyanshree School (Reception Area)",
    location: "Sector 127, Noida (U.P.)",
    scope: "SITC Light Fixtures, Fire Alarm System, PA System & Cat-6 Cabling.",
    status: "executed",
    category: "Integrated Systems",
    year: "2024",
    keyHighlights: [
      "Architectural Light Fixtures installation",
      "Addressable Fire Alarm System integration",
      "Public Address acoustic network & data cabling"
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "haldiram-products-phase1",
    client: "M/s Haldiram Products Pvt. Ltd.",
    location: "Jahangirpuri, New Delhi",
    scope: "SITC of HT Panel, 1000kV USS, DG Sync. Panel, 2000 Amp. LT Panels, HT, LT Cabling, SS Cable Tray, Earthings, BBT, Rising Mains, 2x40KVA UPS & Terminations.",
    status: "executed",
    category: "Electrical",
    year: "2024",
    keyHighlights: [
      "1000kV Unitized Substation (USS) & 2000 Amp LT Panels",
      "DG Synchronization Panel & Busbar Trunking (BBT)",
      "2x40KVA Industrial UPS & Stainless Steel Cable Trays"
    ],
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "relaxo-footwear-bhaproda",
    client: "Relaxo Footwear Limited (Warehouse)",
    location: "Bhaproda, Haryana",
    scope: "SITC of Cabling, Point Wiring, Earthings, Light Fixture, DB's & Terminations.",
    status: "executed",
    category: "Electrical",
    year: "2024",
    keyHighlights: [
      "Warehouse internal power & illumination distribution",
      "Distribution Boards (DBs) & precision terminations",
      "Low-resistance safety earth pits"
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
  },
  // Projects Under Execution
  {
    id: "relaxo-dua-residency",
    client: "Relaxo Footwear (Dua Residency)",
    location: "Vasant Vihar, New Delhi",
    scope: "SITC of LV Panel, Cabling, Point Wiring, LV Systems, Earthings & Terminations.",
    status: "under_execution",
    category: "Electrical",
    keyHighlights: [
      "Turnkey Low Voltage (LV) distribution panels",
      "Complete electrical point wiring & earth rings",
      "LV systems integration"
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "haldiram-products-phase2",
    client: "M/s Haldiram Products Pvt. Ltd. (Phase-II)",
    location: "Jahangirpuri, New Delhi",
    scope: "SITC DG Exhaust Piping, Street Light Poles, LPS System, Light Fixture & Terminations. SITC of 1600 Amp. ATS Switch Board Panel With Aluminum Bus Bar with accessories.",
    status: "under_execution",
    category: "Electrical",
    keyHighlights: [
      "1600 Amp ATS Switchboard with Aluminum Bus Bar",
      "DG Exhaust Piping & Outdoor Street Lighting Poles",
      "Lightning Protection Systems (LPS) deployment"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "relaxo-head-office-lps",
    client: "Relaxo Footwear Limited (Head Office, New Building)",
    location: "Peeragarhi, Delhi",
    scope: "SITC of Lightning Protection Systems (LPS) Work.",
    status: "under_execution",
    category: "Integrated Systems",
    keyHighlights: [
      "Corporate Head Office structural surge protection",
      "ESE Air Terminals & Down Conductor network",
      "Dedicated Earthing Grid testing"
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "intelligence-bureau-office-gorakhpur",
    client: "Intelligent Bureau Office",
    location: "Gorakhpur (U.P.)",
    scope: "Construction of Office cum Residential Complex including Internal EI and fans, Fire fighting system, Automatic fire alarm system, Split air condition, Solar P.V. System, D.G set, EPABX system, CCTV, Submersible Pump & UPS system etc.",
    status: "under_execution",
    category: "Fire Fighting",
    keyHighlights: [
      "Turnkey Office cum Residential Complex Infrastructure",
      "Automatic Fire Alarm & Wet Riser Fire Fighting Systems",
      "Solar P.V. System, D.G. Backup Set, EPABX & CCTV Systems"
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
  }
];

export const CREDENTIALS: Credential[] = [
  {
    title: "MSME Registration",
    subtitle: "Ministry of Micro, Small and Medium Enterprises",
    regNumber: "UDYAM-UP-28-0096676",
    authority: "Government of India / State Govt. of UP",
    issuedDate: "12.01.2024",
    badge: "Government Registered Enterprise",
    description: "Official enterprise recognition under the Micro, Small and Medium Enterprises Development Act for electrical, fire safety, and technical consultancy services."
  },
  {
    title: "ISO 9001:2015",
    subtitle: "Quality Management System Certification",
    regNumber: "Certificate No: 240618019101",
    authority: "TNV Certification Pvt. Ltd. / UAF / IAF Accredited",
    issuedDate: "18.06.2024",
    badge: "Certified Quality System",
    description: "Globally recognized accreditation for trading of electrical items, installation of complete electrical systems, security systems, and civil construction works."
  },
  {
    title: "GST Registration",
    subtitle: "Goods and Services Tax Identification",
    regNumber: "GSTIN: 09ARUPM2795F1Z2",
    authority: "Commercial Tax Department, Uttar Pradesh",
    issuedDate: "09.02.2024",
    badge: "Statutory Compliance",
    description: "Registered tax entity under UP Goods and Services Tax Act 2017 for seamless B2B commercial invoicing and institutional contracting."
  }
];

export const SECTORS = [
  {
    title: "Commercial",
    description: "High-rise office towers, corporate reception suites, and mixed-use real estate complexes.",
    icon: "Building2",
    badge: "Power & FAS Infrastructure"
  },
  {
    title: "Industrial",
    description: "Manufacturing plants, processing facilities, heavy machinery electrification, and HT substation erection.",
    icon: "Factory",
    badge: "Substations & Switchgears"
  },
  {
    title: "Warehouses",
    description: "Logistics hubs, high-bay lighting, perimeter CCTV, lightning protection, and power distribution.",
    icon: "Warehouse",
    badge: "LPS & High-Bay Systems"
  },
  {
    title: "Hospitals",
    description: "Critical care uninterrupted power back-ups (UPS), DG synchronization, earthing, and fire safety.",
    icon: "Activity",
    badge: "UPS & Life Safety"
  },
  {
    title: "Institutional",
    description: "Educational campuses, public administration offices, voice address alerts, and security networks.",
    icon: "GraduationCap",
    badge: "P.A. & Security Networks"
  },
  {
    title: "Residential",
    description: "Gated housing enclaves, multi-story apartments, internal electrical installations, and solar PV integrations.",
    icon: "Home",
    badge: "Integrated EI & Fire Safety"
  }
];
