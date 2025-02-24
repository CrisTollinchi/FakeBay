import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import GetProfile from "../../components/GetProfile"
const UsersProfile = () => {

  return (
    <div>
      <div>
        <Link to="addProduct">
          <button>Auction an item</button>
        </Link>
        <Link to="myItems">
          <button>Check your items</button>
        </Link>
        <Link to="updateProfile">
          <button>Update profile</button>
        </Link>
      </div>
      <GetProfile />
    </div>
  );
};
export default UsersProfile;
