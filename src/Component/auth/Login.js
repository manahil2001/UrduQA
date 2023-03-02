import React, { useState } from "react";
import "./Login.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { auth, provider } from "../../firebase";
import  {useNavigate} from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();
  const signIn = () => {
    auth.signInWithPopup(provider).catch((e) => {
      alert(e.message).then(navigate ("/UrduQA"));
      
    });
  };

  
  const handleSignIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
      })
      .catch((e) => alert(e.message)).then(navigate ("/UrduQA"));
  };

  const registerSignIn = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          console.log(auth);
        }
      })
      .catch((e) => alert(e.message)).then(navigate ("/UrduQA"));
  };
  return (
    <div className="login">
      <div className="login_container">
        <div className="login_logo">
          <img
            src="https://e7.pngegg.com/pngimages/779/586/png-clipart-letter-case-u-alphabet-word-us-letter-size-english-rectangle-thumbnail.png"
            alt=""
          />
        </div>
        <div className="login_desc">
          <p>A Place to Share knowledge and better understand the world</p>
        </div>
        <div className="login_auth">
          <div className="login_authOptions">
            <div className="login_authOption">
              <img
                className="login_googleAuth"
                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                alt=""
              />
              <p onClick={signIn}>Continue With Google</p>
            </div>
            
            <div className="login_authDesc">
              <p>
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Sign Up With Email
                </span>
                . By continuing you indicate that you have read and agree to
                UrduQA's.
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Terms of Service{" "}
                </span>
                and{" "}
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
          <div className="login_emailPass">
            <div className="login_label">
              <h4>Login</h4>
            </div>
            <div className="login_inputFields">
              <div className="login_inputField">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login_inputField">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login_forgButt">
              <small>Forgot Password?</small>
              <button onClick={handleSignIn}>Login</button>

            </div>
            <button onClick={registerSignIn}>Register</button>
          </div>
        </div>
        <div className="login_lang">
          <p>اردو</p>
          <ChevronRightIcon fontSize="small" />
        </div>
        <div className="login_footer">
          
          <p>&copy; UrduQA 2023</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
