'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();

  if (session.status === 'unauthenticated') {
    return <button onClick={() => signIn('cognito')}>Sign in</button>;
  }

  if (session.status === 'loading') {
    return <div>...loading</div>;
  }

  return <button onClick={() => signOut()}>Sign out</button>;
}
