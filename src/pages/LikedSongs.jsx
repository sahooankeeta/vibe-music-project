import React from 'react'
import { useSelector } from 'react-redux'
import { SongBar,Empty,Loader } from '../components'
const LikedSongs = () => {
    const {activeSong,isPlaying}=useSelector(state=>state.player)
    const {user,isLoading,error}=useSelector(state=>state.user)
    if(isLoading)
     return <Loader/>
    if(error)
      return <Error/>
    if(user.liked_songs?.length==0)
      return <Empty/>
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Liked Songs :</h1>
      <div className="mt-6 w-full flex flex-col">
        {user.liked_songs?.map((song, i) => (
          <SongBar
            key={`${song.key}-${i}`}
            song={song}
            data={user.liked_songs}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            email={user.email}
          />
        ))}
      </div>
    </div>
  )
}

export default LikedSongs