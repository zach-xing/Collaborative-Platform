import type { NextPage } from "next";

const Home: NextPage = () => {
  console.log("index.tsx - rerender");

  return (
    <>
      <h1>Welcome!!!</h1>
      <h2>这里写点主页介绍</h2>
    </>
  );
};

export default Home;
