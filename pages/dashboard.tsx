import type { NextPage } from 'next';
import Head from 'next/head';

import WithAuth from '@utils/withAuth';
import Dashboard from '@components/Dashboard';

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Dashboard />
    </>
  );
};

export default WithAuth(DashboardPage);
