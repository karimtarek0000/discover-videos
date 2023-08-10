import Logo from "@/components/shared/logo/Logo";
import Link from "next/link";
import DropDown from "../dropdown/DropDown";
import Style from "./navbar.module.css";
import { useEffect, useState } from "react";
import { magic } from "@/lib/maginLinkClient";

const { navbar, navbarWrapper, links, button } = Style;

const Navbar = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const userInfo = async () => {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) setEmail(email);
      } catch (err) {
        console.log(err);
      }
    };

    userInfo();
  }, []);

  return (
    <nav className={navbar}>
      <div className={navbarWrapper}>
        <Logo classNames="lg:me-[12.5rem]" />

        <div className={links}>
          <Link href="/">Home</Link>
          <Link href="/">My list</Link>
        </div>

        {/* <button className={button}>Sign up</button> */}
        <DropDown email={email} />
      </div>
    </nav>
  );
};

export default Navbar;
