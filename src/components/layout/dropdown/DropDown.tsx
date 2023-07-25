import Link from "next/link";
import { useState } from "react";
import Style from "./dropdown.module.css";
import RenderSVG from "@/components/shared/RenderSVG";

const { dropdown, dropdownList } = Style;

const DropDown = (): JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(false);

  const toggleHandler = () => setToggle(!toggle);

  return (
    <div className={dropdown}>
      <button className="flex items-center gap-x-2" onClick={toggleHandler}>
        karim@gmail.com
        <RenderSVG name="arrow-down" size="0.8rem" />
      </button>

      {toggle && (
        <div className={dropdownList}>
          <RenderSVG name="logout" size="1rem" />
          <Link href="/logout">Logout</Link>
        </div>
      )}
    </div>
  );
};

export default DropDown;
