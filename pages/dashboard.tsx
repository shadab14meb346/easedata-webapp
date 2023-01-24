import type { NextPage } from 'next';
import Head from 'next/head';

import TopAppBar from '@components/TopAppBar';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Welcome to the dashboard</h1>
    </>
  );
};

export default Home;
