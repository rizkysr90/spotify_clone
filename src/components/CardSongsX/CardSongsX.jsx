import React, { useState } from "react";
import styles from "./cardSongsX.module.css";
function CardSongsX({ song, playlists, handleAddToPlaylist }) {
  const { artists, duration_ms, album, name, uri } = song;
  const [showPlaylist, setShowPlaylist] = useState(false);
  console.log("INI PLAYLIST", showPlaylist);
  return (
    <div className={styles.card}>
      <img src={album?.images[2]?.url}></img>
      <div className={styles.name}>
        <div className={styles.songName}>{name}</div>
        <div className={styles.artists}>
          {artists
            .map((artist) => {
              return artist.name;
            })
            .join(", ")}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.album_name}>Album : {album?.name}</div>
        <div className={styles.release_date}>
          Release Date : {album?.release_date}
        </div>
        <div className={styles.duration}>
          Durasi : {(duration_ms / 60000).toFixed(1)} Menit
        </div>
        {!showPlaylist && (
          <div
            className={styles.btn_addPlaylist}
            onClick={() => setShowPlaylist(true)}
          >
            Tambah Ke Playlist
          </div>
        )}
        {showPlaylist && (
          <div
            className={styles.btn_addPlaylist}
            onClick={() => setShowPlaylist(false)}
          >
            Tutup
          </div>
        )}
        {showPlaylist ? (
          <form
            onSubmit={(e) => {
              handleAddToPlaylist(e, uri);
            }}
          >
            <select name="playlistId">
              {playlists?.map((playlist) => {
                return (
                  <option value={playlist?.id} key={playlist?.id}>
                    {playlist.name}
                  </option>
                );
              })}
            </select>
            <button type="submit">Simpan</button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default CardSongsX;
