import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql', // 必要に応じてAPIエンドポイントを変更
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
})