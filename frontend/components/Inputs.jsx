const Inputs = ({ list, state, setState }) => {
  
  return (
    <div>
      {list.map((field) => {
        if (field === "description") {
          return (
            <div key={field}>
              <p>{field}</p>
              <textarea
                name=""
                id=""
                onChange={(e) =>
                  setState({ ...state, [field]: e.target.value })
                }
              ></textarea>
            </div>
          );
        }
        if (field === "yearBought" || field === "bid") {
          return (
            <div key={field}>
              <p>{field === "yearBought" ? "year bought" : field}</p>
              <input
                type="number"
                onChange={(e) =>
                  setState({ ...state, [field]: Number(e.target.value) })
                }
              />
            </div>
          );
        } else {
          return (
            <div key={field}>
              <p>{field}</p>
              <input
                type="text"
                onChange={(e) =>
                  setState({ ...state, [field]: e.target.value })
                }
              />
            </div>
          );
        }
      })}
    </div>
  );
};
export default Inputs;
