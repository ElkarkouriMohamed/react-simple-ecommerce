import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase"; // Adjust the path as necessary
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ReactComponent as UserIcon} from '../../icons/userIcon.svg';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../../footer/Footer";

export default function SignInWithEmail() {
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const emailIsValidMessage = 'The email address is not valid.';

  const getErrorMessage = (code) => {
    const messages = {
      // "auth/invalid-credential": "Invalid credentials. Please try again.",
      "auth/user-not-found": "No user found with this email.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/invalid-email": "The email address is not valid.",
    };

    setErrorMessage(
      messages[code] || "An unknown error occurred. Please try again."
    );
  };

  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // setIsValid(emailRegex.test(email));
    console.log('regex:', emailRegex.test(value))
    if (name === 'email') {
      !emailRegex.test(value) ? setEmailIsValid(false) : setEmailIsValid(true);
    } else {
      value.length < 8 ? setPasswordIsValid(false) : setPasswordIsValid(true);
    }
    setUser({...user, [name]: value});
    setErrorMessage("");
  }
  //'med@gmail.com', 'med@2002'
  const handleSignIn = async () => {
    console.log('email: ', emailIsValid);
    console.log('password: ', passwordIsValid);
    
    if ((emailIsValid && user.email.length > 0) && (passwordIsValid && user.password.length > 0)) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        navigate('/');
      } catch (err) {
        getErrorMessage(err.code);
      }
    }
  };

  return (
      <div className="sign-in-email mt-[56px] sm:mt-[72px] h-[calc(100vh-56px)] sm:h-[calc(100vh-72px)]">
        <div className="coverImage"></div>
        <div className="main">
          <div className="welcome-text">
            <span>Welcome back</span>
          </div>
          <div className="flex flex-col justify-center h-100">
            <div className="userIcon">
              <UserIcon />
            </div>
            {/* <div>email or password is incorrect!</div> */}
            {
              errorMessage.length > 0 &&
              <div className="error-message text-red-600 text-center">
                {errorMessage}
              </div>
            }
            <div className="login-form">
              <div className="form-email">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  id="email"
                  placeholder="Email"
                />
                {
                  !emailIsValid && 
                  <div className="email-errors text-red-600">
                  {emailIsValidMessage}
                  </div>
                }
              </div>
              <div className="form-password">
                <input
                  type="password"
                  onChange={(e) => handleChange(e)}
                  id="password"
                  placeholder="Password"
                />
                {
                  !passwordIsValid &&
                  <div className="passowrd-errors text-red-600">Use at least 8 characters.</div>
                }
              </div>
              <motion.button
                initial={{ backgroundColor: '#686D76' }}
                whileHover={{ backgroundColor: '#343131', scale: 1.05 }}
                whileTap={{ backgroundColor: '#343131', scale: 1.05 }}
                transition={{ 
                  duration: .5,
                  // type: 'spring'
                }}
                className="submit-button"
                onClick={() => handleSignIn()}
              >
                Login
              </motion.button>
            </div>  
            <div className="forgot-password">
              <Link to='/password-reset'>Forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
  );
}

