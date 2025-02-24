// import { useEffect, useState } from "react";
// import { useNavigate, useOutletContext, useParams } from "react-router-dom";

// const UpdateProfile = () => {
//   const usersProfile = useOutletContext();

//   const [isUpdated, setIsUpdated] = useState(false);
//   const [profile, setProfile] = useState({
//     first_name: usersProfile.first_name,
//     last_name: usersProfile.last_name,
//     email: usersProfile.email,
//     username: usersProfile.username,
//     password: "",
//   });

//   const navigate = useNavigate();

//   const id = usersProfile._id;

//   const updateProfile = async () => {
//     await fetch(`http://localhost:3000/FakeBay/updateProfile/${id}`, {
//       method: "PUT",
//       body: JSON.stringify(profile),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       mode: "cors",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success === true) {
//           console.log(data.message);
//           setIsUpdated(!isUpdated);
//           setProfile({ ...profile, password: "" });
//         } else {
//           console.log(data.message);
//           setIsUpdated(!isUpdated);
//           setProfile({ ...profile, password: "" });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <div>
//       <h1>Update page</h1>
//       <p>first name</p>
//       <input
//         type="text"
//         name="firstName"
//         onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
//       />
//       <p>last name</p>
//       <input
//         type="text"
//         name="lastName"
//         onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
//       />
//       <p>email</p>
//       <input
//         type="text"
//         name="email"
//         onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//       />
//       <p>username</p>
//       <input
//         type="text"
//         name="username"
//         onChange={(e) => setProfile({ ...profile, username: e.target.value })}
//       />
//       <div>
//         <button onClick={() => setIsUpdated(!isUpdated)}>Update</button>
//       </div>
//       {isUpdated && (
//         <div>
//           <p>Please type in your password!</p>
//           <input
//             type="password"
//             name="password"
//             value={profile.password}
//             onChange={(e) =>
//               setProfile({ ...profile, password: e.target.value })
//             }
//           />
//           <button onClick={updateProfile}>Update</button>
//         </div>
//       )}
//     </div>
//   );
// };
// export default UpdateProfile;

import React, { useState, useEffect } from "react";

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch current profile data
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/FakeBay/profile",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setProfileData(data.profileData);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/FakeBay/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: profileData.username,
          password: profileData.password,
          profileData,
        }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="username"
          value={profileData.username || ""}
          onChange={handleChange}
          placeholder="Username"
          className="border p-2 mr-2"
        />
        <input
          type="password"
          name="password"
          value={profileData.password || ""}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="name"
          value={profileData.name || ""}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 mr-2"
        />
        <input
          type="email"
          name="email"
          value={profileData.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 mr-2"
        />
        {/* Add more fields as needed */}
        <button type="submit" className="bg-blue-500 text-white p-2">
          Update Profile
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateProfile;
