import { Link } from "react-router-dom";

const BackButton = ({prev}) => {
  return (
    <div>
        <button onClick={()=>history.back()}>Back</button>
    </div>
  );
};
export default BackButton