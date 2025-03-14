import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {
    const [product, setProduct] = useState();
    const {id} = useParams();
    
    const getProduct = async () => {
        if (!isNaN(Number(id))) {
            try {
                const res = await axios.get(`https://dummyjson.com/products/${id}`)
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('error in the url');
        }
    }
    
    useEffect(() => {
        getProduct();
    }, [])

    return (
        <div className="product-page mt-[56px] sm:mt-[72px] h-[calc(100vh-56px)] sm:h-[calc(100vh-72px)] flex font-sans">
            <div className="w-3/5 bg-blue-50 rounded-tr-3xl rounded-br-3xl flex justify-center items-center">
                <img src={product?.thumbnail} className="w-4/5"/>
            </div>
            <div className="w-2/5 p-4">
                {/* <div className="text-4xl">{product?.category}</div> */}
                <div className="text-4xl text-gray-400">{product?.title}</div>
                <p className="mt-14 text-lg">Description</p>
                <div className="mt-6text-gray-500">{product?.description}</div>
                <hr className="my-12"/>
            </div>
        </div>
    )
}