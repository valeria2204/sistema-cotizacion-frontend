import React,{useState} from 'react';
const Checkbox = ({ initialState, id, value, onChange}) => {
    const [checked, setChecked] = useState(initialState);
    const onClick=(checked)=>{
     setChecked(checked);
     onChange(id, value, checked);
    }
    
    return (
      <input
        type="checkbox"
        onClick={e => onClick(e.target.checked)}
        checked={checked}
      />
    );
  };

