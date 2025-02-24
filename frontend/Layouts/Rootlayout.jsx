// import { useEffect, useState } from "react";
// import { Outlet, Link } from "react-router-dom";
// import Login from "./Login";
// import Logout from "../components/Logout";


// const RootLayout = () => {
//   const [message, setMessage] = useState(null);
//   const [state, setState] = useState(() => {
//     // Retrieve the state from local storage if it exists
//     const savedState = sessionStorage.getItem("FakeBayState");
//     return savedState ? JSON.parse(savedState) : { loggedIn: false,member:"Welcome to FakeBay." };
//   });


//   useEffect(() => {
//     // Save the state to local storage whenever it changes
//     sessionStorage.setItem("FakeBayState", JSON.stringify(state));
//     setMessage(state.member);

//   }, [state]);

//   return (
//     <div>
//       <header>
//         <h1>{message}</h1>
//         {!state.loggedIn && <Login  setState={setState} />}
//         {state.loggedIn && <Logout  setState={setState} />}
//       </header>
//       <main>

//         <Outlet />
//       </main>
//     </div>
//   );
// };
// export default RootLayout;

import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Login from "./Login";
import Logout from "../components/Logout";

const RootLayout = () => {
  const [message, setMessage] = useState(null);
  const [state, setState] = useState(() => {
    const savedState = sessionStorage.getItem("FakeBayState");
    return savedState ? JSON.parse(savedState) : { loggedIn: false, member: "Welcome to FakeBay." };
  });

  useEffect(() => {
    sessionStorage.setItem("FakeBayState", JSON.stringify(state));
    setMessage(state.member);
  }, [state]);

  const handleLogin = (newState) => {
    setState(newState);
  };

  return (
    <div>
      <header>
        <h1>{message}</h1>
        {!state.loggedIn ? (
          <Login setState={handleLogin} />
        ) : (
          <Logout setState={setState} />
        )}
      </header>
      <nav>
        {/* <Link to="/">Home</Link> */}
        {state.loggedIn && <Link to="/profile">Profile</Link>}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;