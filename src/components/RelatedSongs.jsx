import React from 'react';

import {SongBar,Empty} from "../components"
import { useSelector } from 'react-redux';

const RelatedSongs = ({ data, artistId, isPlaying, activeSong}) => {
  console.log("tttttttt",artistId)
  const {user}=useSelector(state=>state.user)
  if(!data || data?.length==0)
    return <Empty/>
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
            email={user.email}
          />
        ))}
      </div>
    </div>
  )
};

export default RelatedSongs;