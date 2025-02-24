import { useState } from "react";

const GetProfile = () => {
  const [message, setMessage] = useState(null);
  const [credentials, setCredentials] = useState(null);
  console.log(credentials);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/FakeBay/profile", {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(credentials),
        credentials: "include", // Include cookies in the request
        mode: "cors",
      });
      if (response.ok) {
        const data = await response.text();
        setMessage(data);
      } else {
        setMessage("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMessage("An error occurred");
    }
  };
  return (
    <div>
  
        <div>
          <section>
            <label>Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={handleChange}
              required
            />
          </section>
          <section>
            <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              required
            />
          </section>
          <button onClick={handleProfile}>Get Profile</button>
        </div>

      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};
export default GetProfile;
