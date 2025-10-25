import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nani | Keyboard for Hire',
  description:
    'Frontend developer portfolio for Nani - Keyboard for Hire. Projects, skills, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta property="og:title" content="Nani | Keyboard for Hire" />
        <meta
          property="og:description"
          content="Frontend developer portfolio for Nani - Keyboard for Hire. Projects, skills, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nani | Keyboard for Hire" />
        <meta
          name="twitter:description"
          content="Frontend developer portfolio for Nani - Keyboard for Hire. Projects, skills, and more."
        />
        <meta name="twitter:image" content="/og-image.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
