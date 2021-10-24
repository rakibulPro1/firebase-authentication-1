import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import "./App.css";
import initializeAuthentication from "./firebase/firebase.init";
import { useState } from "react";

initializeAuthentication();

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState("");

  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  // handle registration
  const handleRegistration = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("password must be at least 2 characters Uppercase");
    }
    if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("password must be at least 2 digit");
    }

    // handle login and register user
    const processLogin = (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setError("");
        })
        .catch((error) => {
          setError(error.message);
        });
    };
    const registerNewUser = (email, password) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setError("");
          verifyEmail();
          setVerifyMessage("Please Verify Your Email. Check your email");
          alert(verifyMessage);
          // set user name
          setUserName();
        })
        .catch((error) => {
          setError(error.message);
        });
    };
    if (isLogin) {
      processLogin(email, password);
    } else {
      registerNewUser(email, password);
    }
  };

  // set user name
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  // handle Name
  const handleName = (e) => {
    setName(e.target.value);
  };

  // handle email
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  //handle password
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  // handle toggle loged in
  const handleToggleLogedIn = (e) => {
    setIsLogin(e.target.checked);
  };

  // send email verification
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // email verification
    });
  };

  // handle reset password
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      // Password reset email sent!
      // ..
    });
  };
  return (
    <div>
      <div className="w-50 mx-auto mt-5">
        <h3 className="text-center mb-4">
          Please {isLogin ? "Login" : "Register"}
        </h3>
        <form onSubmit={handleRegistration}>
          <div className="row mb-3">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                onBlur={handleName}
                type="email"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                onBlur={handleEmail}
                type="email"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                onBlur={handlePassword}
                type="password"
                className="form-control"
                id="inputPassword3"
              />
            </div>
          </div>
          <div className="row mb-3 text-danger">
            <div className="col-sm-2"></div>
            <div className="col-sm-10">{error}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <div className="form-check">
                <input
                  onChange={handleToggleLogedIn}
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck1"
                />
                <label className="form-check-label" htmlFor="gridCheck1">
                  Already have an Account?
                </label>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              {isLogin ? "Login" : "Register"}
            </button>
            <button
              onClick={handleResetPassword}
              className="btn btn-md btn-primary ms-3"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default App;
