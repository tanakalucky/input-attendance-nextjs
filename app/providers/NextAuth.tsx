'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ReactNode } from 'react';

const NextAuthProvider = ({ children, session }: { children: ReactNode; session: Session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default NextAuthProvider;
