import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ApolloProvider } from '@apollo/client';
import { Router, useRouter } from 'next/router';

import { AuthProvider } from '@utils/authContext';
import { useApollo } from '@graphql/apollo';
import ClientOnly from 'src/components/ClientOnly';
import PageLoader from 'src/components/PageLoader';
// import { getUser } from '@graphql/queries/user';
import theme from '../src/style-system/theme';
import '../src/style-system/global.css';
import createEmotionCache from 'src/createEmotionCache';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

interface IAuthState {
  token?: String;
  user?: any;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenBeingValidated, setTokenBeingValidated] = useState<boolean>(true);

  // === auth
  const [authState, setAuthState] = React.useState<IAuthState>({
    token: '',
  });
  const setUserAuthInfo = (data: IAuthState) => {
    setAuthState(data);
  };
  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    return !!authState?.token;
  };
  // ========

  useEffect(() => {
    checkForTokenValidation();
  }, []);

  const checkForTokenValidation = async () => {
    const token = localStorage.getItem('jwt-token');
    if (!token) {
      setTokenBeingValidated(false);
      return;
    }
    try {
      // const res = await getUser();
      // const userData = res?.data?.getMe;
      const userData = {};
      setAuthState({ token, user: userData });
    } catch (error) {
      // error
      localStorage.removeItem('jwt-token');
      setAuthState({});
    } finally {
      setTokenBeingValidated(false);
    }
  };

  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  });

  Router.events.on('routeChangeComplete', () => {
    setLoading(false);
  });

  Router.events.on('routeChangeError', () => {
    setLoading(false);
  });

  /**
   * useEffect run on every route change
   * use '[' for checking the route is dynamic or not
   * if route includes a queryPrams and route is not dynmaic than replace the route value.
   */
  useEffect(() => {
    if (
      Object.keys(router.query).length !== 0 &&
      !router.pathname.includes('[')
    ) {
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [router]);

  if (loading || tokenBeingValidated) return <PageLoader />;

  return (
    <AuthProvider
      value={{
        authState,
        setAuthState: (userAuthInfo: IAuthState) =>
          setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      <ApolloProvider client={apolloClient}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ClientOnly>
              <Layout Component={Component} pageProps={pageProps} />
            </ClientOnly>
          </ThemeProvider>
        </CacheProvider>
      </ApolloProvider>
    </AuthProvider>
  );
};

const Layout = ({ Component, pageProps }: any) => {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  } else {
    return <Component {...pageProps} />;
  }
};
export default MyApp;
