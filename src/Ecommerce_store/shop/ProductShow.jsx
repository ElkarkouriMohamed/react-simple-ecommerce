import { useDispatch } from "react-redux";
import cartIcon from "../icons/icon-cart.svg";
import "./productShow.css";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart } from "../../features/shopping/shoppingSlice";

const ProductShow = ({ product, productView, closeProductView }) => {
  const dispatch = useDispatch();

  const priceAfterDiscount = (price, discount) => {
    const percentage =  (price * discount) / 100;
    return (price - percentage).toFixed(2);
  };

  return (
    <>
        
            
            <AnimatePresence>
            {productView &&
                <motion.div className="card shadow-lg -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: .8, y: '-50%', x: '-50%' }}
                    animate={{ scale: 1 }}
                    transition={{ duration: .4 }}
                    exit={{ opacity: .4, transition: { duration: .2 } }}
                >
                <div className="img_container">
                    <img src={product.thumbnail} alt="" />
                </div>
                <div className="details_container">
                    <button onClick={closeProductView} className="absolute top-2 right-2">
                        <XCircleIcon className="h-9 w-9 text-slate-500" />
                    </button>
                    <p className="montserrat">{product.category}</p>
                    <h1 className="name text-xl">{product.title}</h1>
                    <p className="description">{product.description}</p>

                    <div className="price_container">
                    <h1 className="current_price text-2xl">${priceAfterDiscount(product.price, product.discountPercentage)}</h1>
                    <p className="old_price text-2xl">${product.price}</p>
                    </div>

                    <button className="btn" onClick={() => dispatch(addToCart(product))}>
                    <img src={cartIcon} alt="icon" />
                        Add to Cart
                    </button>
                </div>
                </motion.div>
                }
            </AnimatePresence>
        
    </>
  );
};

export default ProductShow;
// <div classNameName="absolute top-1/2 left-1/2 w-[450px] flex bg-gray-700">
//     <div classNameName="w-1/2">
//         <img src={product.thumbnail} alt="profile" />
//     </div>
//     <div classNameName="w-1/2">
//         <h2>{product.title}</h2>
//         <div>{product.description}</div>
//     </div>
// </div>
