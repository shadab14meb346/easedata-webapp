import Continents from '@components/Continents';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import type { NextPage } from 'next';
import Head from 'next/head';

const DataFetchingDemo: NextPage = () => {
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
          This page will show client side data fetching from a graphql query
        </Typography>
        <Continents load={true} />
      </Box>
    </>
  );
};

export default DataFetchingDemo;
