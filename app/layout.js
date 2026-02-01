import { Inter, JetBrains_Mono } from "next/font/google";


import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });
const mono = JetBrains_Mono({ subsets: ["latin"] });
const geistSans = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CourseForge AI - AI-Powered Course Creation Platform",
  description: "Transform your educational ideas into comprehensive courses with AI. Create personalized learning experiences, interactive content, and engaging curriculum with our intelligent course generator.",
  keywords: "AI course creation, online learning, educational technology, course generator, e-learning platform",
  authors: [{ name: "CourseForge Team" }],
  creator: "CourseForge AI",
  publisher: "CourseForge AI",
  openGraph: {
    title: "CourseForge AI - Create Amazing Courses with AI",
    description: "Build personalized learning experiences with our AI-powered course creation platform",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CourseForge AI - AI Course Creation",
    description: "Transform your educational ideas into comprehensive courses with AI",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
   <html lang="en" className={inter.className}>
      <head>
        <meta name="theme-color" content="#15b989" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CourseForge AI" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-gray-900 selection:bg-[#15b989]/20 selection:text-[#15b989]`}
        suppressHydrationWarning={true}
      >
        <ClerkProvider
          appearance={{
            baseTheme: undefined,
            elements: {
              formButtonPrimary: 
                "bg-gradient-to-r from-[#15b989] to-[#0ead7a] hover:from-[#0ead7a] hover:to-[#129e74] text-white",
              socialButtonsBlockButton: 
                "border-gray-200 hover:bg-gray-50",
              socialButtonsBlockButtonText: 
                "text-gray-700",
              formFieldInput: 
                "border-gray-300 focus:border-[#15b989] focus:ring-[#15b989]/20",
              footerActionLink: 
                "text-[#15b989] hover:text-[#0ead7a]",
            },
          }}
        >
          <GoogleOneTap />
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
