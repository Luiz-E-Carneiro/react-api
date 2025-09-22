import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { magnify } from "../../utils/magnify";

export default function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.log('Error fetching product details:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (product) {
            const img = document.getElementById("myImage");
            if (img) {
                magnify("myImage", 3);
            }
        }
    }, [product]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!product) return <p className="text-center mt-10">Product not found.</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">

            <div className="md:w-1/2 flex justify-center">
                <img
                    id="myImage"
                    src={product.image}
                    alt={product.title}
                    className="w-full max-w-sm object-cover rounded-lg shadow-md"
                />
            </div>

            <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

                    <div className="flex items-center mt-2">
                        {Array.from({ length: 5 }, (_, i) => (
                            <svg
                                key={i}
                                className={`h-5 w-5 ${i < Math.round(product.rating.rate) ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="ml-2 text-gray-600">{product.rating.rate} de 5 ({product.rating.count} avaliações)</span>
                    </div>

                    <p className="mt-4 text-gray-700">{product.description}</p>
                </div>

                <div className="mt-6">
                    <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                    <span className="text-sm text-slate-900 line-through">${(product.price + (product.price * 0.3)).toFixed(2)}</span>

                    <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}