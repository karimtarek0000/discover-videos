import { MouseEventHandler, useEffect, useState } from "react";
import RenderSVG from "../shared/RenderSVG";
import Style from "./style.module.css";

const { addToListBtn } = Style;

const AddToList = ({ videoId }: { videoId: string }): JSX.Element => {
  const [toggleAddToList, setToggleAddToList] = useState<boolean>(false);

  const toggleHandler: MouseEventHandler = () => setToggleAddToList((prev: boolean) => !prev);

  useEffect(() => {
    (async () => {
      await fetch("/api/stats", {
        method: "POST",
        body: JSON.stringify({
          videoId,
          favorited: +toggleAddToList,
          watched: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    })();
  }, [toggleAddToList, videoId]);

  return (
    <button onClick={toggleHandler} className={addToListBtn}>
      <RenderSVG name={toggleAddToList ? "like-fill" : "like-none"} />
    </button>
  );
};

export default AddToList;
