import type { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import { client } from "@/utils/appollo/apolloClient";
import { AuthProvider } from "@/utils/contexts/auth-context";
import { HandlerProvider } from "@/utils/contexts/handler-context";
import Layout from "@/components/Layout";

import "../styles/style.scss";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <HandlerProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
        </HandlerProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
