import React from "react";
import Navbar from "../components/Navbar";
import style from "./SongDetails.module.css";
// import image1 from "./../../public/banner1.jpg";
export default function SongsDetails() {
  return (
    <div>
      <Navbar />
      <div class={style.main}>
        <div class={style.mainContainer}>
          <div class={style.banner}>
            <div class={style.bannerPhoto}>
              <img src={"/banner1.jpg"} />
            </div>
            <div class={style.bannerHeading}>
              <h1>Night Changes</h1>
              <p>One direction - 2023</p>
              <div class={style.bannerButton}>
                <div class={style.btnBanner}>Play</div>
                <div class={style.btnBanner}>Add to playlist</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
