import { ReactComponentElement, cloneElement } from "react";
import Style from "./grid.module.css";

const { grids } = Style;

type RenderComponentsProps = {
  items: object[];
  children: ReactComponentElement<any>;
  className?: string;
};

const Grids = ({ items, children, className }: RenderComponentsProps): JSX.Element => {
  const renderComponents = items?.map((item: any, i: number) => {
    return cloneElement(children, { ...item, key: item.id + i });
  });

  return <div className={`${grids} ${className}`}>{renderComponents}</div>;
};

export default Grids;
