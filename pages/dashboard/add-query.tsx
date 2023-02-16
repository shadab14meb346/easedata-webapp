import Head from 'next/head';

import WithAuth from '@utils/withAuth';
import SidebarLayout from 'src/layouts/SidebarLayout';
import AddQuery from '@components/Dashboard/AddQuery';

const DataSources = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <AddQuery />
    </>
  );
};
DataSources.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;
export default WithAuth(DataSources);
