import Head from 'next/head';

import WithAuth from '@utils/withAuth';
import SidebarLayout from 'src/layouts/SidebarLayout';
import DataSources from '@components/Dashboard/DataSources';

const AddDataSources = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DataSources />
    </>
  );
};
AddDataSources.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;
export default WithAuth(AddDataSources);
