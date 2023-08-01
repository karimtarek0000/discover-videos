import { SectionCardProps } from "@/types";
import { m } from "framer-motion";
import Grids from "../shared/grids/Grids";

const SectionCard = (props: SectionCardProps): JSX.Element => {
  const { head, items, children } = props;

  return (
    <section className="container mt-24">
      <h2 className="-mb-5 text-white capitalize md:ps-4 text-40">{head}</h2>
      <Grids items={items}>{children}</Grids>
    </section>
  );
};

export default SectionCard;
