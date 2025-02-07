import { useSelector } from "react-redux";
import userIcon from "../icons/userIcon.svg";
import { MapPinIcon, HeartIcon, ClockIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ShowIcon from "./ShowIcon";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { logout } from "../../firebase/firebase";

const UserProfile = ({ showProfile, handleProfileShow }) => {
    const { displayName, email, photoURL } = useSelector(state => state.user.userInfo);

    const accountOptions = [
        { 'text': 'Add your address', 'icon': MapPinIcon },
        { 'text': 'My wishlist', 'icon': HeartIcon },
        { 'text': 'Order history', 'icon': ClockIcon },
        { 'text': 'Add credit card', 'icon': CreditCardIcon },
    ]

    const handleLogout = async () => {
        try {
            await logout();
            console.log('logout with success!');
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <AnimatePresence>
            {   showProfile &&
                <motion.div className="w-[300px] bg-[#f9f9f9] fixed top-[64px] sm:top-[78px] right-[6px] z-20 px-4 py-6 rounded flex flex-col gap-4 shadow-lg"
                    initial={{ y: -10, opacity: .5 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: .4 }}
                    exit={{ opacity: .5, transition: { duration: .2 } }}
                    >
                    <div className="flex gap-3 items-center">
                        <div className="">
                            <img
                            src={`${photoURL}`}
                            alt="Profile"
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = userIcon; // Fallback to default icon
                            }}
                            />
                        </div>
                        <div className="flex flex-col text-[15px]">
                            <span>{displayName}</span>
                            <span>{email}</span>
                        </div>
                    </div>
                    <hr className="border-gray-300 border-t-2"/>
                    <div className="flex flex-col gap-5">
                        { accountOptions.map((e, i) => (
                            <Link key={i} className="flex gap-3 items-center">
                                <ShowIcon Icon={e.icon} />
                                <div>
                                    {e.text}
                                </div>
                            </Link>

                        )) }
                        <button onClick={() => {
                              handleLogout();
                              handleProfileShow();
                            }
                        }
                         className="flex gap-3 items-center" >
                            <ArrowLeftCircleIcon className="h-5 w-5"/>
                            <span>Sign out</span>
                        </button>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default UserProfile;