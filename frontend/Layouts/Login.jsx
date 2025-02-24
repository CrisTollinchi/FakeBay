// import { useState } from "react";
// import { useNavigate, Link, Form } from "react-router-dom";

// const Login = ({ setState }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/FakeBay/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         credentials: "include",
//         mode: "cors",
//       });
//       const result = await response.json();
//       if (result.success === true) {
//         setFormData({ username: "", password: "" });
//         setState((prevState) => ({ ...prevState, loggedIn: true }));
//         try {
//           const userResponse = await fetch(
//             "http://localhost:3000/FakeBay/profile",
//             {
//               method: "GET",
//               credentials: "include", // Include cookies in the request
//             }
//           );
//           const userResult = await userResponse.json();

//           setState((prevState) => ({
//             ...prevState,
//             member: `Hello ${userResult.member}`,
//           }));

//           navigate(`/profile/${userResult.data._id}`);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     } catch (error) {
//       console.log("Login failure:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <section>
//           <label>Username</label>
//           <input
//             id="username"
//             name="username"
//             type="text"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </section>
//         <section>
//           <label>Password</label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </section>
//         <button type="submit">Login</button>
//       </form>
//       <div>
//         <p>Sign up today!</p>
//         <Link to="/register">
//           <button>Register</button>
//         </Link>
//       </div>
//     </div>
//   );
// };
// export default Login;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setState }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/FakeBay/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      if (result.success) {
        setFormData({ username: "", password: "" });
        setState((prevState) => ({ ...prevState, loggedIn: true }));

        try {
          const userResponse = await fetch(
            "http://localhost:3000/FakeBay/profile",
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (!userResponse.ok) {
            throw new Error("Failed to fetch user profile");
          }

          const userResult = await userResponse.json();
          setState((prevState) => ({
            ...prevState,
            member: `Hello ${userResult.member}`,
          }));
          navigate(`/profile/${userResult.data._id}`);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setError("Failed to load user profile. Please try again.");
        }
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <section>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </section>
        <section>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </section>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Don't have an account?</p>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;







// const VerifyCredentials = () => {
// import React, { useState } from 'react';
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch('http://localhost:3000/verify', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include', // This will include the cookie in the request
//       body: JSON.stringify({ username, password }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       alert('Credentials match');
//     } else {
//       alert(data.message || 'Credentials do not match');
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Verify</button>
//     </form>
//   );
// };
// export default VerifyCredentials;
