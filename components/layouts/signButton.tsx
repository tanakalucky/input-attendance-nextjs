'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function SignButton() {
  const session = useSession();

  if (session.status === 'unauthenticated') {
    return <Button onClick={() => signIn('cognito')}>Sign in</Button>;
  }

  if (session.status === 'loading') {
    return (
      <Button disabled>
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        Loading...
      </Button>
    );
  }

  return <Button onClick={() => signOut()}>Sign out</Button>;
}
