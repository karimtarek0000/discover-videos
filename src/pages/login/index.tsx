import Logo from "@/components/shared/logo/Logo";
import useRouterEvents from "@/hooks/useRouterEvents";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { magic } from "../../lib/maginLinkClient";
import Style from "../../styles/login.module.css";

const { formWrapper, title, inputWrapper, loginBtn } = Style;

const Login = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [statusEmail, setStatusEmail] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const { loading, setLoading } = useRouterEvents();

  useEffect(() => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email && regex.test(email)) {
      setStatusEmail(true);
      setErr("");
    }

    if (email && !regex.test(email)) {
      setStatusEmail(false);
      setErr("Email not a valid like | test@gmail.com");
    }

    if (email === "") {
      setStatusEmail(false);
      setErr("Email is required");
    }
  }, [email]);

  const changeEmailHandler: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const loginHandler = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      setStatusEmail(false);

      const didToken = await magic.auth.loginWithMagicLink({ email });

      if (didToken) {
        const s = await fetch("/api/login", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${didToken}`,
            "Content-Type": "application/json",
          },
        });

        router.replace("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="relative">
      <Head>
        <title>Netflix | Login</title>
      </Head>

      <div className="h-screen bg-black">
        <Image
          src="/images/signin-bg.jpeg"
          alt="login"
          width={0}
          height={0}
          sizes="(min-width:1024px) 100vw, 70vw"
          priority={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="overlay" />

      <div className={formWrapper}>
        <div className="flex justify-center my-5">
          <Logo />
        </div>

        <h1 className={title}>Sign in</h1>

        <form>
          <div className={inputWrapper}>
            <label htmlFor="email">Enter your email</label>
            <input autoComplete="off" id="email" type="email" placeholder="Enter your email" onChange={changeEmailHandler} />
            <p className="mt-2 text-center text-white">{err}</p>
          </div>

          <button onClick={loginHandler} disabled={!statusEmail} className={`flex items-center justify-center gap-x-1 ${loginBtn}`}>
            Sign in
            {loading && <span className="loader"></span>}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
