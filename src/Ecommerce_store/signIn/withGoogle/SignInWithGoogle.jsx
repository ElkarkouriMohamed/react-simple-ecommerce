//import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from 'react';
import { signWithGoogle } from '../../../firebase/firebase';
import googleIcon from "../../icons/google.svg";


const SignInWithGoogle = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({name: '', email: ''})

    const handleSignIn = async () => {
        setLoading(true);
        try { 
            const user = await signWithGoogle();
            console.log(user);
            setUser({name: user.displayName, email: user.email});
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        //<button className='btn btn-primary' onClick={handleSignIn}>Connect With Google</button>
        <button className="google" onClick={() => handleSignIn()}>
            <img src={googleIcon} alt="google" />
            <span>Continue with Google</span>
        </button>
    );
};

export default SignInWithGoogle;


  
