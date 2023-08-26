import useRouterEvents from "@/hooks/useRouterEvents";
import { magic } from "@/lib/maginLinkClient";
import "@/styles/globals.css";
import { LazyMotion, domAnimation } from "framer-motion";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-roboto" });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { loading } = useRouterEvents({ status: true });

  useEffect(() => {
    (async () => {
      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (!isLoggedIn) {
          router.replace("/login");
        }
        if (isLoggedIn && router.asPath === "/login") {
          router.replace("/");
        }
      } catch (err) {
        router.replace("/login");
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="loader !w-[4.375rem] !h-[4.375rem]" />
        </div>
      ) : (
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
      )}
    </>
  );
}
