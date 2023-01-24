import { useRouter } from 'next/router';

import useAuth from './useAuth';
import { useReactiveUtilsState } from 'store/utils';
import * as ROUTES from 'src/constants/routes';

const WithAuth = (Component: any) => {
  const Auth = (props: any = {}) => {
    const { authState } = useAuth();
    const isAuthenticated = !!authState?.token;

    const { redirectAfterSignInUrl } = useReactiveUtilsState();

    const router = useRouter();

    // this is used for pages like login
    // we should not let user visit login page if he is logged in
    const { isRestricted } = props;

    if (isRestricted && redirectAfterSignInUrl) {
      router.push(redirectAfterSignInUrl);
      return null;
    }

    return <Component {...props} />;
  };
  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  if (Component.getLayout) {
    Auth.getLayout = Component.getLayout;
  }
  return Auth;
};

export default WithAuth;
