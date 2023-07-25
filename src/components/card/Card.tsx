import Image from "next/image";
import Link from "next/link";
import Style from "./card.module.css";
import { useState } from "react";
import { CardProps } from "@/types";

const { card, cardSmall, cardMedium, cardLarge } = Style;

const Card = (props: CardProps): JSX.Element => {
  const { type = "small", imgUrl } = props;
  const [imgSrc, setImgSrc] = useState<string>(imgUrl);

  const cardStyle: any = {
    small: cardSmall,
    medium: cardMedium,
    large: cardLarge,
  };

  const errorImgHandler = (): void => setImgSrc("/images/clifford.webp");

  return (
    <Link href="/" className={`${card} ${cardStyle[type]}`}>
      <Image
        src={imgSrc}
        alt="test"
        width={0}
        height={0}
        sizes="(min-width: 64rem) 18.75rem, 6.25rem"
        style={{ objectFit: "cover", objectPosition: "center" }}
        onError={errorImgHandler}
      />
    </Link>
  );
};

export default Card;
