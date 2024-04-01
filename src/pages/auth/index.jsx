import React from 'react';
import {auth,provider}  from '../../config/firebase-config';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {

  const navigate = useNavigate();

  const signInWithGoogle = async () =>{
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth",JSON.stringify(authInfo));
    navigate("/expense-tracker");
  }

  return (
    <div className='login-page'>
      <p>Sign in With Google to Continue</p>
      <button className='google-btn' onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}


