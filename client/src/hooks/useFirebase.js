import firebaseInIt from "../firebase/firebase.init.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
firebaseInIt();
const auth = getAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  //register
  function UserRegister(newUserData, history) {
    const { name, email, password } = newUserData;
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUserName(name);
        addUserToDB(name, email);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Registered",
          text: "Have a fun!",
          showConfirmButton: false,
          timer: 2000,
        });
        setUser(result.user);
        history.replace("/");
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops..",
          text: `${err.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => setLoading(false));
  }
  // add user to db
  function addUserToDB(name, email) {
    fetch("https://rocky-cliffs-16368.herokuapp.com/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((data) => {});
  }

  // set username
  function setUserName(name) {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((error) => {});
  }

  // Get the currently signed-in user

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribed;
  }, []);

  // login
  function userLogin({ email, password, history, redirect }) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Logged in!!",
          text: "Have a fun!",
          showConfirmButton: false,
          timer: 2000,
        });
        setUser(result.user);
        history.replace(redirect);
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops..",
          text: `${err.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => setLoading(false));
  }

  // logout
  function logout() {
    setLoading(true);
    signOut(auth)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Logged out!",
          text: "Have a fun!",
          showConfirmButton: false,
          timer: 2000,
        });
        setUser({});
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops..",
          text: `${err.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => setLoading(false));
  }

  return { UserRegister, ...user, loading, userLogin, logout };
};

export default useFirebase;
