import { useState, useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";

const UserProfileLayout = () => {


  return (
    <div>
      <Outlet />
    </div>
  );
};
export default UserProfileLayout;
export const UsersProfileLoader = async ({ params }) => {
  // console.log(params);
  
  // const { userId } = params;
  // const response = await fetch("http://localhost:3000/FakeBay/profileLoader");
  // const data = await response.json();
  // return {
  //   response: data,
  //   userId: userId,
  // };
  return null
};
