import Link from "next/link";
import { useState } from "react";
import Style from "./dropdown.module.css";
import RenderSVG from "@/components/shared/RenderSVG";
import { useRouter } from "next/router";
import { magic } from "@/lib/maginLinkClient";

const { dropdown, dropdownList } = Style;

const DropDown = ({ email }: { email: string }): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  const toggleHandler = () => setToggle(!toggle);

  const logoutHandler = async () => {
    try {
      setLoading(true);
      await magic.user.logout();
      await fetch("/api/logout");
      router.replace("/login");
      setLoading(false);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div className={dropdown}>
      <button className="flex items-center gap-x-2" onClick={toggleHandler}>
        {email}
        <RenderSVG name="arrow-down" size="0.8rem" />
      </button>

      {toggle && (
        <div className={dropdownList}>
          <button onClick={logoutHandler} disabled={loading} className={`flex items-center justify-center gap-x-1`}>
            <RenderSVG name="logout" size="1rem" />
            Logout
            {loading && <span className="loader"></span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDown;
