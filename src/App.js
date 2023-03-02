import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import "./App.css";
import Login from "./Component/auth/Login";
import UrduQA from "./Component/UrduQA";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./firebase";
import { login, logout } from "./reducers/userSlice";

function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            photo: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
      console.log(authUser);
    });
  }, [dispatch]);
  return( 
  <div className="app">
  <Router>
  <Routes>  
         <Route path="/" element = {<Login />} />        
         
          
          
         <Route path="*" element = { <UrduQA />} />
  </Routes>
            </Router>
</div>
  );
 
}

export default App;
