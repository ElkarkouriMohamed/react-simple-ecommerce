import "../css/navBar.css";
import close from "../icons/close.svg";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Menu } from "../icons/menu.svg";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../../features/user/userSlice";
import userIcon from "../icons/userIcon.svg"
//import Logout from "../logout/Logout";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [navbarShow, setNavbarShow] = useState(null);
  const media = window.matchMedia("(width < 700px)");
  const [isMobile, setIsMobile] = useState(media.matches);
  const [isVisible, setIsVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { isConnected, userInfo } = user;
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { displayName, email, photoURL } = currentUser;
        dispatch(setLogin({displayName, email, photoURL}));
      } else {
        dispatch(setLogout());
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    handelNavbar();
  }, [isMobile, isVisible]);

  const handelNavbar = () => {
    if (isMobile) {
      isVisible ? setNavbarShow(true) : setNavbarShow(false);
    } else {
      setNavbarShow(true);
      setIsVisible(false);
    }
  };

  const openSidebar = () => {
    setIsVisible(true);
  };

  const closeSidebar = () => {
    setIsVisible(false);
  };

  media.addEventListener("change", (e) => {
    const match = e.matches;
    setIsMobile(match);
  });

  const parentVariants = {
    hidden: { y: -80, opacity: 0.2 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, type: "spring" },
    },
    exit: { opacity: 0.2, scale: 0.9, y: -30 },
  };

  //const AnimatedLink = motion.create(Link);

  return (
    <>
      <button id="open-sidebar-button" onClick={() => openSidebar()}>
        <Menu style={{ fill: "#1D1616" }} />
      </button>
      <AnimatePresence>
        {navbarShow && (
          <motion.nav
            id="navbar"
            key="nav"
            variants={parentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul>
              <li>
                <button
                  id="close-sidebar-button"
                  onClick={() => closeSidebar()}
                >
                  <img src={close} />
                </button>
              </li>
              <li className="home-li">
                <Link to="/" onClick={() => closeSidebar()}>
                  Website Name
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => closeSidebar()}>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/categories" onClick={() => closeSidebar()}>
                  categories
                </Link>
              </li>
              <li className="align-items-center">
                <ShoppingBagIcon
                  className="h-8 w-8"
                    />
                <span>21</span>
              </li>
              <li>
                <HeartIcon className="h-8 w-8"/>
              </li>                                
                <li>
                  <button onClick={() => isConnected ? setShowProfile(true) : navigate('/sign-in')}>
                  <img className="rounded-full" src={userInfo.photoURL ?? userIcon}
                      width="35" height="35"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = userIcon; // Fallback to default icon
                      }}
                      />
                  </button>
                </li>                   
            </ul>
          </motion.nav>
        )}
        {isVisible && (
          <motion.div
            key="overaly"
            id="overlay"
            onClick={() => closeSidebar()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
