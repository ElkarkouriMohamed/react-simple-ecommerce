import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
//import "./css/style.css";

const ShowProducts = () => {
    const state = useSelector((state) => state.product);
    const {products, loading, hasMore} = state;
    const dispatch = useDispatch();
    const [lastProduct, setLastProduct] = useState(null);

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
            { threshold: 0.4 } // Trigger when the sentinel is fully visible
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

    return (
        <>
            <ul className="products">
                {products.map((e, k) => (
                    <li key={k}>{`${e.id} ${e.title} ${e.price}`}</li>
                ))}
            </ul>
        </>
    );
};

export default ShowProducts;
