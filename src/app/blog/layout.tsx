import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Insights | ImaginarsClubServices',
  description: 'Deep dives into technology, design, and digital strategies from our expert team.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
