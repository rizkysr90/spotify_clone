import React from "react";
import style from "./Banner.module.css";
function Banner() {
  return (
    <div className={style.banner}>
      <div className={style.bannerPhoto}>
        <img src="./banner1.jpg" />
      </div>
      <div className={style.bannerHeading}>
        <h1>Welcome to Spotify</h1>
        <p>Your favorite place to finds out awesome musics</p>
        <div className={style.bannerButton}>
          <div className={style.btnBanner}>Play</div>
          <div className={style.btnBanner}>Follow</div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
