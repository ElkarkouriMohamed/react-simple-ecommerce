import { useState } from 'react';
import { signWithGoogle } from '../../../firebase/firebase';
import googleIcon from "../../icons/google.svg";
import { useNavigate } from 'react-router-dom';

const SignInWithGoogle = () => {
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try { 
            await signWithGoogle();
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <button className="google" onClick={() => handleSignIn()}>
            <img src={googleIcon} alt="google" />
            <span>Continue with Google</span>
        </button>
    );
};
export default SignInWithGoogle;


  
