import React from "react";

function Login() {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFYID;
  const REDIRECT_URI = "http://localhost:3000";
  const SCOPES = [
    "user-read-private",
    "user-read-email",
    "user-library-read",
    "playlist-modify-public",
    "playlist-modify-private",
  ]; // Sesuaikan dengan izin yang Anda butuhkan
  const handleLogin = () => {
    window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=token&scope=${SCOPES.join("%20")}`;
  };
  return (
    <>
      <div>Click button below</div>
      <div
        onClick={handleLogin}
        style={{
          display: "inline-block",
          padding: "20px",
          backgroundColor: "green",
          cursor: "pointer",
        }}
      >
        Login
      </div>
    </>
  );
}

export default Login;
