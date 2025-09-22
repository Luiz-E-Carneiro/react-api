import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products/Products';
import Detail from '../pages/Products/Detail';

export default function Header() {
    return (
        <BrowserRouter>
            {/* Header fixo no topo */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        MyStore
                    </Link>

                    {/* Navegação */}
                    <nav>
                        <ul className="flex space-x-6 text-gray-700 font-medium">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-blue-600 transition"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    className="hover:text-blue-600 transition"
                                >
                                    Products
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Carrinho */}
                    <Link
                        to="/cart"
                        className="flex items-center text-gray-700 hover:text-blue-600 transition"
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
                        Cart
                    </Link>
                </div>
            </header>

            {/* Rotas */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<Detail />} />
                    {/* Rota futura do carrinho */}
                    <Route path="/cart" element={<p>Cart page coming soon!</p>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}