import { useRouter } from "next/router";
import React from "react";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const handleclick = () => {
    console.log('i am called');
  }
  return(
    <div>Slug : {slug}
    <h1>Hello</h1>
    <button onClick={handleclick}>click</button>
  </div>)
};

export default Slug;
