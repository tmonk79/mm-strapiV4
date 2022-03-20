import Head from 'next/head';

import '../styles/globals.css'
import Layout from '../components/layout/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
       <Head>
       <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/algolia-min.css"
    />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head> 
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
