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
        <title>Nani Terania | hernanosaurus | Keyboard for Hire</title>
        <meta
          name="description"
          content="Nani Terania (hernanosaurus) – Frontend Engineer creating clean, modern, and accessible web experiences."
        />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="canonical" href="https://hernanosaurus.dev/" />
        <meta name="author" content="Nani Terania" />
        <meta
          name="keywords"
          content="Nani Terania, hernanosaurus, Frontend Engineer, Frontend Developer, Portfolio, React, TypeScript, JavaScript, Web Development, UI, UX, Tailwind"
        />
        <meta property="og:title" content="Nani Terania | hernanosaurus | Keyboard for Hire" />
        <meta
          property="og:description"
          content="Nani Terania (hernanosaurus) – Frontend Engineer creating clean, modern, and accessible web experiences."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hernanosaurus.dev/" />
        <meta property="og:image" content="https://hernanosaurus.dev/og-image.png" />
        <meta property="og:image:width" content="2416" />
        <meta property="og:image:height" content="1276" />
        <meta property="og:image:alt" content="Nani Terania - Frontend Engineer Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nani Terania | hernanosaurus | Keyboard for Hire" />
        <meta
          name="twitter:description"
          content="Nani Terania (hernanosaurus) – Frontend Engineer creating clean, modern, and accessible web experiences."
        />
        <meta name="twitter:image" content="https://hernanosaurus.dev/og-image.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Nani Terania',
              alternateName: 'hernanosaurus',
              url: 'https://hernanosaurus.dev/',
              logo: 'https://hernanosaurus.dev/favicon.svg',
              image: 'https://hernanosaurus.dev/og-image.png',
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
