import Head from 'next/head';
import { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from '../styles/globals';
import Theme from '../styles/theme';

import { queryClient } from '../services/queryClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <ToastContainer />
        <Head>
          <title>Pata e Palma</title>
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
