import { Code, Smartphone, Brain, TrendingUp, Share2, Users, Calendar, Video, Image as ImageIcon, RefreshCw, Store, MapPin, Target, Bot, Search, Globe, Mic } from 'lucide-react'

export const servicesData = [
  { 
    slug: "web-development",
    title: "Web Development", 
    desc: "Custom websites and web applications built with modern technologies for optimal performance and user experience.", 
    icon: Code, 
    features: ["Responsive Design", "Custom CMS", "E-commerce Solutions", "Progressive Web Apps", "API Integration"],
    content: "Our Web Development service isn't just about writing code; it's about engineering scalable, high-performance digital ecosystems. We utilize modern frameworks like Next.js, React, and robust backend architectures to ensure your platform is lightning-fast, highly secure, and perfectly tailored to your business needs. Whether you need a massive e-commerce portal or a sleek corporate site, we deliver masterpieces that convert."
  },
  { 
    slug: "mobile-app-development",
    title: "Mobile App Development", 
    desc: "Native and cross-platform mobile applications that deliver seamless experiences across iOS and Android devices.", 
    icon: Smartphone, 
    features: ["iOS & Android Apps", "React Native", "Flutter Development", "App Store Optimization", "Push Notifications"],
    content: "In a mobile-first world, your application needs to be flawless. We build stunning native and cross-platform applications that offer fluid micro-interactions, robust offline capabilities, and seamless API integrations. Our team ensures that your users enjoy a premium, intuitive experience whether they are on an iPhone or an Android device."
  },
  { 
    slug: "ai-driven-website-solutions",
    title: "AI-Driven Website Solutions", 
    desc: "Intelligent websites powered by AI for personalization, automation, and enhanced user engagement.", 
    icon: Brain, 
    features: ["AI Chatbots", "Personalization Engines", "Predictive Analytics", "Smart Recommendations", "Automated Content"],
    content: "Static websites are a thing of the past. We integrate powerful Artificial Intelligence directly into your digital platforms. From personalized product recommendations that adapt to user behavior in real-time, to sophisticated AI chatbots that handle customer support 24/7, we build intelligent systems that work tirelessly to grow your business."
  },
  { 
    slug: "digital-marketing",
    title: "Digital Marketing", 
    desc: "Comprehensive digital marketing strategies that drive traffic, engagement, and conversions.", 
    icon: TrendingUp, 
    features: ["SEO & SEM", "Content Marketing", "Email Campaigns", "Analytics & Reporting", "Conversion Optimization"],
    content: "Visibility is nothing without conversion. Our digital marketing strategies are completely data-driven. We analyze user behavior, optimize sales funnels, and deploy high-converting campaigns across all digital channels to ensure every dollar you spend delivers a massive return on investment."
  },
  { 
    slug: "social-media-marketing",
    title: "Social Media Marketing", 
    desc: "Strategic social media management and advertising to build your brand and engage your audience.", 
    icon: Share2, 
    features: ["Content Strategy", "Community Management", "Paid Advertising", "Influencer Marketing", "Performance Analytics"],
    content: "We transform your social media channels into powerful engines for brand loyalty and customer acquisition. By combining creative, viral-worthy content with highly targeted paid advertising, we ensure your brand dominates the social conversation and stays top-of-mind for your target demographic."
  },
  { 
    slug: "talent-acquisition",
    title: "Talent Acquisition & Management", 
    desc: "Find, attract, and retain top talent with our comprehensive recruitment and HR management solutions.", 
    icon: Users, 
    features: ["Recruitment Strategy", "Candidate Sourcing", "Interview Process", "Onboarding", "Retention Programs"],
    content: "A great company requires great people. We leverage our extensive digital networks and modern HR technologies to source, vet, and onboard elite talent for your organization. From defining the perfect candidate profile to ensuring long-term retention, we handle the entire human capital pipeline."
  },
  { 
    slug: "online-events",
    title: "Online Events", 
    desc: "End-to-end planning and execution of virtual events, webinars, and digital conferences.", 
    icon: Calendar, 
    features: ["Event Platform Setup", "Registration Management", "Live Streaming", "Engagement Tools", "Post-Event Analytics"],
    content: "Digital events require flawless execution and high production value to keep audiences engaged. We provide end-to-end management for webinars, virtual conferences, and live streams, ensuring broadcast-quality video, interactive audience tools, and seamless platform stability."
  },
  { 
    slug: "brand-management",
    title: "Brand Collaboration & Management", 
    desc: "Strategic brand partnerships and comprehensive brand management to amplify your market presence.", 
    icon: Users, 
    features: ["Partnership Strategy", "Brand Guidelines", "Reputation Management", "Collaboration Campaigns", "Brand Monitoring"],
    content: "Your brand is your most valuable asset. We craft comprehensive brand identities, establish stringent visual guidelines, and forge strategic partnerships that elevate your market positioning. We ensure that every touchpoint—from your website to your social media—screams premium quality."
  },
  { 
    slug: "video-editing",
    title: "Video Editing", 
    desc: "Professional video production and editing services for marketing, social media, and corporate content.", 
    icon: Video, 
    features: ["Commercial Videos", "Social Media Content", "Motion Graphics", "Color Grading", "Audio Enhancement"],
    content: "Video is the undisputed king of modern content. Our post-production team delivers cinematic quality editing, stunning motion graphics, and retention-focused pacing that guarantees your audience stops scrolling and starts watching. We turn raw footage into compelling visual narratives."
  },
  { 
    slug: "thumbnail-generation",
    title: "Thumbnail Generation", 
    desc: "Eye-catching thumbnails designed to maximize click-through rates for your video content.", 
    icon: ImageIcon, 
    features: ["Custom Designs", "A/B Testing", "Brand Consistency", "Platform Optimization", "Fast Turnaround"],
    content: "If they don't click, they don't watch. We design highly-optimized, psychologically-driven thumbnails specifically tailored to beat social media algorithms. Through rigorous A/B testing and vibrant visual design, we maximize your Click-Through Rates (CTR) and supercharge your channel growth."
  },
  { 
    slug: "website-refurbishment",
    title: "Website Refurbishment", 
    desc: "Modernize and optimize your existing website for better performance, design, and user experience.", 
    icon: RefreshCw, 
    features: ["UI/UX Redesign", "Performance Optimization", "Mobile Optimization", "Content Migration", "SEO Enhancement"],
    content: "Is your current website holding you back? We completely overhaul legacy systems, breathing new life into outdated designs. We modernize your UI/UX, strip out bloated code to achieve sub-second load times, and seamlessly migrate your content to powerful modern architectures."
  },
  { 
    slug: "google-marketplace",
    title: "Google Marketplace", 
    desc: "Complete setup and optimization of your presence on Google Marketplace for maximum visibility.", 
    icon: Store, 
    features: ["Account Setup", "Product Listings", "Optimization", "Review Management", "Performance Tracking"],
    content: "Dominate Google's shopping and marketplace ecosystems. We handle the entire technical setup, optimize your product data feeds for maximum search visibility, and implement aggressive bidding strategies to ensure your products appear exactly when high-intent buyers are searching."
  },
  { 
    slug: "google-business",
    title: "Google Business", 
    desc: "Optimize your Google Business Profile to improve local search visibility and attract more customers.", 
    icon: MapPin, 
    features: ["Profile Optimization", "Review Management", "Post Management", "Insights Analysis", "Local SEO"],
    content: "Local SEO is a goldmine for brick-and-mortar and service businesses. We heavily optimize your Google Business Profile, manage your reputation through systematic review generation, and ensure your business ranks at the very top of the coveted Google 'Local Pack'."
  },
  { 
    slug: "meta-ad-management",
    title: "Meta Ad Management", 
    desc: "Strategic Facebook and Instagram advertising campaigns that deliver measurable ROI.", 
    icon: Target, 
    features: ["Campaign Strategy", "Ad Creative", "Audience Targeting", "Budget Optimization", "Performance Reporting"],
    content: "Stop wasting money on ineffective ads. Our Meta Ad specialists deploy advanced pixel tracking, hyper-specific audience targeting, and relentless creative testing to drive your Cost Per Acquisition (CPA) down while scaling your revenue to unprecedented heights."
  },
  { 
    slug: "google-ai-studio",
    title: "Google AI Studio", 
    desc: "Leverage Google AI technologies to build intelligent applications and automated workflows.", 
    icon: Bot, 
    features: ["AI Model Integration", "Natural Language Processing", "Computer Vision", "Predictive Models", "Custom AI Solutions"],
    content: "We harness the raw power of Google's state-of-the-art AI models (like Gemini) to build bespoke enterprise solutions. From processing massive datasets to creating custom generative AI tools for your internal teams, we put the world's most advanced technology to work for your business."
  },
  { 
    slug: "sem",
    title: "SEM", 
    desc: "Comprehensive search engine marketing strategies including PPC campaigns and search advertising.", 
    icon: Search, 
    features: ["Google Ads Management", "Keyword Research", "Ad Copywriting", "Bid Management", "Conversion Tracking"],
    content: "Capture demand exactly when it happens. Our Search Engine Marketing (SEM) campaigns are ruthlessly optimized for intent. We conduct exhaustive keyword research, write compelling ad copy, and utilize machine-learning bid strategies to ensure you capture high-quality leads at the lowest possible cost."
  },
  { 
    slug: "geo",
    title: "GEO", 
    desc: "Optimize your content for AI-powered search engines and generative AI platforms.", 
    icon: Globe, 
    features: ["Content Optimization", "AI Platform Strategy", "Structured Data", "Entity Optimization", "Visibility Enhancement"],
    content: "Generative Engine Optimization (GEO) is the future of search. As AI tools like ChatGPT and Google's AI Overviews change how people find information, we optimize your digital presence to ensure your brand is the primary source cited by these powerful generative engines."
  },
  { 
    slug: "aeo",
    title: "AEO", 
    desc: "Optimize your content to appear in featured snippets, voice search, and answer boxes.", 
    icon: Mic, 
    features: ["Featured Snippet Optimization", "Voice Search Strategy", "FAQ Schema", "Question-Based Content", "Rich Results"],
    content: "Answer Engine Optimization (AEO) ensures you capture 'Position Zero'. We restructure your content with advanced schema markup and question-based formatting so that voice assistants (Siri, Alexa) and search engines explicitly use your brand's answers for direct user queries."
  }
]
