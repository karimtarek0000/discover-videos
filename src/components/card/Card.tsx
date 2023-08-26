import Image from "next/image";
import Link from "next/link";
import Style from "./card.module.css";
import { useState } from "react";
import { CardProps } from "@/types";
import { m } from "framer-motion";

const { card, cardSmall, cardMedium, cardLarge } = Style;

const Card = (props: CardProps): JSX.Element => {
  const { id: videoID, title, imgUrl, type = "small", className } = props;
  const [imgSrc, setImgSrc] = useState<string>(imgUrl as string);

  const cardStyle: any = {
    small: cardSmall,
    medium: cardMedium,
    large: cardLarge,
  };

  const errorImgHandler = (): void =>
    setImgSrc(
      "https://images.unsplash.com/photo-1585647347384-2593bc35786b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    );

  return (
    <m.div whileHover={{ scale: 1.1 }}>
      <Link href={`/video/${videoID}`} className={`${card} ${cardStyle[type]} ${className}`}>
        <Image
          src={imgSrc}
          alt={title}
          width={0}
          height={0}
          sizes="(min-width: 64rem) 18.75rem, 14rem"
          style={{ objectFit: "cover", objectPosition: "center", width: "100%", height: "100%" }}
          onError={errorImgHandler}
        />
      </Link>
    </m.div>
  );
};

export default Card;
