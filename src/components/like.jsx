import React, { Component } from "react";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.like) classes += "-o";

  return (
    <React.Fragment>
      <i
        onClick={props.onClick}
        style={{ cursor: "pointer" }}
        className={classes}
        aria-hidden="true"
      ></i>
    </React.Fragment>
  );
};

export default Like;
