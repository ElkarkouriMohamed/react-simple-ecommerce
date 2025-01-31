import {
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { closeCart } from "../../../features/cart/cartSlice";
import "../../css/cart.css";
import {
  addQuantity,
  minusQuantity,
  removeFromCart,
  setTotal,
} from "../../../features/shopping/shoppingSlice";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";

export default function Cart({cartCount}) {
  const dispatch = useDispatch();
  const cartIsOpen = useSelector((state) => state.cart.isOpen);
  const shoppingList = useSelector((state) => state.shopping.shoppingList);
  const totalPrice = useSelector(state => state.shopping.total);

  const parentVariants = {
    hidden: { x: 340 },
    visible: {
      x: 0,
      transition: { duration: 0.35 },
    },
    exit: { x: 340, transition: { duration: 0.35 } },
  };

  useEffect(() => {
    dispatch(setTotal());
  }, [cartCount])

  return (
    <>
      
      <AnimatePresence>
        {cartIsOpen && (
          <motion.div
            className="cart fixed top-0 flex flex-col right-0 w-[340px] h-[100vh] bg-[#ffffff] z-40 p-3"
            variants={parentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-xl font-medium">Your cart</span>
                <button
                  onClick={() => dispatch(closeCart())}
                  className="text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <hr />
            </div>
            <div className="shoopingList overflow-y-scroll overflow-x-hidden w-full h-[70vh]">
              {shoppingList.map((e, i) => (
                <div key={i}>
                  <div className="py-4 flex w-full">
                    <div className="bg-[#f9f9f9] w-1/3">
                      <img src={e.thumbnail} alt="" className="" />
                    </div>
                    <div className="p-2 flex w-2/3 justify-between">
                      <div className="tracking-wide flex">
                        <div className="flex flex-col justify-center gap-2">
                          <div className="text-[13px] text-gray-500">
                            {e.title}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex w-[100px]">
                              <div className="item-count w-4/5 border-[1px] border-r-0 border-gray-300 text-sm p-1 text-gray-400">
                                {e.quantity}
                              </div>
                              <div className="arrows w-1/5 border-[1px] border-gray-300">
                                <button
                                  className="w-full h-1/2 border-b-[1px] border-gray-300 flex justify-center items-center hover:bg-[#f3f3f3]"
                                  onClick={() => dispatch(addQuantity(e.id))}
                                >
                                  <ChevronUpIcon className="w-3 h-3" />
                                </button>
                                <button
                                  className="w-full h-1/2 flex justify-center items-center hover:bg-[#f3f3f3]"
                                  onClick={() => dispatch(minusQuantity(e.id))}
                                >
                                  <ChevronDownIcon className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <div className="text-xs">x ${e.price}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <button onClick={() => dispatch(removeFromCart(e.id))}>
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  { (i+1 !== shoppingList.length) && <hr /> }
                </div>
              ))}
            </div>
            <div className="checkout-button">
              <hr className="border-gray-600"/>
              <div className="text-sm text-gray-800 tracking-wide py-2">
                <div className="flex justify-between">
                  <span>{cartCount} items</span>
                  <span className="tracking-wider">${totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              <hr className="border-gray-800"/>
              <div className="flex justify-between py-2 tracking-wide">
                <span className="text-lg">Total (tax incl.)</span>
                <span className="text-lg">${totalPrice}</span>
              </div>
              <div className="flex flex-col">
                <button onClick={() => toast.success("This is a success message!")} className="bg-black hover:bg-slate-700 text-white text-sm p-3">Checkout</button>
                <button className="p-3 text-sm">Cart</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
