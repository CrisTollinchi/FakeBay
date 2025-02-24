import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteProduct = ({ id, username, setState, state }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [credentials, setCredentials] = useState({
    password: "",
    username: "",
  });
  const navigate = useNavigate();
  const handleDeleteProduct = async () => {
    await fetch(`http://localhost:3000/FakeBay/deleteProduct/${id}`, {
      method: "DELETE",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setConfirmDelete(!confirmDelete);
        navigate(`/profile/${username}`);
      });
  };
  return (
    <div>
      {!confirmDelete && (
        <div>
          <button
            onClick={() => {
              setConfirmDelete(!confirmDelete);
              setState(!state);
            }}
          >
            Delete
          </button>
        </div>
      )}
      {confirmDelete && (
        <div>
          <p>Username</p>
          <input
            type="text"
            defaultValue={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <p>Password</p>
          <input
            type="password"
            defaultValue={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <div>
            <button
              onClick={() => {
                setConfirmDelete(!confirmDelete);
                setState(!state);
              }}
            >
              Cancel
            </button>
            <button onClick={handleDeleteProduct}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default DeleteProduct;
