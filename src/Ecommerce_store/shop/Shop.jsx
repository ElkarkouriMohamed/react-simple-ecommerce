import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/product/productSlice";
import { useState, useEffect } from "react";
import "../css/shop.css";
import { ReactComponent as Spinner} from "../icons/spinner.svg";
import { ReactComponent as Star } from "../icons/star-fill.svg"
import { ReactComponent as HalfStar } from "../icons/star-half.svg"
import { HeartIcon, EyeIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "lucide-react";
import { addToCart, addToWishList } from "../../features/shopping/shoppingSlice";
import { Toaster, toast } from "sonner";

const Shop = () => {
    const state = useSelector((state) => state.product);
    const {products, loading, hasMore} = state;
    const dispatch = useDispatch();
    const [lastProduct, setLastProduct] = useState(null);
    const [imagesLoading, setImagesLoading] = useState([]);
    const wishList = useSelector(state => state.shopping.wishList).map(e => e.id);

    useEffect(() => {
        setImagesLoading((prev) => (
            [...prev, ...products.slice(imagesLoading.length).map((e) => (
            {'id': e.id, 'loading': true}
        ))]))        
    }, [products])

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, []);

    useEffect(() => {
        const obsr = document.querySelector(".products li:last-child");
        setLastProduct(obsr);
    }, [products]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    dispatch(fetchProducts());
                }
            },
            { threshold: 0.3 } // Trigger when the sentinel is fully visible
        );

        if (lastProduct && !loading) {
            observer.observe(lastProduct);
        }

        return () => {
            if (lastProduct) {
                observer.unobserve(lastProduct);
            }
        };
    }, [lastProduct, hasMore]);

    const handleImageLoad = (id) => {
        setImagesLoading((prev) => (
            [...prev.map(e => e.id === id ? {'id': id, 'loading': false} : e)]
        ))
    }

    return (
        <div className="shop-page mt-[56px] sm:mt-[72px] bg-[#ffffff]">
        { loading &&
            <Spinner className="w-14 h-14 animate-spin absolute top-1/2 left-1/2" />
        }
            <ul className="products flex flex-wrap justify-center gap-4 py-4 px-1 sm:px-3 lg:px-10 transition-all"> 
                {products.map((e, k) => (
                    <li
                     key={k} //w-[160px] low:w-auto //flex flex-wrap justify-center gap-4
                     className="flex w-[326px] flex-col gap-2 low:hover:shadow-[0_3px_30px_0px_rgba(0,0,0,0.2)] rounded-lg transition-shadow duration-700 border-[1px] border-gray-200"
                     >
                        <div className="img-container bg-[#f2f2f2] w-full h-[324px] flex justify-center rounded-md overflow-hidden relative">
                            <img src={e.thumbnail} 
                                alt="" className="hover:scale-110 transition-transform duration-700"
                                onLoad={() => handleImageLoad(e.id)}
                                loading="lazy"
                                />
                            {   imagesLoading[k]?.loading &&
                                <Spinner className="img-loading-spinner w-10 h-10 border-e-transparentrounded-full" />}
                        </div>
                        <div className="flex flex-col gap-2 p-3">
                            <div className="title text-slate-600 text-sm">{e.title}</div>
                            <div className="price text-red-500">${e.price}</div>
                            {/* <div className="flex gap-2">
                                {
                                    Array.from({ length: Math.floor(e.rating) }).map((_,k) => <Star key={k}/>)
                                }
                            </div> */}
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => {
                                        dispatch(addToCart(e));
                                        toast(
                                            <div className="flex items-center gap-2 p-2">
                                              <img src={e.thumbnail} alt="Profile" width="50" height="50" />
                                              <span>{e.title} added to your cart</span>
                                            </div>
                                          );
                                    }}
                                    className="bg-orange-600 text-white rounded-full p-2 sm:rounded-3xl sm:py-2 sm:px-4 flex items-center justify-center sm:gap-2">
                                    <span className="hidden sm:block">Add to cart</span>
                                    <ShoppingCartIcon className="w-5 h-5"/>
                                </button>
                                <button 
                                    onClick={() => dispatch(addToWishList(e))}
                                    className={`${wishList.includes(e.id) ? `bg-red-400 text-white` : `bg-[#f2f2f2]`}  transition-colors duration-100 flex justify-center items-center p-2 rounded-full`}>
                                    <HeartIcon className="w-5 h-5"/>
                                </button>
                                <button className="bg-[#f2f2f2] low:hover:bg-orange-600 low:hover:text-white transition-colors duration-500 flex justify-center items-center p-2 rounded-full">
                                    <EyeIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Shop;
//{`${e.id} ${e.title} ${e.price}`}