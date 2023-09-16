import {Loader,Error,SongCard,ArtistCard} from "../components"
import {genres} from "../assets/constants"
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { createSongCard } from "../utils/helper";
import { useState } from "react";
const Discover = () => {
    const dispatch=useDispatch()
    const {isPlaying,activeSong,genreListId}=useSelector(state=>state.player)
    const {user}=useSelector(state=>state.user)
    console.log("docover",user.email)
    const genreTitle=genres.find(({value})=>value===genreListId)?.title
    const {data,error,isFetching}=useGetTopChartsQuery(genreListId || 'POP')
    const tracks=data?.tracks?.map(item=>createSongCard({title:item.title,subtitle:item.subtitle,key:item.key,audio:item?.hub?.actions[1]?.uri,artistId:item.artists[0]?.adamid,image:item.images?.coverart}))
    if(isFetching)
     return <Loader/>
    if(error)
     return <Error/>
    return (
        <>
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">
                   Discover {genreTitle}
                </h2>
                <select 
                onChange={(e)=>{dispatch(selectGenreListId(e.target.value))}}
                className="bg-black text-gray-300 p-3 text-sm rouded-lg outline-none sm:mt-0 mt-5">
                    {genres.map(genre=><option value={genre.value} key={genre.value}>{genre.title}</option>)}
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
              {tracks.map((song,i)=>
              <SongCard
              key={song.key}
              song={song}
              data={tracks}
              activeSong={activeSong}
              isPlaying={isPlaying}
              i={i}
              email={user.email}
              />)}
            </div>
        </div>
        <div className="flex flex-col">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className="font-bold text-3xl text-white text-left">
               Artists
            </h2>
            {/* <select 
            onChange={(e)=>{dispatch(selectGenreListId(e.target.value))}}
            className="bg-black text-gray-300 p-3 text-sm rouded-lg outline-none sm:mt-0 mt-5">
                {genres.map(genre=><option value={genre.value} key={genre.value}>{genre.title}</option>)}
            </select> */}
        </div>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data?.tracks?.map((song,i)=>
          <ArtistCard
          key={`ss-${song.key}`}
          track={song}
          />)}
        </div>
    </div>
    </>
    )
};

export default Discover;
