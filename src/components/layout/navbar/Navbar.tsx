import Logo from "@/components/shared/logo/Logo";
import Link from "next/link";
import DropDown from "../dropdown/DropDown";
import Style from "./navbar.module.css";

const { navbar, navbarWrapper, links, button } = Style;

const Navbar = (): JSX.Element => {
  return (
    <nav className={navbar}>
      <div className={navbarWrapper}>
        <Logo classNames="lg:me-[12.5rem]" />

        <div className={links}>
          <Link href="/">Home</Link>
          <Link href="/">My list</Link>
        </div>

        {/* <button className={button}>Sign up</button> */}
        <DropDown />
      </div>
    </nav>
  );
};

export default Navbar;
