import {
  Code,
  Smartphone,
  Brain,
  TrendingUp,
  Video,
  Users,
  Image,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "web-dev",
    icon: Code,
    title: "Web Development",
    shortDesc: "Cutting-edge websites and web applications",
    fullDesc:
      "Building modern, responsive, and high-performance websites and custom web applications tailored for superior user experience and high conversion rates.",
    features: [
      "Responsive mobile-first UI/UX",
      "AI integrations",
      "SEO-friendly clean code",
      "Scalable architecture",
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App Development",
    shortDesc: "Native and cross-platform mobile solutions",
    fullDesc:
      "Engineering intuitive native and cross-platform mobile applications for iOS and Android platforms.",
    features: [
      "Cross-platform interoperability",
      "Performance optimization",
      "Secure API integration",
    ],
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI Solutions & Automation",
    shortDesc: "AI-powered websites and intelligent automation",
    fullDesc:
      "Integrating AI-driven tools, intelligent workflows, custom chatbots, and automated lead capture systems to modernize operations.",
    features: [
      "AI-powered user interfaces",
      "Workflow automation",
      "Intelligent data analytics",
    ],
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Digital Marketing & Ads",
    shortDesc: "Data-driven strategies that convert",
    fullDesc:
      "Data-driven marketing strategies, performance advertising, and full Meta Ads campaign management designed to maximize lead acquisition and ROI.",
    features: [
      "Meta Ads Management",
      "Funnel optimization",
      "Audience targeting",
      "Conversion tracking",
    ],
  },
  {
    id: "video",
    icon: Video,
    title: "Video Editing & Multimedia",
    shortDesc: "Professional content creation and editing",
    fullDesc:
      "Professional content creation, video post-production, dynamic social media video reels, and promotional multimedia assets.",
    features: [
      "High-definition exports",
      "Motion graphics",
      "Audio balancing",
      "Retention-focused pacing",
    ],
  },
  {
    id: "brand",
    icon: Users,
    title: "Brand Management & Identity",
    shortDesc: "Complete brand strategy and collaboration",
    fullDesc:
      "Comprehensive brand identity building, visual guidelines, brand voice positioning, and multi-channel consistency.",
    features: [
      "Brand style guides",
      "Visual assets",
      "Positioning strategy",
    ],
  },
  {
    id: "thumbnail",
    icon: Image,
    title: "Thumbnail Design",
    shortDesc: "High-CTR thumbnail designs for maximum clicks",
    fullDesc:
      "High-CTR, eye-catching thumbnail designs optimized specifically for YouTube and social media algorithms to maximize video clicks, viewer retention, and channel growth.",
    features: [
      "Algorithm-optimized designs",
      "A/B testing ready",
      "Platform-specific formatting",
    ],
  },
];

export const stats = [
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 150, suffix: "+", label: "Happy Clients" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

export const processSteps = [
  {
    step: "01",
    title: "Brief & Concept",
    description:
      "In-depth discovery to understand content goals, business objectives, and target audience.",
  },
  {
    step: "02",
    title: "Design Creation",
    description:
      "Developing visual and digital assets aligned with brand identity and technical specs.",
  },
  {
    step: "03",
    title: "Delivery & Optimization",
    description:
      "Final delivery of high-resolution assets, deployment, and performance monitoring.",
  },
];

export const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CEO, TechVenture Solutions",
    quote:
      "ImaginarsClubServices transformed our digital presence completely. Their AI-driven website solution increased our conversions by 240% in just 3 months.",
    rating: 5,
    project: "AI-Powered Website Architecture & Modern Web Development",
    result: "240% increase in conversions",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Director, GrowthHub",
    quote:
      "The team's expertise in digital marketing and Meta ads management delivered exceptional ROI. We saw a 3x increase in qualified leads within the first quarter.",
    rating: 5,
    project: "Digital Marketing, Lead Gen & Meta Ads Campaign Optimization",
    result: "3x increase in qualified leads",
  },
  {
    name: "Amit Patel",
    role: "Founder, StartupX",
    quote:
      "From brand strategy to video content, they handled everything seamlessly. Their comprehensive approach to digital transformation exceeded all expectations.",
    rating: 5,
    project: "Full Digital Transformation & Brand Positioning",
    result: "Rapid platform launch & market positioning",
  },
];

export const portfolioProjects = [
  {
    title: "TechVenture Solutions",
    category: "Web Development",
    description: "AI-Powered Website Architecture & Modern Web Development",
    result: "240% increase in conversions within 3 months",
    client: "Rajesh Kumar, CEO",
    tags: ["Next.js", "AI", "Web App"],
  },
  {
    title: "GrowthHub",
    category: "Digital Marketing",
    description: "Digital Marketing, Lead Gen & Meta Ads Campaign Optimization",
    result: "3x increase in qualified sales leads",
    client: "Priya Sharma, Marketing Director",
    tags: ["Meta Ads", "SEO", "Analytics"],
  },
  {
    title: "StartupX",
    category: "Full Digital Transformation",
    description: "Platform Engineering & Brand Positioning",
    result: "Rapid platform launch, scalable infrastructure",
    client: "Amit Patel, Founder",
    tags: ["Branding", "Platform", "Strategy"],
  },
];

export const contactInfo = {
  phone: "+91 93728 09022",
  email: "imaginarsclubservices@gmail.com",
  address: "3 Vikrant Residency, Near Station Road, Kanjurmarg East, Mumbai, Maharashtra 400042, India",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
