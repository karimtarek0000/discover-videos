import { ReactComponentElement } from "react";

export type HeaderProps = {
  title: string;
  subTitle: string;
  imgUrl: string;
  type?: string;
};

export type CardProps = {
  id: string;
  title: string;
  imgUrl: string;
  type?: "small" | "medium" | "large";
};

export type SectionCardProps = {
  head: string;
  items: any;
  children: ReactComponentElement<any>;
};

export type Video = {
  id: string;
  title: string;
  imgUrl: string;
};

export type HomeProps = {
  disneyVideos: Video[];
  travelVideos: Video[];
  productivityVideos: Video[];
};
