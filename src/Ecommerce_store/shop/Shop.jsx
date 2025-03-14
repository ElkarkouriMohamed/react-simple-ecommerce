import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/product/productSlice";
import { useState, useEffect } from "react";
import "../css/shop.css";
import { ReactComponent as Spinner } from "../icons/spinner.svg";
import { HeartIcon, EyeIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "lucide-react";
import {
  addToCart,
  addToWishList,
} from "../../features/shopping/shoppingSlice";
import { toast } from "sonner";
import { finishLoading } from "../../features/images/imageSlice";
import Footer from "../footer/Footer";
import ProductShow from "./ProductShow";

const Shop = () => {
  const [productView, setProductView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loading, hasMore } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [lastProduct, setLastProduct] = useState(null);
  const wishList = useSelector((state) => state.shopping.wishList).map(e => e.id);
  const imagesLoading = useSelector(state => state.image.loading);

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

  const handleToast = (product, message) => {
    toast(
      <div className="flex items-center gap-2 p-2">
        <img
          src={product.thumbnail}
          alt="Profile"
          width="50"
          height="50"
        />
        <span>{`${product.title} ${message}`}</span>
      </div>
    );
  }

  const closeProductView = () => {
    setProductView(false);
  }

  return (
    <>
      <div className="shop-page mt-[56px] sm:mt-[72px] bg-[#ffffff] perspective-[1000px]">
        {loading && (
          <Spinner className="w-14 h-14 animate-spin absolute top-1/2 left-1/2" />
        )}
        <ul className="products flex flex-wrap justify-center gap-4 py-4 px-1 sm:px-3 lg:px-10 transition-all">
          {products.map((e, k) => (
            <li
              key={k} //w-[160px] low:w-auto //flex flex-wrap justify-center gap-4
              className="flex w-[326px] flex-col gap-2 low:hover:shadow-[0_3px_30px_0px_rgba(0,0,0,0.2)] rounded-md transition-shadow duration-700 low:border-[1px] border-gray-200 overflow-hidden"
            >
              <div className="img-container bg-[#f2f2f2] w-full h-[324px] flex justify-center relative">
                <img
                  src={e.thumbnail}
                  alt="product"
                  className=""
                  onLoad={() => dispatch(finishLoading(e.id))}
                  loading="lazy"
                />
                {imagesLoading[k]?.loading && (
                  <Spinner className="img-loading-spinner w-10 h-10 border-e-transparentrounded-full" />
                )}
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
                      handleToast(e, 'added to your cart');
                    }}
                    className="bg-orange-600 text-white rounded-full p-2 sm:rounded-3xl sm:py-2 sm:px-4 flex items-center justify-center sm:gap-2"
                  >
                    <span className="hidden sm:block">Add to cart</span>
                    <ShoppingCartIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      dispatch(addToWishList(e));
                      handleToast(e, wishList.includes(e.id) ? 'removed from favorites list' : 'added to your your favorites list');
                    }}
                    className={`${
                      wishList.includes(e.id)
                        ? `bg-red-400 text-white`
                        : `bg-[#f2f2f2]`
                    }  transition-colors duration-100 flex justify-center items-center p-2 rounded-full`}
                  >
                    <HeartIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedProduct(e);
                      setProductView(true);
                    }}
                    className="bg-[#f2f2f2] low:hover:bg-orange-600 low:hover:text-white transition-colors duration-500 hidden md:flex justify-center items-center p-2 rounded-full">
                    <EyeIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      { productView && <div onClick={closeProductView} id="overlay" className="bg-[rgba(0,0,0,.16)]"></div>}
      <ProductShow product={selectedProduct} productView={productView} closeProductView={closeProductView} />
      <Footer />
    </>
  );
};

export default Shop;