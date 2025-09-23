import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { Link } from 'react-router-dom';

export default function Products() {
    const [productsByCategory, setProductsByCategory] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                const grouped = response.data.reduce((acc, product) => {
                    if (!acc[product.category]) {
                        acc[product.category] = [];
                    }
                    acc[product.category].push(product);
                    return acc;
                }, {});
                setProductsByCategory(grouped);
            })
            .catch(error => {
                console.log('Error fetching products:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                Object.keys(productsByCategory).map(category => (
                    <div key={category} className='capitalize mb-3'>
                        <h2 className="text-[var(--secondary-color)] font-bold text-3xl">{category}</h2>
                        <div className='flex flex-wrap'>
                            {productsByCategory[category].map(product => (
                                <Link key={product.id} to={`/products/${product.id}`}>
                                    <ProductCard product={product} />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
