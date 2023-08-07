import React, { useState, useEffect } from "react";

const CLIENT_ID = process.env.REACT_APP_SPOTIFYID;
const REDIRECT_URI = "http://localhost:3000";
const SCOPES = ["user-read-private", "user-read-email"]; // Sesuaikan dengan izin yang Anda butuhkan

const SpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  useEffect(() => {
    // Setel token akses ke Spotify Web API jika sudah didapatkan
    if (accessToken) {
      //   spotifyApi.setAccessToken(accessToken);
    }
  }, [accessToken]);

  //   const handleSearch = async () => {
  //     try {
  //       // Contoh penggunaan API Spotify setelah mendapatkan token akses
  //       const response = await spotifyApi.searchTracks("Despacito");
  //       console.log(response);
  //     } catch (err) {
  //       setError("Terjadi kesalahan saat mencari lagu.");
  //     }
  //   };
  console.log(accessToken);
  return (
    <div>
      {accessToken ? (
        <>
          <p>Token Akses: {accessToken}</p>
          {/* <button onClick={handleSearch}>Cari Lagu</button> */}
        </>
      ) : (
        <p>Memuat... Harap tunggu.</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SpotifyAuth;
