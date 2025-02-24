import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";

const UpdateProduct = () => {
  const usersProfile = useOutletContext();
  const [isUpdated, setIsUpdated] = useState(false);
  const [product, setProduct] = useState({});
  const [removeUpdateButton,setRemoveUpdateButton] = useState(false)

  const { id } = useParams();

  useEffect(() => {
    const filteredProduct = usersProfile.auctionOff.filter((x) => x._id === id);
    filteredProduct.map((x) => setProduct({ ...product, ...x }));
  }, []);

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

  const options = selections.map((categories, index) => (
    <option key={index} value={categories}>
      {categories}
    </option>
  ));

  const handleUpdate = async () => {
    await fetch(`http://localhost:3000/FakeBay/updateProduct/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIsUpdated(!isUpdated);
      });
  };

  return (
    <div>
      <p>title</p>
      <input
        type="text"
        name="title"
        defaultValue={product.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
      />
      <p>category</p>
      <select
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
      >
        <option value={product.category}>{product.category}</option>
        {options}
      </select>
      <p>bid</p>
      <input
        type="number"
        name="bid"
        defaultValue={product.bid}
        onChange={(e) => setProduct({ ...product, bid: e.target.value })}
      />
      <p>year bought</p>
      <input
        type="number"
        name="yearBought"
        defaultValue={product.yearBought}
        onChange={(e) => setProduct({ ...product, yearBought: e.target.value })}
      />
      <p>description</p>
      <textarea
        name="description"
        defaultValue={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      ></textarea>
      {!isUpdated && (
        <div>
          {!isUpdated && !removeUpdateButton &&
            <button onClick={() => setIsUpdated(!isUpdated)}>Update</button>
          }
          <DeleteProduct id={id} username={usersProfile.username} setState={setRemoveUpdateButton}state={removeUpdateButton}/>
        </div>
      )}
      {isUpdated && (
        <div>
          <p>username</p>
          <input
            type="text"
            // value={product.username}
            onChange={(e) =>
              setProduct({ ...product, username: e.target.value })
            }
          />
          <p>password</p>
          <input
            type="password"
            // value={product.password}
            onChange={(e) =>
              setProduct({ ...product, password: e.target.value })
            }
          />
          <div>
            <button onClick={() => setIsUpdated(!isUpdated)}>Cancel</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UpdateProduct;
