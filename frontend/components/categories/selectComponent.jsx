import MenClothes from "./MenClothes";
import WomenClothes from "./WomenClothes";
import Electronics from "./Electronics";
import Vehicles from "./Vehicles";
import Literature from "./Literature";
import Art from "./Art";
import Other from "./Other";

let componentObj = {
  "Men-Clothes": MenClothes,
  "Women-Clothes": WomenClothes,
  Electronics: Electronics,
  Vehicles: Vehicles,
  Literature: Literature,
  Art: Art,
  Other: Other,
};

const selectComponent = (arg) => {
  const keys = Object.keys(componentObj).filter((x)=>x ===arg)
  return console.log(keys);
  
};

export default selectComponent;
