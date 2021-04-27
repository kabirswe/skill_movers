import React from 'react';
import './static/InputCheckbox.scss';

const InputCheckbox = (props) => {
  return (
	<div className="input-checkbox-block">
	  <input
	  	id={`custom-control-input-${props.inputName}`}
		className="custom-control-input"
		placeholder={props.placeHolder}
		type={props.inputType}
		autoComplete="off"
		name={props.inputName}
		ref={props.inputRef}
	  />
	  <label className="custom-control-label" htmlFor={`custom-control-input-${props.inputName}`}> 
	  </label>
		<span className="name">{props.inputLabel}</span>
	</div>
  );
};
export default InputCheckbox;
