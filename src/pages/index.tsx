import Header from "@/components/layout/header/Header";
import Navbar from "@/components/layout/navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header
        title="john wick"
        imgUrl="/images/clifford.webp"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim facere molestiae deserunt. Maxime, aut consequuntur eos quaerat sunt cumque aliquid!"
      />
      <main></main>
    </>
  );
}
