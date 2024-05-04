'use client';

import { useSession } from 'next-auth/react';
import React, { ReactNode, useMemo } from 'react';
import { Provider as UrqlProvider, cacheExchange, createClient, fetchExchange } from 'urql';

const GraphqlProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const session = useSession();

  const client = useMemo(
    () =>
      createClient({
        url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        fetchOptions: () => {
          const token = session.data?.accessToken;
          return {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          };
        },
        exchanges: [cacheExchange, fetchExchange],
      }),
    [session],
  );

  return <UrqlProvider value={client}>{children}</UrqlProvider>;
};

export default GraphqlProvider;
