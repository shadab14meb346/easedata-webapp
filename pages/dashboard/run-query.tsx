import Head from 'next/head';

import WithAuth from '@utils/withAuth';
import SidebarLayout from 'src/layouts/SidebarLayout';
import RunQueries from '@components/Dashboard/RunQueries';

const RunQuery = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <RunQueries />
    </>
  );
};
RunQuery.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;
export default WithAuth(RunQuery);
