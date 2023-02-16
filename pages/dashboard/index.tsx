import Head from 'next/head';

import WithAuth from '@utils/withAuth';
import SidebarLayout from 'src/layouts/SidebarLayout';

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
    </>
  );
};

DashboardPage.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;
export default WithAuth(DashboardPage);
