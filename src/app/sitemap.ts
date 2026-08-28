import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { portfolioData } from "@/data/portfolio";
import { servicesData } from "@/data/services";

const SITE_URL = "https://www.imaginarsclubservices.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.9 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioData.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes];
}