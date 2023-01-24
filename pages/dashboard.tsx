import type { NextPage } from 'next';
import Head from 'next/head';

import WithAuth from '@utils/withAuth';

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Welcome to the dashboard</h1>
    </>
  );
};

export default WithAuth(Dashboard);
