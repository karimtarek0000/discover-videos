import { ReactComponentElement } from "react";

export type HeaderProps = {
  title: string;
  subTitle: string;
  imgUrl: string;
  type?: string;
};

export type CardProps = {
  type?: "small" | "medium" | "large";
  imgUrl: string;
};

export type SectionCardProps = {
  head: string;
  items: any;
  children: ReactComponentElement<any>;
};
