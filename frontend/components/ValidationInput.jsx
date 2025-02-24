import { useState } from "react";
import { useOutletContext, useParams } from "react-router";

const ValidationInput = ({ urlStatus, reqBody }) => {
  const params = useParams();
  const [validate, setValidate] = useState(null);
  const [callStatus, setCallStatus] = useState(null);
  const [body,setBody] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  console.log(params);
  console.log(callStatus);
  const apiCall = async () => {
    try {
      await fetch(``, {
        method: callStatus.method,
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          
        },
        mode: "cors",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSuccessMessage(data.data);
          } else {
            setErrorMessage(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>password</p>
      <input
        type="password"
        onChange={(e) => setValidate({ ...validate, password: e.target.value })}
      />
      <button onClick={apiCall}></button>
    </div>
  );
};
export default ValidationInput;
