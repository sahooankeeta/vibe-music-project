import React from 'react';

import SongBar from './SongBar';

const RelatedSongs = ({ data, artistId, isPlaying, activeSong}) => {
  console.log("tttttttt",artistId)
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => (
          <SongBar
            key={`${artistId}-${song.key}-${i}`}
            song={song}
            data={data}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            
          />
        ))}
      </div>
    </div>
  )
};

export default RelatedSongs;