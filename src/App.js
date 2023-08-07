import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SongsDetails from "./pages/SongsDetails";
import Exercise from "./pages/Exercise";
import SpotifyAuth from "./pages/SpotifyAuth";
import Playlist from "./pages/Playlists/Playlist";
import Login from "./pages/Login/Login";
import Recommendation from "./pages/Recommendation/Recommendation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/authSpotify" element={<SpotifyAuth />}></Route>
          <Route path="/songs/:id" element={<SongsDetails />}></Route>
          <Route path="/exercise2" element={<Exercise />}></Route>
          <Route path="/create-playlist" element={<Playlist />}></Route>
          <Route path="/recommendation" element={<Recommendation />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
