import { useDispatch } from "react-redux";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { setShoppingList, setWishList } from "../features/shopping/shoppingSlice";

const useShoppingList = () => {
  const dispatch = useDispatch();

  const setUserShoppingList = async (userId, list) => {
    try {
      const userRef = doc(db, `users/${userId}`);
      await setDoc(userRef, { shoppingList: list }, { merge: true });
    } catch (error) {
      console.error("Error updating shopping list:", error);
    }
  };

  const setUserWishList = async (userId, list) => {
    try {
      const userRef = doc(db, `users/${userId}`);
      await setDoc(userRef, { 'wishList': list }, { merge: true });
    } catch (error) {
      console.error("Error updating shopping list:", error);
    }
  };

  const fetchUserShoppingList = async (uid) => {
    try {
      const userSnap = await getDoc(doc(db, `users/${uid}`));
      if (userSnap.exists()) {
        const data = userSnap.data().shoppingList || [];
        dispatch(setShoppingList(data));
      } else {
        console.log("No data available for this user.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserWishList = async (uid) => {
    try {
      const userSnap = await getDoc(doc(db, `users/${uid}`));
      if (userSnap.exists()) {
        const data = userSnap.data().wishList || [];
        dispatch(setWishList(data));
      } else {
        console.log("No data available for this user.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return { setUserShoppingList, fetchUserShoppingList, setUserWishList, fetchUserWishList };
};

export default useShoppingList;
