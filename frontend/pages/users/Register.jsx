// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const Register = () => {
//   const [newMember, setNewMember] = useState(null);

//   function uppercase(name) {
//     const splitName = name
//       .split(" ")
//       .map((names) =>
//         names
//           .split("")
//           .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
//           .join("")
//       )
//       .join(" ");
//     return splitName;
//   }

//   const handleClick = async (e) => {
//     e.preventDefault();
//     const name = uppercase(`${newMember.firstName} ${newMember.lastName}`);

//     const newRegister = {
//       name: name,
//       email: newMember.email,
//       age: newMember.age,
//       password: newMember.password,
//       username: newMember.username,
//     };
//     await fetch("http://localhost:3000/FakeBay/register", {
//       method: "POST",
//       body: JSON.stringify(newRegister),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       mode: "cors",
//     })
//       .then((res) => res.json())
//       .then((data) => console.log(data));
//   };

//   return (
//     <div>
//       <div>
//         <Link to="/">
//           <button>Home Page</button>
//         </Link>
//       </div>
//       <h1>Add Info</h1>
//       <p>first name</p>
//       <input
//         type="text"
//         // defaultValue={newMember.firstName}
//         onChange={(e) =>
//           setNewMember({ ...newMember, firstName: e.target.value })
//         }
//       />
//       <p>last name</p>
//       <input
//         type="text"
//         // value={newMember.lastName}
//         onChange={(e) =>
//           setNewMember({ ...newMember, lastName: e.target.value })
//         }
//       />
//       <p>email</p>
//       <input
//         type="email"
//         // value={newMember.email}
//         onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
//       />
//       <p>age</p>
//       <input
//         type="number"
//         // value={newMember.age}
//         onChange={(e) =>
//           setNewMember({ ...newMember, age: Number(e.target.value) })
//         }
//       />
//       <p>Username</p>
//       <input
//         type="text"
//         // value={newMember.username}
//         onChange={(e) =>
//           setNewMember({ ...newMember, username: e.target.value })
//         }
//       />
//       <p>password</p>
//       <input
//         type="text"
//         // value={newMember.password}
//         onChange={(e) =>
//           setNewMember({ ...newMember, password: e.target.value })
//         }
//       />
//       <button onClick={handleClick}>Add User</button>
//     </div>
//   );
// };
// export default Register;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [newMember, setNewMember] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const uppercase = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const name = uppercase(`${newMember.firstName} ${newMember.lastName}`);
    const newRegister = { ...newMember, name };

    try {
      const response = await fetch("http://localhost:3000/FakeBay/register", {
        method: "POST",
        body: JSON.stringify(newRegister),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      // You can add navigation or success message here
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <Link to="/">
          <button>Home Page</button>
        </Link>
      </div>
      <h1>Add Info</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleClick}>
        <label>
          First Name
          <input
            type="text"
            name="firstName"
            value={newMember.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            value={newMember.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email
          <input
            type="email"
            name="email"
            value={newMember.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Age
          <input
            type="number"
            name="age"
            value={newMember.age}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Username
          <input
            type="text"
            name="username"
            value={newMember.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            name="password"
            value={newMember.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default Register;