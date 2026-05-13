import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SessionWrapper from '@/components/SessionWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Get Me A Chai - Fund your projects with Chai',
  description: 'This Website is a crwod funding platoform for Developers',
};

export default function RootLayout({ children }) {
  return (
    // main layout of the app, contains the navbar and footer and main content.
    // also wraps everything in the session provider to allow use of next auth in the app directory since that is a server component by default.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-dotted min-h-screen text-white">
        <SessionWrapper>
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
