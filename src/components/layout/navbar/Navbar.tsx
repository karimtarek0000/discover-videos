import Image from "next/image";
import Link from "next/link";
import Style from "./navbar.module.css";
import DropDown from "../dropdown/DropDown";

const { navbar, navbarWrapper, links, button } = Style;

const Navbar = (): JSX.Element => {
  return (
    <nav className={navbar}>
      <div className={navbarWrapper}>
        <Link href="/" className="lg:me-[12.5rem]">
          <Image
            src="/images/netflix.svg"
            alt="logo"
            width={0}
            height={0}
            className="w-[6.25rem] md:w-[9.375rem]"
          />
        </Link>

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
