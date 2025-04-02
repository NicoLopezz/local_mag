import type { AppProps } from "next/app";
import { Main_Layout } from "../components/main/Main_Layout";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { SearchProvider } from "../context/Search_Context";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SearchProvider>
      <Main_Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Main_Layout>
    </SearchProvider>
  );
}

export default MyApp;
