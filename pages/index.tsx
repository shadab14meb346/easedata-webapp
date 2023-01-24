import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          NextJS starter template with MUI, TS, Apollo GraphQL Client
        </title>
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography marginTop={6} variant="h3">
          Welcome to the NextJS starter template with the following technologies
        </Typography>
        <Box>
          <p>Material UI</p>
          <p>Material UI Icons</p>
          <p>Apollo Graphql Client Setup</p>
          <p>TypeScript</p>
          <p>
            Global state management with Apollo <code>makeVar</code> and{' '}
            <code>useReactiveVar</code>
          </p>
        </Box>
        <Link href={'/data-fetch-demo'}>Client side data fetching demo</Link>
        <Link href={'/global-state-management-using-apollo'}>
          Global state management demo
        </Link>
      </Box>
    </>
  );
};

export default Home;
