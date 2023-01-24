import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import config from '../config';

const httpLink = createHttpLink({
  uri: `${config.GRAPHQL_ENDPOINT}`,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHORIZED_RESOURCE': {
          // redirect to 404;
          window.location.href = `${window.location.origin}`;
          return;
        }
        case '500': {
          window.location.href = `${window.location.origin}/500`;
          return;
        }
      }
    }
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    typeof window === 'undefined' ? '' : localStorage.getItem('jwt-token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
  link: authLink.concat(errorLink).concat(httpLink),
});

function createApolloClient() {
  return client;
}

export { client, createApolloClient };
