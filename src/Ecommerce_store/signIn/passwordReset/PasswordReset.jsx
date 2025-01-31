import { useEffect, useRef, useState } from "react";
import "../../css/forgot-password.css";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

export default function PasswordReset() {
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const emailRef = useRef();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    !emailRegex.test(email) ? setEmailIsValid(false) : setEmailIsValid(true);
    setMessage('');
  }, [email]);

  const handleReset = async () => {
    if (emailIsValid) {
        try {
            await sendPasswordResetEmail(auth, email);
            emailRef.current.placeholder = 'Password reset sent successfully';
            setEmail('');
        } catch (err) {
            setMessage(getErrorMessage(err.code));
        }
    }
  }

  const getErrorMessage = (code) => {
    const messages = {
        'auth/invalid-email': 'Invalid email',
        'auth/user-not-found': 'No user found with this email.',
        'auth/too-many-requests':	'Too many requests.', // Firebase temporarily blocks the account.
        'auth/network-request-failed': 'A network error.',
        'auth/missing-email': 'The email field is empty or missing.',
    }
    return messages[code] || "An unknown error occurred. Please try again.";
  }
  return (
    <div className="sign-in-email forgot-password">
      <div className="coverImage"></div>
      <div className="main justify-center items-center">
        <div className="form flex flex-col">
          <div className="title">
            Forgot <br />
            Your Password ?
          </div>
          <div className="reset-input">
            <input
              type="text"
              ref={emailRef}
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!emailIsValid && email.length !== 0 ? (
              <div className="text-red-600">The email address is not valid.</div>
            ) : (
              message.length > 0 && <div className="text-red-600">{message}</div>
            )}
          </div>
          <div className="buttons flex flex-col gap-3">
            <button className="reset-button p-2 rounded-lg" onClick={handleReset}>
              Reset Password
            </button>
            <div className="text-center">
              <Link to="/sign-in-email">Back to sign-in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
