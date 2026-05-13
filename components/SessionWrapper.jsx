'use client';
import { SessionProvider } from 'next-auth/react';

// allows use of client component in the app directory since that is a server component by default.
export default function SessionWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
