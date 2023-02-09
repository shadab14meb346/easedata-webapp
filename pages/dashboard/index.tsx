import Head from 'next/head';

import WithAuth from '@utils/withAuth';
import SidebarLayout from 'src/layouts/SidebarLayout';
import LoggedInHome from '@components/LoggedInHome';

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <LoggedInHome />
    </>
  );
};

DashboardPage.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;
export default WithAuth(DashboardPage);
