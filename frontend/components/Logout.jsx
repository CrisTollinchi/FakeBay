import { useNavigate } from "react-router-dom";

const Logout = ({setState}) => {
  const navigate = useNavigate()
  const handleLogout = async(e) => {

    e.preventDefault()
    try {
        const response = await fetch("http://localhost:3000/FakeBay/logout",{
            method:"POST",
            credentials:"include",
        });
        const result = await response.json();
        setState(prevState=>({loggedIn:false,member:"Welcome to FakeBay."}));
        navigate("/")
      } catch (error) {
        console.log("Logout failure:", error);
      }
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Logout;