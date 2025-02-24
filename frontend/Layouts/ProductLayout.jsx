import { Outlet } from "react-router";
import { useEffect } from "react";

const ProductLayout = () => {

  useEffect(() => {
    if (localStorage.getItem("FakeBayLoggedIn") === "false") {
      navigate("/");
    }
  }, []);
  
  return (
    <div>
      <h1>products layout</h1>
      <Outlet />
    </div>
  );
};
export default ProductLayout;
