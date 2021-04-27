import React from 'react';
import './styles/Button.scss';

const Commonbutton = ({type,inputRef,children, ...rest}) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type !== undefined ? type : 'submit'}
      ref={inputRef}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Commonbutton;
