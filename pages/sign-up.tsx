import type { NextPage } from 'next';
import Head from 'next/head';

import FullLogo from '@components/common/FullLogo';
import SignUpForm from '@components/SignUpForm';

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <title>Landing page EaseData</title>
      </Head>
      <FullLogo />
      <SignUpForm />
    </>
  );
};

export default SignIn;
