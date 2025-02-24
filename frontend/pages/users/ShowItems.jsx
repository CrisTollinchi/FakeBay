import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import List from "../../components/List";


const ShowItems = () => {
  const usersProfile = useOutletContext();

  return (
    <div>
      <div>
        <h1>ShowItems page</h1>
        <Link to={`/profile/${usersProfile.username}/addProduct`}>
          <button>Add an item?</button>
        </Link>
      </div>
      {usersProfile && usersProfile.auctionOff.length > 0 && (
        <List>
          {usersProfile.auctionOff.map((item) => (
            <div key={item._id}>
              <p>Title: {item.title}</p>
              <p>Category: {item.category}</p>
              <p>Description: {item.description}</p>
              <p>Current Bid: ${item.bid}</p>
              <Link to={`/profile/${usersProfile.username}/updateProduct/${item._id}`}>
              <button>
                Update Item?
              </button>
              </Link>
            </div>
          ))}
        </List>
      )}
    </div>
  );
};
export default ShowItems;
