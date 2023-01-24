import type { NextPage } from 'next';
import Head from 'next/head';

import TopAppBar from '@components/TopAppBar';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Landing page EaseData</title>
      </Head>
      <TopAppBar />
    </>
  );
};

export default Home;
