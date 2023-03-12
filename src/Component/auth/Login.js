import React, { useEffect, useState } from "react";
import "./Login.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/UrduQA");
    }
  }, [user, navigate]);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(() => navigate("/UrduQA"))
      .catch((e) => {
        alert(e.message);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
      })
      .then(() => navigate("/UrduQA"))
      .catch((e) => alert(e.message));
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
      .then(() => navigate("/UrduQA"))
      .catch((e) => alert(e.message));
  };

  const guestHandler = () => {
    dispatch(
      login({
        uid: 0,
        email: "guest",
        displayName: "GUEST",
        photo: "guest",
      })
    );
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
            <div className="login_authOption" onClick={signIn}>
              <img className="login_googleAuth" src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg" alt="" />
              <p>Continue With Google</p>
            </div>

            <div className="login_authDesc">
              <p>
                <span style={{ color: "blue", cursor: "pointer" }}>Sign Up With Email</span>. By continuing you indicate
                that you have read and agree to UrduQA's.
                <span style={{ color: "blue", cursor: "pointer" }}>Terms of Service </span>
                and <span style={{ color: "blue", cursor: "pointer" }}>Privacy Policy</span>.
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
                  style={{ width: "100%" }}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login_inputField">
                <input
                  style={{ width: "100%" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login_forgButt">
              <small>Forgot Password?</small>
            </div>

            <button onClick={handleSignIn}>Login</button>
            <button onClick={registerSignIn}>Register</button>
            <button
              onClick={guestHandler}
              style={{ padding: "9px", backgroundColor: "white", color: "black", border: "1px solid #ccc" }}
            >
              Continue as Guest
            </button>
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
