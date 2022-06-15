import '../styles/globals.css'
import { ApolloProvider } from "@apollo/client";
import client from "../services/apollo-client";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
      <ApolloProvider client={client}>
          <Head>
              <title>Ma Todo List</title>
              <link
                  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                  rel="stylesheet"
                  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                  crossOrigin="anonymous"
              />
              <link
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
                  rel="stylesheet"
              />
          </Head>
          <Component {...pageProps} />
          <Script
              id="bootstrap-cdn"
              src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          />
    </ApolloProvider>
  )
}

export default MyApp
