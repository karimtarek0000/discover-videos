import { MouseEventHandler, useState } from "react";
import RenderSVG from "../shared/RenderSVG";
import Style from "./style.module.css";

const { addToListBtn } = Style;

const AddToList = (): JSX.Element => {
  const [toggleAddToList, setToggleAddToList] = useState<boolean>(false);

  const toggleHandler: MouseEventHandler = () => {
    setToggleAddToList((prev: boolean) => !prev);
  };

  return (
    <button onClick={toggleHandler} className={addToListBtn}>
      <RenderSVG name={toggleAddToList ? "like-fill" : "like-none"} />
    </button>
  );
};

export default AddToList;
