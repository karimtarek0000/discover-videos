import Router from "next/router";
import Style from "../../styles/video.module.css";
import RenderSVG from "./RenderSVG";

const BackBtn = (): JSX.Element => {
  return (
    <button onClick={() => Router.back()} className={Style.btnBack}>
      <RenderSVG name="back" size="1.5rem" />
    </button>
  );
};

export default BackBtn;
