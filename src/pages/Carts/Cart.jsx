import { useEffect, useState } from "react"
import axios from "axios";
import CartItem from "./components/CartItem";
import { Link } from "react-router-dom";

export default function Carts() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/carts/1')
            .then(response => {
                setCart(response.data);
            })
            .catch(error => {
                console.log('Error fetching cart:', error);
            });
    }, []);

    useEffect(() => {
        if (cart.products && cart.products.length > 0) {
            const fetchProducts = async () => {
                try {
                    const responses = await Promise.all(
                        cart.products.map(item => axios.get(`https://fakestoreapi.com/products/${item.productId}`))
                    );
                    setProducts(responses.map(res => res.data));
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };

            fetchProducts();
            setLoading(false);
        }
    }, [cart]);

    return (
        <div>
            <h2>Your Cart:</h2>

            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <CartItem
                                product={product}
                                quantity={cart.products.find(item => item.productId === product.id)?.quantity || 0}
                            />
                        </Link>

                    ))}
                </ul>
            )}
        </div>
    )
}