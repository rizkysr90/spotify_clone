import React from "react";
import style from "./Avatar.module.css";

function Avatar({ profile }) {
  return (
    <>
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.avatar}>
            <img
              src={
                profile?.url_img
                  ? profile?.url_img
                  : "https://gravatar.com/avatar/1e12f0bfc0c6d5d1ae46f14acb8e2749?s=400&d=identicon&r=x"
              }
              alt="profile"
            ></img>
          </div>
          <div className={style.description}>
            <p>Nama : {profile?.name ? profile?.name : "John Doe"}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Avatar;
