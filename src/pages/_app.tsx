import "@/styles/globals.css";
import { LazyMotion, domAnimation } from "framer-motion";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-roboto" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <LazyMotion features={domAnimation}>
        <Component {...pageProps} />
      </LazyMotion>
    </>
  );
}
