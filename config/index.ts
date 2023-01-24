const EXAMPLE_GRAPHQL_ENDPOINT = 'https://countries.trevorblades.com/graphql';
const GRAPHQL_STAGING_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_STAGING_ENDPOINT || EXAMPLE_GRAPHQL_ENDPOINT;

const config = {
  GRAPHQL_ENDPOINT: GRAPHQL_STAGING_ENDPOINT,
};

export default config;
