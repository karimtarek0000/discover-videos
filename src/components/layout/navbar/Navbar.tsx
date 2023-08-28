import Logo from "@/components/shared/logo/Logo";
import { magic } from "@/lib/maginLinkClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropDown from "../dropdown/DropDown";
import Style from "./navbar.module.css";

const { navbar, navbarWrapper, links } = Style;

const Navbar = ({ classes }: { classes?: string }): JSX.Element => {
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
    <nav className={`${classes} ${navbar}`}>
      <div className={navbarWrapper}>
        <Logo classNames="lg:me-[12.5rem]" />

        <div className={links}>
          <Link href="/">Home</Link>
          <Link href="/brows/my-list">My list</Link>
        </div>

        <DropDown email={email} />
      </div>
    </nav>
  );
};

export default Navbar;
