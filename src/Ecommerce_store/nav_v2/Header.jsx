import "../css/header.css";
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../../features/user/userSlice";
import userIcon from "../icons/userIcon.svg";
import { ReactComponent as Menu } from "../icons/menu-nv.svg";
//import Logout from "../logout/Logout";
import { ShoppingBagIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Cart from "./cart/Cart";
import { openCart, closeCart } from "../../features/cart/cartSlice";
import { Toaster, toast } from "sonner";
import useShoppingList from "../../hooks/useShoppingList";
import UserProfile from "../userProfile/UserProfile";


const Header = () => {
  const media = window.matchMedia("(width < 1024px)");
  const [navbarShow, setNavbarShow] = useState(null);
  const [isMobile, setIsMobile] = useState(media.matches);
  const [isVisible, setIsVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isConnected, userInfo } = user;
  const navigate = useNavigate();
  const shoppingList = useSelector((state) => state.shopping.shoppingList);
  const wishList = useSelector((state) => state.shopping.wishList);
  const cartIsOpen = useSelector(state => state.cart.isOpen);
  const cartCount = shoppingList.reduce((acc, e) => acc + e.quantity, 0);
  const { setUserShoppingList, fetchUserShoppingList, setUserWishList, fetchUserWishList } = useShoppingList();

  useEffect(() => {
    const handleResize = (e) => {
      setIsMobile(e.matches);
    };
  
    media.addEventListener("change", handleResize);
  
    return () => {
      media.removeEventListener("change", handleResize);
    };
  }, []);
  
  useEffect(() => {
    if (isConnected) setUserShoppingList(userInfo.uid, shoppingList);
  }, [shoppingList])

  useEffect(() => {
    if (isConnected) setUserWishList(userInfo.uid, wishList);
  }, [wishList])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { uid, displayName, email, photoURL } = currentUser;
        dispatch(setLogin({ uid, displayName, email, photoURL }));
        fetchUserShoppingList(uid);
        fetchUserWishList(uid);
      } else {
        dispatch(setLogout());
      }
    });

    return () => unsubscribe();
  }, []);

  const handleNavbar = useCallback(() => {
    if (isMobile) {
      isVisible ? setNavbarShow(true) : setNavbarShow(false);
    } else {
      setNavbarShow(true);
      setIsVisible(false);
    }
  }, [isMobile, isVisible])

  useEffect(() => {
    handleNavbar();
  }, [handleNavbar]);

  const openSidebar = () => {
    setIsVisible(true);
  };

  const closeSidebar = () => {
    setIsVisible(false);
  };

  const handleProfileShow = () => {
    setShowProfile(false);
  }

  const parentVariants = {
    hidden: isMobile ? { x: -300 } : {},
    visible: isMobile
      ? {
          x: 0,
          transition: { duration: 0.3 },
        }
      : {},
    exit: isMobile ? { x: -300, transition: { duration: 0.3 } } : {},
  };

  return (
    <>
      <nav className="flex justify-between items-center p-2 sm:p-3 md:px-8 z-10">
        <Link to="/" className="logo flex items-center text-4xl sm:text-5xl">
          STORE
        </Link>
        <AnimatePresence>
          {navbarShow && (
            <motion.div
              className="links lg:flex items-center text-lg lg:text-lg font-medium gap-8 z-40"
              id="navbar"
              key="nav"
              variants={parentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="close-button justify-end">
                <button
                  onClick={() => closeSidebar()}
                  className="transform transition-transform duration-700 hover:rotate-90"
                >
                  <XMarkIcon className="h-8 w-8" />
                </button>
              </div>
              <div>
                <Link
                  className="relative group"
                  to="/shop"
                  onClick={() => closeSidebar()}
                >
                  Shop
                  <span className="absolute w-0 lg:group-hover:w-full transition-all duration-500 top-6 left-0 h-[2px] bg-black"></span>
                </Link>
              </div>
              <div>
                <Link
                  className="relative group"
                  to="/categories"
                  onClick={() => closeSidebar()}
                >
                  Categories
                  <span className="absolute w-0 lg:group-hover:w-full transition-all duration-500 top-6 left-0 h-[2px] bg-black"></span>
                </Link>
              </div>
              <div>
                <Link
                  className="relative group"
                  to="/best-sellers"
                  onClick={() => closeSidebar()}
                >
                  Best Sellers
                  <span className="absolute w-0 lg:group-hover:w-full transition-all duration-500 top-6 left-0 h-[2px] bg-black"></span>
                </Link>
              </div>
              <div>
                <Link
                  className="relative group"
                  to="/deals"
                  onClick={() => closeSidebar()}
                >
                  Deals & Discounts
                  <span className="absolute w-0 lg:group-hover:w-full transition-all duration-500 top-6 left-0 h-[2px] bg-black"></span>
                </Link>
              </div>
              <div> 
                <Link
                  className="relative group"
                  to="/contact"
                  onClick={() => closeSidebar()}
                >
                  Contact
                  <span className="absolute w-0 lg:group-hover:w-full transition-all duration-500 top-6 left-0 h-[2px] bg-black"></span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="shorthand-icons flex items-center">
          <div>
            <button className="icon relative">
            <MagnifyingGlassIcon  className="h-6 w-6 sm:h-8 sm:w-8"  />
            </button>
          </div>
          <div>
            <button
              className="icon relative"
              onClick={() => dispatch(openCart())}
            >
              <ShoppingBagIcon className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="bg-blue-400">{cartCount}</span>
            </button>
          </div>
          <div>
            <button
              onClick={() =>
                isConnected ? setShowProfile(true) : navigate("/sign-in")
              }
            >
              {isConnected ? (
                <img
                  src={`${userInfo.photoURL}`}
                  alt="Profile"
                  className="h-7 w-7 sm:h-9 sm:w-9 rounded-full"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = userIcon; // Fallback to default icon
                  }}
                />
              ) : (
                <UserIcon className="h-6 w-6 sm:h-8 sm:w-8" />
              )}
            </button>
          </div>
          <div className="menu-button flex items-center">
            <button onClick={() => openSidebar()}>
              <Menu className="h-7 w-7 sm:h-9 sm:w-9 stroke-[1.5]" />
            </button>
          </div>
        </div>
          {(isVisible || cartIsOpen || showProfile) && (
            <div
              id="overlay"
              onClick={() => {
                closeSidebar()
                dispatch(closeCart())
                setShowProfile(false)
              }}
            ></div>
          )}
      </nav>
      <Cart cartCount={cartCount}/>
      <UserProfile showProfile={showProfile} handleProfileShow={handleProfileShow} />
      <Toaster 
          position="top-right" 
          toastOptions={{
          duration: 2000,
          style: { padding: "0" },
          }}
          />
    </>
  );
}

export default Header;
