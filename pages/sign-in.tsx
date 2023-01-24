import type { NextPage } from 'next';
import Head from 'next/head';

import SignInForm from '@components/SignInForm';
import FullLogo from '@components/common/FullLogo';

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

export default SignIn;
