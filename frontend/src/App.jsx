// css sheet
import "./App.css";
// router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//? Layouts
import RootLayout from "../Layouts/Rootlayout";
import ProductLayout from "../Layouts/ProductLayout";
import SearchLayout from "../Layouts/SearchLayout";
import UserProfileLayout from "../Layouts/UserProfileLayout";
// error page
import ErrorPage from "./Error-page";
// user profile pages
import UsersProfile from "../pages/users/UsersProfile";
import UpdateProfile from "../pages/users/UpdateProfile";
import UpdateProduct from "../pages/users/UpdateProduct";
import AddProduct from "../pages/users/AddProduct";
// register page
import Register from "../pages/users/Register";
// other
import HomePage from "../Layouts/HomePage";
import ShowItems from "../pages/users/ShowItems";
import SellersPage from "../pages/sellers/SellersPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profile/:id",
        element: <UserProfileLayout />,
        children: [
          {
            index: true,
            element: <UsersProfile />,
          },
          {
            path: "myItems",
            element: <ShowItems />,
          },
          {
            path: "addProduct",
            element: <AddProduct />,
          },
          {
            path: "updateProfile",
            element: <UpdateProfile />,
          },
          {
            path: "updateProduct/:productId",
            element: <UpdateProduct />,
          },
        ],
      },
      {
        path: "/register",
        element: <Register />,
      },
      // {
      //   path: "/products",
      //   element: <ProductLayout />,
      // },
      {
        path: "/search",
        element: <SearchLayout />,
      },
      {
        path: "/seller/:username",
        element: <SellersPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
