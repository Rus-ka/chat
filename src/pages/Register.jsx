import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';


export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit= async(e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
  
    try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // const storageRef = ref(storage, displayName);

    const storageRef = ref(storage, `${displayName}`);

    // const uploadTask = uploadBytesResumable(storageRef, file);

    // uploadTask.on(

      // (error) => {
      //   setErr(true);
      // }, 
      // () => {
       // getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
      await uploadBytesResumable(storageRef, file).then(() => {  
       
       getDownloadURL(storageRef).then( async(downloadURL) => {

        try {
          await updateProfile (res.user,{
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });


          await setDoc(doc(db, 'userChats', res.user.uid), {});

          navigate('/');
        } catch (err) {
          console.log(err);
          setErr(true);
        }
      });
    });

    } catch (err){
      setErr(true);
    }
  

  };

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Rus_ka Chat</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type = 'text' placeholder='display name'/>
                <input type = 'email' placeholder='email'/>
                <input type = 'password' placeholder='password'/>
                <input style = {{display:'none'}} type = 'file' id='file'/>
                <label htmlFor='file'>
                    <img src ='https://www.svgrepo.com/show/498515/user-cirlce-add.svg' alt ='avatar'/>
                    <span>load avatar</span>
                </label>
                {err && <span>OOPS! Something wet wrong</span>}
                <button>Sign up</button>
            </form>
            <p><Link to = "/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register;