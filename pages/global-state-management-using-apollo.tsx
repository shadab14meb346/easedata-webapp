import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import type { NextPage } from 'next';
import Head from 'next/head';

import GlobalStateManagementComponents from '@components/GlobalStateManagementComponents';

const GlobalStatementManagement: NextPage = () => {
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
          This page will demo how to do global state management using
          @apollo/client makeVar and useReactiveVar. Just type in the input
          filed and the display text is coming using a global state
        </Typography>
        <GlobalStateManagementComponents />
      </Box>
    </>
  );
};

export default GlobalStatementManagement;
