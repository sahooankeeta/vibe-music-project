import { signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
import { collection,where,query,getDocs,addDoc,updateDoc,doc} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import notify from"../utils/notify"
import {auth,db} from "../firebase"
const userCollectionRef=collection(db,"users")
// console.log(userCollectionRef)
// console.log(await getDocs(query(userCollectionRef, where("email", "==", "39ankeeta@gmail.com"))))
export const handleLogin=createAsyncThunk("user/login",async(form)=>{
  const data=   await signInWithEmailAndPassword(auth, form.email, form.password)
  .then(async(userCredential) => {
      const user=userCredential.user
      const q=query(userCollectionRef,where("email","==",user.email))
      const querySnapshot = await getDocs(q);
      //console.log(querySnapshot.empty,querySnapshot.size,querySnapshot.docs[0].data())
      if(!querySnapshot.empty)
      return {
          user:querySnapshot.docs[0].data(),
          error:null
      }
      else 
        return {
          user:null,
          error:"user not found"
      }
  }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
          user:null,
          error:errorMessage
      }
  })
  return data
})
export const handleSignup=createAsyncThunk("user/signup",async(form)=>{
  const data=await createUserWithEmailAndPassword(auth, form.email, form.password)
  .then(async(userCredential) => {
      const user = userCredential.user;
      const q=query(userCollectionRef,where("email","==",user.email))
      const querySnapshot = await getDocs(q);
      if(querySnapshot.empty)
      {
       const newUser={
        authProvider:'local',
        email:user.email,
        uid:user.uid,
        name:user.email.split("@")[0],
        liked_songs:[]
       }
       const newUserSnapshot=await addDoc(userCollectionRef,newUser)
       .then(docref=>{
        console.log("new user created")
        return {user:newUser,error:null}
       }).catch(e=>{
        console.log(e.message)
        return {
          user:null,error:e.message
        }
       })
       return newUserSnapshot
      }else
      return {
        user:querySnapshot.docs[0].data(),
        error:null
      }
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return {
        user:null,
        error:errorMessage
      }
  });
  return data
})
export const handleResetPassword=createAsyncThunk("user/reset-password",async(email)=>{
  const data=await sendPasswordResetEmail(auth, email)
  .then((ans) => {
    console.log(ans)
    
    return {
      error:null
    }
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return {
      error:errorMessage
    }
});
return data
})
export const handleGoogleAuthentication=createAsyncThunk("user/google-auth",async()=>{
  const data=await signInWithPopup(auth, new GoogleAuthProvider())
  .then(async(result) => {
    console.log(result)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    const q=query(userCollectionRef,where("email","==",user.email))
      const querySnapshot = await getDocs(q);
      if(querySnapshot.empty)
      {
        const newUser={
          authProvider:'google',
          email:user.email,
          uid:user.uid,
          name:user.displayName,
          liked_songs:[]
         }
         const newUserSnapshot=await addDoc(userCollectionRef,newUser)
         .then(docref=>{
          console.log("new google user created")
          return {user:newUser,error:null}
         }).catch(e=>{
          console.log(e.message)
          return {
            user:null,error:e.message
          }
         })
         return newUserSnapshot
      }else
      return {
        user:querySnapshot.docs[0].data(),
        error:null
      }
    
  }).catch((error) => {
    console.log(error)
    return {
      error:error.message
    }
  });
   return data
})
export const handleLogout=createAsyncThunk("user/logout",async () => {
  const data=await signOut(auth)
  .then(() => {
        console.log("Signed out successfully")
        return {
          error:null,
          user:null
        }
    }).catch((error) => {
     console.log(error)
     return{
      error:error.message,
      user:null
     }
    });
    return data
})
export const handleLikeSongs=createAsyncThunk("user/likes",async({song,email})=>{
  try{
    console.log(song,"email",email)
    const q=query(userCollectionRef,where("email","==",email))
    const querySnapshot = await getDocs(q);
    console.log(email,querySnapshot.docs)
    if(!querySnapshot.empty){
      const userDocument=querySnapshot.docs[0].data()
      const userId=querySnapshot.docs[0].id
      console.log("user found",userDocument)
      let liked_songs=userDocument.liked_songs;
     const songIndex=liked_songs.findIndex(i=>i.title===song.title)
     console.log(songIndex)
     if(songIndex==-1){
       liked_songs.push(song) 
     }else{
      liked_songs.splice(songIndex,1)
     }
     let song_ids=[]
     liked_songs.forEach(i=>song_ids.push(i.title))
     console.log("liked",liked_songs)
     const docss=doc(db,"users",userId)
     console.log("docccc",docss,liked_songs)
     const updatedDoc=await updateDoc(docss,{liked_songs})
     .then(docRef=>{
      console.log("doc updated")
       return {
        liked_songs,
        song_ids,
        error:null
       }
     }).catch(e=>{
      console.log(e)
      return {
        liked_songs,
        song_ids,
        error:e.message}
     })
     return updatedDoc
    }else
     return {error:"no user found"}
  }catch(e){
    console.log(e)
    return {error:e.message}
  }
  
})
// export const getAllLikes=createAsyncThunk("user/all-likes",async({email})=>{
//   const q=query(userCollectionRef,where("email","==",email))
//   const querySnapshot = await getDocs(q);
//   if(!querySnapshot.empty){
//     const userDocument=querySnapshot.docs[0].data()
//     return {
//       liked_songs:userDocument.liked_songs,
//       error:null
//     }
//   }else return {
//     liked_songs:[],
//     error:'No user found'
//   }
// })