import RenderSVG from "@/components/shared/RenderSVG";
import { HeaderProps } from "@/types";
import Image from "next/image";
import Style from "./header.module.css";

const { header, image, info, infoWrapper, titleInfo, subTitleInfo, button } = Style;

const Header = (props: HeaderProps): JSX.Element => {
  const { title, subTitle, type = "series", imgUrl } = props;

  return (
    <header className={header}>
      <Image className={image} src={imgUrl} alt={title} width="2000" height="1334" />

      <div className={info}>
        <div className={infoWrapper}>
          <div className="flex items-center gap-x-2">
            <span className="text-red-500 text-50">N</span>
            <span className="text-white ">{type === "series" ? "S E R I E S" : "M O V I E S"}</span>
          </div>
          <h1 className={titleInfo}>{title}</h1>
          <p className={subTitleInfo}>{subTitle}</p>
          <button className={button}>
            <RenderSVG name="play" size="1.5rem" />
            Play
          </button>
        </div>
      </div>

      <div className="overlay" />
    </header>
  );
};

export default Header;
