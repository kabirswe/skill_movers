import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./static/Input.scss";
import { ReactComponent as NotVisiable } from "./static/image/not-visiable.svg";
import { ReactComponent as InfoCircle } from "./static/image/info-circle.svg";

const Inputfield = (props) => {
  const active = props.textAlign ? "right-input-text" : "";
  const isError = props.isError || "";
  const isDisabled = props.isDisabled || false;
  const disabledClass = isDisabled ? "disabled" : "";
  const isMultiple = props.isMultiple ? true : false;
  const [inputType, setInputType] = useState(props.textType);
  const passwordVisiablityClick = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };
  return (
    <div className="input-block">
      <label htmlFor="">
        <span className="name">{props.inputLabel}</span>
        {props.labelLink && (
          <span className="link">
            <Link to={props.labelLink}>{props.labelLinkText}</Link>
          </span>
        )}
      </label>
      <input
        className={`input-box ${active} ${isError} ${disabledClass} ${props.inputClassName}`}
        placeholder={props.placeHolder}
        type={inputType}
        value={props.inputValue}
        onChange={props.onchangeCallback}
        autoComplete="off"
        name={props.inputName}
        ref={props.inputRef}
        multiple={isMultiple}
      />
      {props.requiredMessage && (
        <span className="error-message">
          <InfoCircle fill="" /> {props.requiredMessageLabel}
        </span>
      )}
      {props.textType === "password" && (
        <span className="password-visiablity" onClick={passwordVisiablityClick}>
          <NotVisiable fill="white" />
        </span>
      )}
    </div>
  );
};
export default Inputfield;
// const Inputfield = (props) => {
//   const active = props.textAlign ? 'right-input-text' : '';
//   const isError = props.isError || '';
//   const isDisabled = props.isDisabled || false;
//   const disabledClass = isDisabled ? 'disabled' : '';
//   const isMultiple = props.isMultiple ? true : false;
//   return (
//     <input
//       className={`input-box ${active} ${isError} ${disabledClass}`}
//       placeholder={props.placeHolder}
//       type={props.textType}
//       autoComplete="off"
//       name={props.inputName}
//       ref={props.inputRef}
//       value={props.inputValue}
//       onChange={props.onchangeCallback}
//       onKeyUp={props.keyupCallback}
//       onInput={props.keyupCallback}
//       onBlur={props.blurCallback}
//       onMouseLeave={props.onMouseLeave}
//       defaultValue={props.defaultValue}
//       maxLength={!!props.maxLength ? props.maxLength : null}
//       disabled={isDisabled}
//       multiple={isMultiple}
//     />
//   );
// };
// export default Inputfield;
