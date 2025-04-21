import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Main_Layout } from "../components/main/Main_Layout";
import { SearchProvider } from "../context/Search_Context";
import { TransactionsProvider } from "@/context/Transacciones_Context";
import { PedidosProvider } from "@/context/Pedidos_Contex";
import { ToastProvider } from "@/context/Toast_Context";

import styled from "styled-components";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [routeKey, setRouteKey] = useState(router.route);

  useEffect(() => {
    setRouteKey(router.route);
  }, [router.route]);

  return (
    <SearchProvider>
      <TransactionsProvider>
      <PedidosProvider>
        <ToastProvider>
          <Main_Layout>
            <FadeWrapper key={routeKey}>
              <Component {...pageProps} />
            </FadeWrapper>
          </Main_Layout>
        </ToastProvider>
      </PedidosProvider>
      </TransactionsProvider>
    </SearchProvider>
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
