import { useMemo } from 'react';
import { createApolloClient } from './index';
let globalApolloclient;

export function initializeApollo(initialState = null) {
  const apolloClient = globalApolloclient ?? createApolloClient();
  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = apolloClient.extract();
    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) globalApolloclient = apolloClient;
  return apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
