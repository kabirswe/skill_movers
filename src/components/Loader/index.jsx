import React from 'react';
import Style from './loader.module.scss';

export default function Loader({className =''}) {
  return (
    <>
        <div className={`${Style.loader} ${className}`}></div>
    </>
  );
}
