import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery,useGetArtistTopTracksQuery } from '../redux/services/shazamCore';
import { setActiveSong,playPause } from '../redux/features/playerSlice';
import { createSongCard } from '../utils/hepler';
const ArtistDetails = () => {
  const {id : artistId}=useParams()
  const {data : artistData,isFetching : isFetchindArtist,error : aristsError}=useGetArtistDetailsQuery(artistId)
  const {data,isFetching,error}=useGetArtistTopTracksQuery(artistId)
 const tracks= data?.data?.map(item=>createSongCard({title:item.attributes?.name,subtitle:item.attributes?.albumName,key:item.key,audio:item.attributes.previews[0].url,artistId,image:item.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125')}))
  const {isPlaying,activeSong}=useSelector(state=>state.player)
  console.log(tracks)
  const dispatch = useDispatch()

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = ({song,data,i}) => {
    dispatch(setActiveSong({song,data,i}))
    dispatch(playPause(true))
  };
  return (
    <div className="flex flex-col">
      {isFetchindArtist?<Loader/>:aristsError? <Error/> : 
      <DetailsHeader
        artistId={artistId}
        artistData={artistData?.data[0]}
      />
       }
       {isFetching? <Loader/>:error? <Error/>:
      <RelatedSongs
        data={tracks}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
      }
    </div>
  )
};

export default ArtistDetails;
