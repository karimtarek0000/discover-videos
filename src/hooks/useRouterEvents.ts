import router from "next/router";
import { useEffect, useState } from "react";

const useRouterEvents = ({ status = false }: { status?: boolean } = {}) => {
  const [loading, setLoading] = useState<boolean>(status);

  useEffect(() => {
    const handleRouteChange = () => setLoading(false);

    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("routeChangeError", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("routeChangeError", handleRouteChange);
    };
  }, []);

  return { loading, setLoading };
};

export default useRouterEvents;
