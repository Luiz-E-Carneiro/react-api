import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products/Products';
import Detail from '../pages/Products/Detail';
import Carts from '../pages/Carts/Cart';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Header() {
    const [cartLength, setCartLength] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/carts/1')
            .then(response => {
                const totalQuantity = response.data.products.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                );
                setCartLength(totalQuantity);
            })
            .catch(error => {
                console.log('Error fetching cart:', error);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <BrowserRouter>
            <header className="bg-[var(--bg-color)] shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-[var(--accent-color)]">
                        API_Stoore
                    </Link>

                    <nav>
                        <ul className="flex space-x-6 text-gray-700 font-medium">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-[var(--accent-color)] transition"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    className="hover:text-[var(--accent-color)] transition"
                                >
                                    Products
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {loading ? (
                        <p>...</p>
                    ) : (
                        <Link
                            to="/cart"
                            className="relative flex items-center text-gray-700 hover:text-[var(--accent-color)] transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 9m13-9l2 9m-5-9V7m0 6a1 1 0 11-2 0 1 1 0 012 0z"
                                />
                            </svg>

                            {cartLength > 0 && (
                                <span className="absolute -top-4 -right-4 bg-[var(--detail-color)] text-white text-xs font-bold rounded-full px-2 py-0.5">
 
                                    {cartLength}
                                </span>
                            )}
                        </Link>
                    )}

                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<Detail />} />
                    <Route path="/cart" element={<Carts />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}