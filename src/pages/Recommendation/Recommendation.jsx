import React, { useEffect, useState } from "react";
import { redirect, useLocation } from "react-router-dom";
import CardSongsX from "../../components/CardSongsX/CardSongsX";
function Recommendation() {
  const [recommend, setRecommend] = useState([]);
  const location = useLocation();
  const [playlists, setPlaylists] = useState([]);
  const [accessToken] = useState(location.state?.accessToken);
  const handleAddToPlaylist = async (e, uri) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData.entries());
    let endpoint = `https://api.spotify.com/v1/playlists/${formData.playlistId}/tracks`;
    const dataToSend = {
      uris: [uri],
    };
    const requestOptions = {
      method: "POST", // Ganti dengan metode permintaan yang sesuai (GET, POST, dll.)
      headers: {
        Authorization: `Bearer ${accessToken}`, // Menambahkan Bearer token ke header
        "Content-Type": "application/json", // Jika menggunakan metode POST atau PUT, sesuaikan dengan tipe konten yang sesuai
      },
      body: JSON.stringify(dataToSend),
    };
    try {
      await fetch(endpoint, requestOptions).then((res) => res.json());
      console.log("Berhasil menambahkan ke playlist");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const requestOptions = {
      method: "GET", // Ganti dengan metode permintaan yang sesuai (GET, POST, dll.)
      headers: {
        Authorization: `Bearer ${accessToken}`, // Menambahkan Bearer token ke header
        "Content-Type": "application/json", // Jika menggunakan metode POST atau PUT, sesuaikan dengan tipe konten yang sesuai
      },
    };
    const getPlaylist = async () => {
      let endpointMe = "https://api.spotify.com/v1/me";

      try {
        let getUser = await fetch(endpointMe, requestOptions).then((res) =>
          res.json()
        );
        let endpoint = `https://api.spotify.com/v1/users/${getUser?.id}/playlists`;
        let res = await fetch(endpoint, requestOptions).then((res) =>
          res.json()
        );
        setPlaylists(res.items);
      } catch (error) {
        console.error(error);
      }
    };
    const getRecommend = async () => {
      let endpoint = `https://api.spotify.com/v1/recommendations?limit=10&market=ID&seed_artists=4AK6F7OLvEQ5QYCBNiQWHq&seed_genres=classical%2Ccountry&seed_tracks=5O2P9iiztwhomNh8xkR9lJ`;
      try {
        let res = await fetch(endpoint, requestOptions).then((res) =>
          res.json()
        );
        setRecommend(res.tracks);
      } catch (error) {
        console.error(error);
      }
    };
    const init = async () => {
      await getRecommend();
      await getPlaylist();
    };
    if (!accessToken) {
      return redirect("/");
    }
    init();
  }, [accessToken]);
  return (
    <>
      <div className="section-header" onClick={() => {}}>
        Rekomendasi
        <div>
          {recommend?.map((song) => {
            return (
              <CardSongsX
                key={song.uri}
                song={song}
                playlists={playlists}
                handleAddToPlaylist={handleAddToPlaylist}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Recommendation;
