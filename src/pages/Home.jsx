import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./../App.css";
import Navbar from "../components/Navbar";
import styles from "./home.module.css";
import CardCategories from "../components/CardCategories/CardCategories";
import CardSongsX from "../components/CardSongsX/CardSongsX";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = process.env.REACT_APP_SPOTIFYID;
const REDIRECT_URI = "http://localhost:3000";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-library-read",
  "playlist-modify-public",
  "playlist-modify-private",
]; // Sesuaikan dengan izin yang Anda butuhkan
export default function Home() {
  const navigate = useNavigate();
  const [tabbing, setTabbing] = useState({
    category: true,
    recommendation: false,
    playlist: false,
  });
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const [searchSong, setSearchSong] = useState("");
  const [searchResult, setSeachResult] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [playlistDetails, setPlaylistsDetails] = useState([]);
  const [currentPlaylists, setCurrentPlaylists] = useState("");
  const [playlists, setPlaylists] = useState([]);
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
    // Spotify API
    // Fungsi untuk mengekstrak token akses dari URI fragmen
    const getAccessTokenFromUrl = () => {
      const hash = window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
          if (item) {
            const parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});
      return hash.access_token;
    };

    const token = getAccessTokenFromUrl();
    if (token) {
      setAccessToken(token);
    } else {
      // Jika tidak ada token akses, arahkan pengguna ke halaman otorisasi Spotify
      window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
      )}&response_type=token&scope=${SCOPES.join("%20")}`;
    }
  }, []);
  const handleSearch = async () => {
    let endpoint = `https://api.spotify.com/v1/search?q=${searchSong}&type=track&limit=10`;
    // Objek konfigurasi untuk Fetch API
    const requestOptions = {
      method: "GET", // Ganti dengan metode permintaan yang sesuai (GET, POST, dll.)
      headers: {
        Authorization: `Bearer ${accessToken}`, // Menambahkan Bearer token ke header
        "Content-Type": "application/json", // Jika menggunakan metode POST atau PUT, sesuaikan dengan tipe konten yang sesuai
      },
    };
    let res = await fetch(endpoint, requestOptions).then((res) => res.json());
    setSeachResult(res.tracks.items);
    try {
    } catch (error) {}
  };
  useEffect(() => {
    const requestOptions = {
      method: "GET", // Ganti dengan metode permintaan yang sesuai (GET, POST, dll.)
      headers: {
        Authorization: `Bearer ${accessToken}`, // Menambahkan Bearer token ke header
        "Content-Type": "application/json", // Jika menggunakan metode POST atau PUT, sesuaikan dengan tipe konten yang sesuai
      },
    };
    const getCategories = async () => {
      let endpoint = `https://api.spotify.com/v1/browse/categories?country=ID&locale=id_ID&limit=10`;
      try {
        let res = await fetch(endpoint, requestOptions).then((res) =>
          res.json()
        );
        setCategories(res.categories.items);
      } catch (error) {
        console.error(error);
      }
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
    const getLandingPageData = async () => {
      // Setel token akses ke Spotify Web API jika sudah didapatkan
      if (accessToken) {
        await getCategories();
        await getRecommend();
        await getUsers();
        await getPlaylist();
      }
    };
    getLandingPageData();
  }, [accessToken]);

  return (
    <>
      <div>
        <Navbar />
        {/* Main content */}
        <div className="main">
          <div className="main-container">
            <div className="section-container">
              <div className="section-header">Pencarian</div>
            </div>
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchBar}
                placeholder="What do you want to listen to?"
                onChange={(e) => {
                  setSeachResult([]);
                  setSearchSong(e.target.value);
                }}
              ></input>
              <button className={styles.searchBtn} onClick={handleSearch}>
                Cari
              </button>
            </div>
            {searchSong && searchResult.length > 0 ? (
              <div className={styles.searchResultContainer}>
                Hasil Pencarian
                {searchResult?.map((song) => {
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
            ) : null}
            <div className="section-container">
              <div
                className="section-header"
                onClick={() => {
                  setTabbing({
                    ...tabbing,
                    category: true,
                    recommendation: false,
                    playlist: false,
                  });
                }}
              >
                Kategori
              </div>
              <div
                className="section-header"
                onClick={() => {
                  navigate("/recommendation", {
                    state: {
                      accessToken,
                    },
                  });
                }}
              >
                Rekomendasi
              </div>
              <div
                className="section-header"
                onClick={() => {
                  navigate("/create-playlist", {
                    state: {
                      accessToken,
                    },
                  });
                  // setTabbing({
                  //   ...tabbing,
                  //   category: false,
                  //   playlist: true,
                  //   recommendation: false,
                  // });
                }}
              >
                Playlist
              </div>
            </div>
            {tabbing.category ? (
              <>
                <div className={styles.container}>
                  {categories?.map((category) => {
                    return (
                      <CardCategories key={category?.id} category={category} />
                    );
                  })}
                </div>
              </>
            ) : null}
            {tabbing.recommendation ? (
              <>
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
              </>
            ) : null}
            {tabbing.playlist ? (
              <>
                <div className={styles.playlistContainer}>
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
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
