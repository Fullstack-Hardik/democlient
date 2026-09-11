import type { Metadata } from 'next';
import './globals.css';

import ClickSpark from '@/components/ui/ClickSpark';
import SmoothScroll from '@/components/ui/SmoothScroll';

export const metadata: Metadata = {
  title: 'HRDK | Fullstack Developer & Digital Product Designer',
  description: 'Portfolio of HRDK, a digital product designer and full-stack developer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="motion-pending">
      <body className="bg-black text-white antialiased overflow-x-hidden">
        <SmoothScroll>
          <ClickSpark
            sparkColor='#fff'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            {children}
          </ClickSpark>
        </SmoothScroll>
      </body>
    </html>
  );
}
