import Head from 'next/head';
import { QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import type { NextComponentType } from 'next';

import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from '../styles/globals';
import Theme from '../styles/theme';

import { queryClient } from '../services/queryClient';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <ToastContainer />
        <Head>
          <title>Pata e Palma</title>
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>,
  );
};

export default MyApp;
