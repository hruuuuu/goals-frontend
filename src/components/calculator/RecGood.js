import React, { Component } from 'react';

function RecGood(props) {
  // const { caloriesTdee } = props;
  return (
    <>
      <h1>{props.calories}</h1>
      <div className="row">
        <div className="col-lg-4 col-md-12"></div>
        <div className="col-lg-4 col-md-6 col-xs-12"></div>
        <div className="col-lg-4 col-md-6 col-xs-12"></div>
      </div>
    </>
  );
}

export default RecGood;
