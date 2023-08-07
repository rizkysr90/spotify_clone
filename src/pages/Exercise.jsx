import React from "react";
import style from "./Exercise.module.css";
import Avatar from "./../components/Avatar";
import data from "./../data/users.js";
function Exercise() {
  return (
    <div>
      <div className={style.main}>
        {data.map((elm, idx) => {
          return <Avatar key={idx} profile={elm} />;
        })}
      </div>
    </div>
  );
}

export default Exercise;
