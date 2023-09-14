import { useSelector } from 'react-redux';
import { Route, Routes,Navigate } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts,Auth,Home,LikedSongs } from './pages';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const {user}=useSelector((state)=>state.auth)
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={!user?<Navigate to="/auth"/>:<Home />} >
      <Route path="/" element={<Discover/>}/>
      <Route path="/top-artists" element={<TopArtists />} />
      <Route path="/around-you" element={<AroundYou />} />
      <Route path="/artists/:id" element={<ArtistDetails />} />
      <Route path="/songs/:songid" element={<SongDetails />} />
      <Route path="/search/:searchTerm" element={<Search />} />
      <Route path="/liked" element={<LikedSongs />} />
      </Route>
    </Routes>
    </>
  );
};

export default App;
