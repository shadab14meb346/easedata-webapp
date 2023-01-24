import type { NextPage } from 'next';
import Head from 'next/head';

import SignInForm from '@components/SignInForm';
import FullLogo from '@components/common/FullLogo';
import WithAuth from '@utils/withAuth';

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <title>Landing page EaseData</title>
      </Head>
      <FullLogo />
      <SignInForm />
    </>
  );
};

SignIn.getInitialProps = () => {
  return { isRestricted: true };
};

export default WithAuth(SignIn);
