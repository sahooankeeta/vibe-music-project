import { createSlice } from '@reduxjs/toolkit';
import notify from '../../utils/notify';
import { handleLogin,
    handleSignup,
    handleResetPassword,
    handleGoogleAuthentication,
    handleLogout,
    handleLikeSongs,
     } from '../../actions';
const initialState = {
    isLoading:false,
 user:JSON.parse(localStorage.getItem('user')),
 song_ids:JSON.parse(localStorage.getItem('user'))? JSON.parse(localStorage.getItem('user'))?.liked_songs?.map(i=>i.title) : [],
 error:null
};

const userSlice=createSlice({
    name: 'user',
    initialState,
    extraReducers(builder){
        builder
        .addCase(handleLogin.pending, (state, action) => {
            console.log("pending login",action.payload)
            state.isLoading = true;
        })
        .addCase(handleLogin.fulfilled, (state, action) => {
            console.log("done login",action.payload)
            state.isLoading = false;
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user))
            state.error = action.payload.error;
            action.payload.user.liked_songs.forEach(i=>state.song_ids.push(i.title))
            if(action.payload.error)
            notify("error",action.payload.error)
            else
            notify("success","login successful")
        })
        .addCase(handleLogin.rejected, (state, action) => {
            notify("error",action.payload.error)
            console.log("out login",action.payload)
            state.isLoading = false;
            state.error = action.payload.error;
        })
        .addCase(handleSignup.pending, (state, action) => {
            console.log("pending signup",action.payload)
            state.isLoading = true;
        })
        .addCase(handleSignup.fulfilled, (state, action) => {
            console.log("done signup",action.payload)
            state.isLoading = false;
            state.user = action.payload.user;
            state.error = action.payload.error;
            if(action.payload.error)
            notify("error",action.payload.error)
            else
            notify("success","signup successful")
        })
        .addCase(handleSignup.rejected, (state, action) => {
            console.log("out signup",action.payload)
            state.isLoading = false;
            state.error = action.payload.error;
            notify("error",action.payload.error)
        })
        .addCase(handleResetPassword.pending, (state, action) => {
            console.log("pending reset",action.payload)
            state.isLoading = true;
        })
        .addCase(handleResetPassword.fulfilled, (state, action) => {
            console.log("done reset",action.payload)
            state.isLoading = false;
            state.user = action.payload.user;
            state.error = action.payload.error;
            if(action.payload.error)
            notify("error",action.payload.error)
            else
            notify("success","Reset email sent")
        })
        .addCase(handleResetPassword.rejected, (state, action) => {
            console.log("out reset",action.payload)
            state.isLoading = false;
            state.error = action.payload.error;
            notify("error",action.payload.error)
        })
        .addCase(handleGoogleAuthentication.pending, (state, action) => {
            console.log("pending google",action.payload)
            state.isLoading = true;
        })
        .addCase(handleGoogleAuthentication.fulfilled, (state, action) => {
            console.log("done google",action.payload)
            state.isLoading = false;
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user))
            state.error = action.payload.error;
            action.payload.user.liked_songs.forEach(i=>state.song_ids.push(i.title))
            if(action.payload.error)
            notify("error",action.payload.error)
            else
            notify("success","Let's vibe")
        })
        .addCase(handleGoogleAuthentication.rejected, (state, action) => {
            console.log("out google",action.payload)
            state.isLoading = false;
            state.error = action.payload.error;
            notify("error",action.payload.error)
        })
        .addCase(handleLogout.pending, (state, action) => {
            console.log("pending logout",action.payload)
            state.isLoading = true;
        })
        .addCase(handleLogout.fulfilled, (state, action) => {
            console.log("done logout",action.payload)
            state.isLoading = false;
            state.user = action.payload.user;
            state.error = action.payload.error;
            localStorage.removeItem("user")
            if(action.payload.error)
            notify("error",action.payload.error)
            else
            notify("success","logout successful")
        })
        .addCase(handleLogout.rejected, (state, action) => {
            console.log("out logout",action.payload)
            state.isLoading = false;
            state.error = action.payload.error;
            notify("error",action.payload.error)
        })
        .addCase(handleLikeSongs.pending, (state, action) => {
            console.log("pending like",action.payload)
            state.isLoading = true;
        })
        .addCase(handleLikeSongs.fulfilled, (state, action) => {
            console.log("done like",action.payload)
            state.isLoading = false;
            state.song_ids=action.payload.song_ids
            state.user.liked_songs=action.payload.liked_songs
            localStorage.setItem("user",JSON.stringify(state.user))
            state.error = action.payload.error;
            if(action.payload.error)
            notify("error",action.payload.error)
            else
            notify("success","like successful")
        })
        .addCase(handleLikeSongs.rejected, (state, action) => {
            console.log("out like",action.payload)
            state.isLoading = false;
            state.error = action.payload.error;
            notify("error",action.payload.error)
        })
    }
})
export default userSlice.reducer;