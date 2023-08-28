import Logo from "@/components/shared/logo/Logo";
import { magic } from "@/lib/maginLinkClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropDown from "../dropdown/DropDown";
import Style from "./navbar.module.css";
import { usePathname } from "next/navigation";

const { navbar, navbarWrapper, links } = Style;

const Navbar = ({ classes }: { classes?: string }): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const pathname = usePathname();
  const linksNav = [
    {
      name: "Home",
      href: "/home",
    },
    {
      name: "My list",
      href: "/brows/my-list",
    },
  ];

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
          {linksNav.map(({ name, href }) => {
            return (
              <Link key={name} href={href} className={href === pathname ? "text-red-500" : "text-white"}>
                {name}
              </Link>
            );
          })}
        </div>

        <DropDown email={email} />
      </div>
    </nav>
  );
};

export default Navbar;
