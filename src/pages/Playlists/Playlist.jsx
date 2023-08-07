import React, { useEffect, useState } from "react";
import { redirect, useLocation } from "react-router-dom";
function Playlist() {
  const [user, setUser] = useState({});
  const location = useLocation();
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylists, setCurrentPlaylists] = useState("");
  const [playlistDetails, setPlaylistsDetails] = useState([]);
  const [accessToken] = useState(location.state?.accessToken);
  const handleRemoveFromPlaylist = async (uri) => {
    let endpoint = `https://api.spotify.com/v1/playlists/${currentPlaylists}/tracks`;
    const dataToSend = {
      uris: [uri],
    };
    const requestOptions = {
      method: "DELETE", // Ganti dengan metode permintaan yang sesuai (GET, POST, dll.)
      headers: {
        Authorization: `Bearer ${accessToken}`, // Menambahkan Bearer token ke header
        "Content-Type": "application/json", // Jika menggunakan metode POST atau PUT, sesuaikan dengan tipe konten yang sesuai
      },
      body: JSON.stringify(dataToSend),
    };
    try {
      await fetch(endpoint, requestOptions).then((res) => res.json());
      console.log("Berhasil menghapus ke playlist");
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetPlaylist = async (playlistId) => {
    try {
      const requestOptions = {
        method: "GET", // Ganti dengan metode permintaan yang sesuai (GET, POST, dll.)
        headers: {
          Authorization: `Bearer ${accessToken}`, // Menambahkan Bearer token ke header
          "Content-Type": "application/json", // Jika menggunakan metode POST atau PUT, sesuaikan dengan tipe konten yang sesuai
        },
      };
      let endpoint = `https://api.spotify.com/v1/playlists/${playlistId}`;
      let res = await fetch(endpoint, requestOptions).then((res) => res.json());
      setPlaylistsDetails(res.tracks.items);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData.entries());
    const dataToSend = {
      name: formData.playlistName,
      description: formData.playlistDesc,
      public: true,
    };

    try {
      const requestOptions = {
        method: "POST", // Ganti dengan metode permintaan yang sesuai (GET, POST, dll.)
        headers: {
          Authorization: `Bearer ${accessToken}`, // Menambahkan Bearer token ke header
          "Content-Type": "application/json", // Jika menggunakan metode POST atau PUT, sesuaikan dengan tipe konten yang sesuai
        },
        body: JSON.stringify(dataToSend),
      };
      let endpoint = `https://api.spotify.com/v1/users/${user?.id}/playlists`;
      let res = await fetch(endpoint, requestOptions).then((res) => res.json());
      console.log("Berhasil, pesan : ", res);
    } catch (error) {
      console.error(error);
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
    const getUsers = async () => {
      let endpoint = "https://api.spotify.com/v1/me";
      try {
        let res = await fetch(endpoint, requestOptions).then((res) =>
          res.json()
        );
        setUser(res);
      } catch (error) {
        console.error(error);
      }
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
    const init = async () => {
      await getUsers();
      await getPlaylist();
    };
    if (!accessToken) {
      return redirect("/");
    }
    init();
  }, [accessToken]);
  console.log(playlists);
  return (
    <>
      <div className="section-header">Playlist</div>
      <>
        <div className="">
          <form onSubmit={(e) => handleCreatePlaylist(e)}>
            <input
              type="text"
              name="playlistName"
              id="playlistName"
              placeholder="Masukkan nama playlist"
            ></input>
            <input
              type="text"
              name="playlistDesc"
              id="playlistDesc"
              placeholder="Masukkan deskripsi singkat"
            ></input>
            <button type="submit"> Buat Playlist</button>
          </form>
          <div>Read Playlists</div>
          {playlists?.map((playlist) => {
            return (
              <div
                key={playlist.id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentPlaylists(playlist.id);
                  handleGetPlaylist(playlist.id);
                }}
              >
                {playlist.name}
              </div>
            );
          })}
          <div>Playlist details</div>
          {playlistDetails?.map((playlist) => {
            return (
              <div
                key={playlist?.track?.id}
                style={{
                  display: "flex",
                }}
              >
                <div>{playlist?.track?.name}</div>
                <div
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    color: "red",
                  }}
                  onClick={() => {
                    handleRemoveFromPlaylist(playlist?.track?.uri);
                  }}
                >
                  Hapus
                </div>
              </div>
            );
          })}
        </div>
      </>
    </>
  );
}

export default Playlist;
