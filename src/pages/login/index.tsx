import Image from "next/image";
import Style from "../../styles/login.module.css";
import Logo from "@/components/shared/logo/Logo";
import Head from "next/head";

const { formWrapper, title, inputWrapper, loginBtn } = Style;

const Login = (): JSX.Element => {
  return (
    <main className="relative ">
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
            <input
              autoComplete="off"
              autoFocus
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <button className={loginBtn}>Sign in</button>
        </form>
      </div>
    </main>
  );
};

export default Login;
