'use client'

import * as React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { client } from '@/lib/apollo-client'

export function Providers({
  children,
}: React.PropsWithChildren) {
  return (
    <ApolloProvider client={client}>
      <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={true}>
        {children}
      </NextThemesProvider>
    </ApolloProvider>
  )
}