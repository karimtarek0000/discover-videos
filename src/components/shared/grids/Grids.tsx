import { ReactComponentElement, cloneElement } from "react";

type RenderComponentsProps = {
  items: object[];
  children: ReactComponentElement<any>;
  className?: string;
};

const Grids = ({ items, children, className }: RenderComponentsProps): JSX.Element => {
  const renderComponents = items?.map((item: any) => {
    return cloneElement(children, { item, key: item.id });
  });

  return (
    <div
      className={`container justify-center max-md:px-3 gap-3 grid sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {renderComponents}
    </div>
  );
};

export default Grids;
