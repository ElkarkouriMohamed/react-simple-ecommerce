import "../css/signIn.css";
import SignInWithGoogle from "./withGoogle/SignInWithGoogle";
import { Link, useNavigate } from "react-router-dom";
import emailIcon from "../icons/email.svg";

export default function SignIn() {
  const navigate = useNavigate();
  return (
    <div className="sign-in-home">
      <div className="coverImage"></div>
      <div className="signIn-methods-container">
        <div className="login-title">Log in</div>
        <div className="login-methods">
          <SignInWithGoogle />
          <button className="email" onClick={() => navigate("/sign-in-email")}>
            <img src={emailIcon} alt="email" />
            <span>Continue with email</span>
          </button>
        </div>
        <div className="sign-up-choice">
          Don't you have an account?{' '}
          <Link className="sing-up" to="/sign-up">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
