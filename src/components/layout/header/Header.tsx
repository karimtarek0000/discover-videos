import RenderSVG from "@/components/shared/RenderSVG";
import { HeaderProps } from "@/types";
import Image from "next/image";
import Style from "./header.module.css";
import { MouseEventHandler } from "react";
import { useRouter } from "next/router";

const { header, image, info, infoWrapper, titleInfo, subTitleInfo, button } = Style;

const Header = (props: HeaderProps): JSX.Element => {
  const router = useRouter();
  const { title = "image", subTitle, type = "series", imgUrl, videoId } = props;

  const playHandler: MouseEventHandler = (): void => {
    router.push(`/video/${videoId}`);
  };

  return (
    <header className={header}>
      <Image
        className={image}
        src={imgUrl}
        alt={title}
        width={0}
        height={0}
        sizes="(min-width:1024px) 100vw, 70vw"
        priority={true}
        style={{ width: "100%", height: "100%" }}
      />

      <div className={info}>
        <div className={infoWrapper}>
          <div className="flex items-center gap-x-2">
            <span className="text-red-500 text-50">N</span>
            <span className="text-white ">{type === "series" ? "S E R I E S" : "M O V I E S"}</span>
          </div>
          <h1 className={titleInfo}>{title}</h1>
          <p className={subTitleInfo}>{subTitle}</p>
          <button onClick={playHandler} className={button}>
            <RenderSVG name="play" size="1.2rem" />
            Play
          </button>
        </div>
      </div>

      <div className="overlay" />
    </header>
  );
};

export default Header;
