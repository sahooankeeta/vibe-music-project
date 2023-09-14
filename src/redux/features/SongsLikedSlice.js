import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs:[],
  song_ids:[]
};

const SongsLikedSlice = createSlice({
  name: 'songs_liked',
  initialState,
  reducers: {
    setLikeSongs: (state, action) => {
        if(!state.song_ids.includes(action.payload.title))
        {
            state.songs.push(action.payload);
            state.song_ids.push(action.payload.title);
        }else{
            {
                state.songs=state.songs.filter(i=>i.title!==action.payload.title)
                state.song_ids=state.song_ids.filter(i=>i!==action.payload.title)
            }
        }
    }
  }
})
export const {setLikeSongs} =SongsLikedSlice.actions
export default SongsLikedSlice.reducer;