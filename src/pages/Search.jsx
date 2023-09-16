import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import { createSongCard } from '../utils/helper';
const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {user}=useSelector(state=>state.user)
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  console.log(data)
  const songs = data?.tracks?.hits.map((song) => createSongCard({title:song.heading?.title,subtitle:song.heading?.subtitle,key:song.key,artistId:song.artists[0]?.adamid,image:song.images?.default,audio:song.stores?.apple?.previewurl}));
  
  if (isFetching) return <Loader title={`Searching ${searchTerm}...`} />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Showing results for <span className="font-black">{searchTerm}</span></h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songs}
            i={i}
            email={user.email}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;