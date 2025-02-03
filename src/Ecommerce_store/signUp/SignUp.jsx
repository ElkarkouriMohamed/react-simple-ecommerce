import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SignInWithGoogle from "../signIn/withGoogle/SignInWithGoogle";
import "../css/signUp.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Footer from "../footer/Footer";

export default function SignUp() {
    const [isValid, setIsvalid] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    //!emailIsValid ? element.classList.add('input-not-valid') : element.classList.remove('input-not-valid');
    useEffect(() => {
    }, []);

    const validateField = (e) => {
        const el = e.target ?? e ;
        let { id, value } = el;
        value = value.trim();
        switch (id) {
            case "firstNameId":
                value.length > 0
                    ? el.classList.remove("input-not-valid")
                    : el.classList.add("input-not-valid")
                break;
            case "lastNameId":
                value.length > 0
                    ? el.classList.remove("input-not-valid")
                    : el.classList.add("input-not-valid")
                break;
            case "emailId":
                emailRegex.test(value) > 0
                    ? el.classList.remove("input-not-valid")
                    : el.classList.add("input-not-valid")
                break;
            case "passwordId":
                value.length < 8
                    ? el.classList.add("input-not-valid")
                    : el.classList.remove("input-not-valid")
                break;
            default:
                break;
        }
    };

    const handleChange = (e) => {
        validateField(e);
        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        const isValidForm = 
            firstName.length > 0 && 
            lastName.length > 0 && 
            password.length >= 8 && 
            emailRegex.test(email);
        console.log(isValidForm)
        setIsvalid(isValidForm);

        setFormData({firstName, lastName, email, password});
    };
    const handleSignUp = async () => {
        const inputs = document.querySelectorAll('.sign-up .form input');
        inputs.forEach(i => validateField(i));
        if (isValid) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                await updateProfile(userCredential.user, {
                    displayName: `${formData.firstName} ${formData.lastName}`,
                });
                // const userCredential = await createUserWithEmailAndPassword(auth, 'youssef@gmail.com', 'med@2002');
                const user = userCredential.user;
                console.log("Successfully created user:", user);
                console.log('sign-up done');
            } catch (error) {
                console.log(error.code);
            }
        }
    };
    const getErrorMessage = (code) => {
        const messages = {
            "auth/invalid-email": "Invalid email",
            "auth/user-not-found": "No user found with this email.",
            "auth/too-many-requests": "Too many requests.", // Firebase temporarily blocks the account.
            "auth/network-request-failed": "A network error.",
            "auth/missing-email": "The email field is empty or missing.",
        };
        return messages[code] || "An unknown error occurred. Please try again.";
    };
    return (
            <div className="sign-in-email sign-up mt-[56px] sm:mt-[72px] h-[calc(100vh-56px)] sm:h-[calc(100vh-72px)]">
                <div className="coverImage"></div>
                <div className="main justify-center items-center">
                    <div className="template p-4 flex flex-col">
                        <div className="title">Sign up</div>
                        <SignInWithGoogle />
                        <div className="or-line flex items-center">
                            <hr className=".sign-up .main .templateleft w-full" />
                            <span className="px-3">Or</span>
                            <hr className="w-full" />
                        </div>
                        <div className="form flex flex-col gap-3">
                            <div className="full-name flex justify-between">
                                <div>
                                    <label htmlFor="firstNameId">First Name</label>
                                    <input
                                        type="text"
                                        id="firstNameId"
                                        className="w-full"
                                        onChange={(e) => handleChange(e)}
                                        ref={firstNameRef}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastNameId">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastNameId"
                                        className="w-full"
                                        onChange={(e) => handleChange(e)}
                                        ref={lastNameRef}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="emailId">Email Address</label>
                                <input
                                    type="text"
                                    id="emailId"
                                    onChange={(e) => handleChange(e)}
                                    ref={emailRef}
                                    
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="passwordId">Password</label>
                                <input
                                    type="password"
                                    id="passwordId"
                                    onChange={(e) => handleChange(e)}
                                    ref={passwordRef}
                                />
                            </div>
                        </div>
                        <button
                            className="sign-up-button btn mt-3 mx-auto"
                            onClick={() => handleSignUp()}
                        >
                            Create Account
                        </button>
                        <div className="sign-in-back mt-3 text-center">
                            Already have an account?{" "}
                            <Link className="" to="/sign-in">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}
