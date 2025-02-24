import { useEffect, useState } from "react";
import Category from "../components/categories/Category";

const SearchLayout = () => {
  const [descriptionInfo, setDescriptionInfo] = useState({
    description: "",
  });
  const [categoryInfo, setCategoryInfo] = useState({
    category: "",
  });
  const [searchedProducts, setSearchProducts] = useState([]);
  const [pickedCategory, setPickedCategory] = useState(false);

  const selections = [
    "Tools",
    "Games",
    "Men-Clothes",
    "Women-Clothes",
    "Electronics",
    "Accessories",
    "Vehicles",
    "Literature",
    "Art",
    "Other",
  ];

  const handleSearch = async () => {
    await fetch(
      `http://localhost:3000/FakeBay/${categoryInfo.category}/search?description=${descriptionInfo.description}`
    )
      // .then((res) = res.json())
      // .then((res) => setSearchProducts(res))
      // .catch((err) => console.log(err));
  };

handleSearch()
  const options = selections.map((categories, index) => (
    <option key={index} value={categories}>
      {categories}
    </option>
  ));

  return (
    <div>
      {/* <Category /> */}
      <p>Pick a Category</p>
      <select
        onChange={(e) => {
          setPickedCategory(!pickedCategory);
          setCategoryInfo({
            ...categoryInfo,
            category: e.target.value,
          });
        }}
      >
        <option value="">Please Pick One</option>
        {options}
      </select>

      {pickedCategory && (
        <div>
          <input
            value={descriptionInfo.description}
            type="text"
            onChange={(e) =>
              setDescriptionInfo({
                ...descriptionInfo,
                description: e.target.value,
              })
            }
          />
        </div>
      )}
    </div>
  );
};
export default SearchLayout;
