import type { NextPage } from 'next';
import Head from 'next/head';

import FullLogo from '@components/common/FullLogo';
import SignUpForm from '@components/SignUpForm';
import WithAuth from '@utils/withAuth';

const SignUp: NextPage = () => {
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
SignUp.getInitialProps = () => {
  return { isRestricted: true };
};

export default WithAuth(SignUp);
