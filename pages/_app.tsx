import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ApolloProvider } from '@apollo/client';
import { Router, useRouter } from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { AuthProvider } from '@utils/authContext';
import { useApollo } from '@graphql/apollo';
import ClientOnly from 'src/components/ClientOnly';
import PageLoader from 'src/components/PageLoader';
import theme from '../src/style-system/theme';
import '../src/style-system/global.css';
import createEmotionCache from 'src/createEmotionCache';
import { getMe } from '@http/auth';
import Script from 'next/script';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export interface IAuthState {
  token?: string | null;
  user?: any | null;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  const [tokenBeingValidated, setTokenBeingValidated] = useState<boolean>(true);
  const [authState, setAuthState] = React.useState<IAuthState>({
    token: null,
    user: null,
  });

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
      const res = await getMe();
      const userData = res?.data?.getMe;
      setAuthState({ token, user: userData });
    } catch (error) {
      localStorage.removeItem('jwt-token');
      setAuthState({});
    } finally {
      setTokenBeingValidated(false);
    }
  };

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  /**
   * useEffect run on every route change
   * use '[' for checking the route is dynamic or not
   * if route includes a queryPrams and route is not dynamic than replace the route value.
   */
  useEffect(() => {
    if (
      Object.keys(router.query).length !== 0 &&
      !router.pathname.includes('[')
    ) {
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [router]);

  if (tokenBeingValidated) return <PageLoader />;

  return (
    <>
      <AuthProvider
        value={{
          authState,
          setAuthState: (userAuthInfo: IAuthState) =>
            setAuthState(userAuthInfo),
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
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
         (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");`,
        }}
      />
    </>
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
