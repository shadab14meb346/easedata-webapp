import Head from 'next/head';

const InternalServer = () => {
  return (
    <>
      <Head>
        <title>An Error Ocurred</title>
      </Head>
      <h1>It's us not you</h1>
      <p>Internal server error</p>
    </>
  );
};

export default InternalServer;
