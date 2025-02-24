import { useState } from "react";
import SelectOptions from "../SelectOptions";

const WomenClothes = () => {
  const [query,setQuery]= useState({
    check:true
  })
  const category = [
    "women-bag",
    "women-dresses",
    "women-jewelry",
    "women-shoes",
    "women-shirts",
    "women-jeans",
  ];
  return (
    <div>
      <h1>WomenClothes</h1>
      <SelectOptions />
    </div>
  );
};
export default WomenClothes;
