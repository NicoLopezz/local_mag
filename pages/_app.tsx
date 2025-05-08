import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Main_Layout } from "../components/main/Main_Layout";
import { SearchProvider } from "../context/Search_Context";
import { TransactionsProvider } from "@/context/Transacciones_Context";
import { EnviosProvider } from "@/context/Envios_Context";
import { PedidosProvider } from "@/context/Pedidos_Context";
import { ToastProvider } from "@/context/Toast_Context";
import { ThemeContextProvider } from "@/context/Theme_Context";
import { LanguageProvider } from "@/context/Language_Context";
import styled from "styled-components";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [routeKey, setRouteKey] = useState(router.route);

  useEffect(() => {
    setRouteKey(router.route);
  }, [router.route]);

  return (
    <LanguageProvider>
      <SearchProvider>
        <TransactionsProvider>
          <ThemeContextProvider>
            <EnviosProvider>
              <PedidosProvider>
                <ToastProvider>
                  <Main_Layout>
                    <FadeWrapper key={routeKey}>
                      <Component {...pageProps} />
                    </FadeWrapper>
                  </Main_Layout>
                </ToastProvider>
              </PedidosProvider>
            </EnviosProvider>
          </ThemeContextProvider>
        </TransactionsProvider>
      </SearchProvider>
    </LanguageProvider>
  );
}

export default MyApp;

const FadeWrapper = styled.div`
  animation: fadeIn 0.3s ease-in-out forwards;
  opacity: 0;
  transform: translateY(10px);

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
