import Head from 'next/head';

import WithAuth from '@utils/withAuth';
import SidebarLayout from 'src/layouts/SidebarLayout';
import ScheduleQuery from '@components/Dashboard/ScheduleQuery';

const ScheduleQueryPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <ScheduleQuery />
    </>
  );
};
ScheduleQueryPage.getLayout = (page: any) => (
  <SidebarLayout>{page}</SidebarLayout>
);
export default WithAuth(ScheduleQueryPage);
