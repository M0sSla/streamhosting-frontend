import { GeistSans } from 'geist/font/sans'
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { ApolloClientProvider } from "@/providers/ApolloClientProvider";
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ToastProvider } from '@/providers/ToastProvider';


import '@/styles/globals.css'
import '@/styles/themes.css'
import { ColorSwitcher } from '@/components/ui/elements/ColorSwitcher';
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME } from '@/libs/constants/seo.constants';
import { APP_URL } from '@/libs/constants/url.constants';


export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  applicationName: SITE_NAME,
  authors: [
    {
      name: 'M0sSla',
      url: new URL('https://github.com/M0sSla')
    }
  ],
  keywords: SITE_KEYWORDS,
  generator: 'Next.js',
  creator: 'M0sSla',
  publisher: 'M0sSla',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/touch-icons/256x256.png',
    other: {
      rel: 'touch-icons',
      url: '/touch-icons/256x256.png',
      sizes: '256x256',
      type: 'image/png'
    }
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: 'website',
    emails: ['mossla@Inbox.ru'],
    locale: 'ru-RU',
    images: [
      {
        url: '/touch-icons/512x512.png',
        width: 512,
        height: 512,
        alt: `${SITE_NAME} Logo`
      }
    ],
    url: new URL(APP_URL)
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={GeistSans.variable}>
          <ColorSwitcher/>
          <ApolloClientProvider>
            <NextIntlClientProvider messages={messages}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                disableTransitionOnChange
              >
                <ToastProvider/>
                {children}
              </ThemeProvider>
            </NextIntlClientProvider>
          </ApolloClientProvider>
      </body>
    </html>
  );
}
