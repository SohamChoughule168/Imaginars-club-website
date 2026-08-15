import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | ImaginarsClubServices',
  description: 'Ready to transform your digital presence? Reach out to us and let\'s discuss how we can help your business grow.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
