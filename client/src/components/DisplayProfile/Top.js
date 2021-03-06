import React from "react";
import classes from "./Top.module.css";
import Add from "../../assets/images/Add.png"


const Top = props => (
  <div>
    <div className={classes.all}>
      {/*Image part of top bar*/}
      <img
        src={props.imgURL}
        className={classes.img}
        imagealt="image"
        alt="profile"
      />

      {/*Div holding info*/}
      <div>
        <p className={classes.name}>{props.name}</p>
      </div>
    </div>
  </div>
);

export default Top;
