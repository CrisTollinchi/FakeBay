

const SelectOptions = ({ list,check,onChange,setCheck,nextCheck}) => {

  return (
    <div>
      <select onChange={onChange} disabled={check}>
        <option>Please Pick One</option>
        {list &&
          list.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
      </select>
    </div>
  );
};
export default SelectOptions;