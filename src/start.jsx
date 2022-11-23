import React from "react";

export default function Start(props) {
  return (
    <div className="Start--page">
      <div className="upper--design"></div>
      <h1 className="Quiz">Quizzical</h1>
      <p className="Info">Attempt all the Questions</p>
      <button className="Start--quiz" onClick={props.toggle}>
        <h2>Start quiz</h2>
      </button>
      <div className="lower--design"></div>
    </div>
  );
}
