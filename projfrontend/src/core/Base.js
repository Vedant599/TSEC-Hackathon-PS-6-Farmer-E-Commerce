import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  children
}) => (
  <div>
    <Menu />
    <div className="container">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mt-4 border-bottom">
        <h1 class="h2">{title}</h1>
        <h4 className="lead">{description}</h4>
      </div>
      <div>{children}</div>
    </div>
  
  </div>
);

export default Base;
