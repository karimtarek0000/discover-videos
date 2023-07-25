import Card from "@/components/card/Card";
import Header from "@/components/layout/header/Header";
import Navbar from "@/components/layout/navbar/Navbar";
import Grids from "@/components/shared/grids/Grids";
import { m } from "framer-motion";

export default function Home() {
  const items = [
    { id: 1, name: "" },
    { id: 2, name: "" },
    { id: 3, name: "" },
    { id: 4, name: "" },
  ];

  return (
    <>
      <Navbar />
      <Header
        title="john wick"
        imgUrl="/images/clifford.webp"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim facere molestiae deserunt. Maxime, aut consequuntur eos quaerat sunt cumque aliquid!"
      />
      <main>
        <section className="mt-24">
          <Grids items={items}>
            <m.div initial={false} whileHover={{ scale: 1.2 }}>
              <Card type="large" imgUrl="/images/clifford.webp" />
            </m.div>
          </Grids>
        </section>
      </main>
    </>
  );
}
