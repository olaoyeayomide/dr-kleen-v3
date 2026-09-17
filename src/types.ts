export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  colorTheme: 'blue' | 'cyan' | 'orange' | 'yellow' | 'sky';
}

export interface DetailedService {
  id: string;
  category: 'residential' | 'commercial' | 'post-construction';
  title: string;
  tagline: string;
  description: string;
  features: string[];
  startingPrice: string;
  duration: string;
  image: string;
  popular?: boolean;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: 'Bedroom' | 'Sofa' | 'Office' | 'Post-construction space';
  location: string;
  beforeImage: string;
  afterImage: string;
  details: string;
  timeSpent: string;
}

export interface PestPillar {
  id: string;
  name: string;
  icon: string;
  threatLevel: string;
  description: string;
  treatment: string;
}

export interface PestAssessmentData {
  pestType: string;
  area: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  duration: string;
  photoUrl?: string;
  address: string;
  city: string;
  preferredDate: string;
  preferredTime: string;
  fullName: string;
  phone: string;
  notes?: string;
}

export interface ProtectionPlan {
  id: string;
  name: string;
  cadence: string;
  tagline: string;
  price: string;
  popular?: boolean;
  targetAudience: string;
  features: string[];
  coverage: string;
}

export interface CorporateSector {
  id: string;
  name: string;
  icon: string;
  description: string;
  deliverables: string[];
  image: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  role?: string;
  rating: number;
  service: string;
  location: string;
  verified: boolean;
  date: string;
  comment: string;
  avatar: string;
}

export interface ServiceLocation {
  city: string;
  state: string;
  status: 'Currently Serving' | 'Coming Soon';
  neighborhoods: string[];
  hotline: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Operations & QA' | 'Technical Team' | 'Customer Experience' | 'Leadership';
  bio: string;
  image: string;
  experience: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  category: 'Hygiene Products' | 'Cleaning Tools' | 'Professional Equipment' | 'Home-Care Essentials';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
  volumeOrSize?: string;
}

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  subtitle?: string;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  quote?: string;
  content?: string;
  author?: string;
  name?: string;
  role: string;
  company?: string;
  rating: number;
  avatar: string;
}
