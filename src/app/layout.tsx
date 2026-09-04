import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VedaRoots — Pure Indian Organic Foods',
  description:
    'VedaRoots brings you premium, traditionally processed Indian organic foods — from cold-pressed oils and desi ghee to ancient grains and superfoods. Pure ingredients, powerful nutrition.',
  keywords: 'organic food india, desi ghee, cold pressed oil, khapli atta, high protein atta, millet, superfoods, organic',
  openGraph: {
    title: 'VedaRoots — Pure Indian Organic Foods',
    description: 'Premium traditionally processed Indian organic foods. Pure ingredients, powerful nutrition.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-cream-50 text-brand-900 font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
