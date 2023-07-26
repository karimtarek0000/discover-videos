import Card from "@/components/card/Card";
import Header from "@/components/layout/header/Header";
import Navbar from "@/components/layout/navbar/Navbar";
import SectionCard from "@/components/sectionCard/SectionCard";

export default function Home() {
  const items = [
    { id: 1, name: "" },
    { id: 2, name: "" },
    { id: 3, name: "" },
    { id: 4, name: "" },
    { id: 5, name: "" },
    { id: 6, name: "" },
    { id: 7, name: "" },
    { id: 8, name: "" },
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
        <SectionCard head="desiny" items={items}>
          <Card type="large" imgUrl="/images/clifford.webp" />
        </SectionCard>
      </main>
    </>
  );
}
