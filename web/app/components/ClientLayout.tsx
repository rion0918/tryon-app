// web/app/components/ClientLayout.tsx
'use client';

import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}