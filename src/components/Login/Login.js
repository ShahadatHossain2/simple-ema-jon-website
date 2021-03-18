
import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import firebaseConfig from "./Firebase.config";

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }

const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const provider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      photo: '',
      email: ''
  
    })
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const handleSignIn = () => {
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          const { displayName, email, photoURL } = result.user;
          const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
          }
  
          setUser(signedInUser);
        })
        .catch(err => {
          console.log(err);
        })
    }
  
    const handleSignOut = () => {
      firebase.auth().signOut()
        .then(result => {
          const signedOutUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: '',
            error: '',
            success: false
          }
  
          setUser(signedOutUser);
        })
        .catch(err => {
          console.log(err.message);
        })
    }
    const handleBlur = (e) => {
      let isFormValid = true;
      if (e.target.name === "email") {
        const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
        isFormValid = isEmailValid;
      }
      if (e.target.name === "password") {
        const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(e.target.value);
        isFormValid = isPasswordValid;
      }
      if (isFormValid) {
        const newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
      }
    }

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
  
    const handleSubmit = (e) => {
      if (newUser && user.email && user.password) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            const newUserInfo = { ...user };
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            updateUser(user.name);
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            const newUserInfo = { ...user };
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            setUser(newUserInfo);
          });
      }
  
      if (!newUser && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            const newUserInfo = { ...user };
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from);
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            const newUserInfo = { ...user };
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            setUser(newUserInfo);
          });
      }
  
      e.preventDefault();
    }
  
    const updateUser = (name) => {
      var user = firebase.auth().currentUser;
  
      user.updateProfile({
        displayName: name,
      })
        .then(function () {
          console.log("Updated name successfully")
        })
        .catch(function (error) {
          console.log(error)
        });
    }
    const handleFbSignIn = () => {
      firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
  
          // The signed-in user info.
          var user = result.user;
          console.log("fb user after sign in", result);
  
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var accessToken = credential.accessToken;
  
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(errorMessage);
          // ...
        });
    }
    return (
      <div style={{textAlign:'center'}}>
        {
          user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> : <button onClick={handleSignIn}>Sign in</button>
        }
        {
          user.isSignedIn && <div>
            <p>Welcome {user.name}</p>
            <p>Your email : {user.email}</p>
            <img src={user.photo} alt="" />
          </div>
        }
        <br />
        <button onClick={handleFbSignIn}>Sign in using Facebook</button>
        <br />
        <br />
        <form>
          <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
          <label htmlFor="newUser">Are you new?</label>
          <br />
          {
            newUser && <input type="text" name="name" id="" onBlur={handleBlur} placeholder="your name" />
          }
          <br />
          <input type="text" name="email" id="" onBlur={handleBlur} placeholder="Your email" required />
          <br />
          <input type="password" name="password" id="" onBlur={handleBlur} placeholder="Your password" required />
          <br />
          <input type="submit" onClick={handleSubmit} value={newUser ? "Sign up" : "Sign in"} />
        </form>
        <p style={{ color: 'red' }}>{user.error}</p>
        {
          user.success &&
          <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'login'} Successfully!</p>
        }
      </div>
    );
  }

export default Login;