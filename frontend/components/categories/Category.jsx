import { useState } from "react";
import List from "../List";

const Category = () => {
  const [items, setItems] = useState([]);
  const [emptyMessage, setEmptyMessage] = useState("");

  // list of categories array
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

  // async function to fetch products that fall under the chosen category text from button
  const getProductsByCategories = async (e) => {
    const category = e.target.innerText;
    setEmptyMessage("");
    try {
      const response = await fetch(
        `http://localhost:3000/FakeBay/categories/${category}`
      );
      const result = await response.json();
      console.log(result);
      if (result.length === 0) {
        setEmptyMessage("Nobody has any products for sale under that category");
      }

      setItems(result);
    } catch (err) {
      console.log(err);
    }
  };

  // buttons created by mapping from selections variable array
  const categoryButtons = () =>
    selections.map((category, index) => (
      <div key={index}>
        <button onClick={getProductsByCategories}>{category}</button>
      </div>
    ));

  return (
    <div>
      <List>{categoryButtons()}</List>
      {items && items.length > 0 && (
        <div>
          {items.map((product, index) => (
            <div key={index}>
              <p>Seller: {product.username}</p>
              {product.data.map((x) => (
                <div key={x._id}>
                  <p>Title: {x.title}</p>
                  <p>Description: {x.description}</p>
                  <div>
                    <p>Bid Price: ${x.bid}</p>
                    <button>Call</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Category;
