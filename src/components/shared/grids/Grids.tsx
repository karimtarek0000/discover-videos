import { ReactComponentElement, cloneElement } from "react";
import Style from "./grid.module.css";

type RenderComponentsProps = {
  items: object[];
  children: ReactComponentElement<any>;
  className?: string;
};

const Grids = ({ items, children, className }: RenderComponentsProps): JSX.Element => {
  const renderComponents = items?.map((item: any) => {
    return cloneElement(children, { item, key: item.id });
  });

  return <div className={`${Style.grid} ${className}`}>{renderComponents}</div>;
};

export default Grids;
