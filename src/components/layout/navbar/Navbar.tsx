import Image from "next/image";
import Link from "next/link";
import Style from "./navbar.module.css";

const { navbar, navbarWrapper, links, button } = Style;

const Navbar = (): JSX.Element => {
  return (
    <nav className={navbar}>
      <div className={navbarWrapper}>
        <div className="lg:me-[12.5rem]">
          <Image src="/images/netflix.svg" alt="logo" width="150" height="50" />
        </div>

        <div className={links}>
          <Link href="/">Home</Link>
          <Link href="/">My list</Link>
        </div>

        <button className={button}>Sign up</button>
      </div>
    </nav>
  );
};

export default Navbar;
