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
  description: 'Frontend Engineer creating clean, modern, and accessible web experiences.',
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
        <link rel="canonical" href="https://hernanosaurus.dev/" />
        <meta name="author" content="Nani Terania" />
        <meta
          name="keywords"
          content="Frontend Engineer, Frontend Developer, Portfolio, React, TypeScript, JavaScript, Web Development, Nani, hernanosaurus, UI, UX, Tailwind, Next.js"
        />
        <meta property="og:title" content="Nani | Keyboard for Hire" />
        <meta
          property="og:description"
          content="Frontend Engineer creating clean, modern, and accessible web experiences."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hernanosaurus.dev/" />
        <meta property="og:image" content="https://hernanosaurus.dev/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nani | Keyboard for Hire" />
        <meta
          name="twitter:description"
          content="Frontend Engineer creating clean, modern, and accessible web experiences."
        />
        <meta name="twitter:image" content="https://hernanosaurus.dev/og-image.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Nani Terania',
              url: 'https://hernanosaurus.dev/',
              logo: 'https://hernanosaurus.dev/favicon.svg',
              image: 'https://hernanosaurus.dev/favicon.svg',
              jobTitle: 'Frontend Engineer',
              sameAs: [
                'https://github.com/hernanosaurus',
                'https://www.linkedin.com/in/hernan-terania/',
              ],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
