import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio & Client Work | ImaginarsClubServices',
  description: 'Delivering measurable growth through technology, creativity, and AI. Explore our portfolio of successful projects.',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
