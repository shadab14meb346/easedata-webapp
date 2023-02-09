import Head from 'next/head';

import WithAuth from '@utils/withAuth';
import SidebarLayout from 'src/layouts/SidebarLayout';
import AvailableDataSources from '@components/Dashboard/AvailableDataSources';

const DataSources = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <AvailableDataSources />
    </>
  );
};
DataSources.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;
export default WithAuth(DataSources);
