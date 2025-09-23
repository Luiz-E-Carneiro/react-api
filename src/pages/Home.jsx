import { useState, useEffect, use } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const numbers = Array.from({ length: 20 }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const fetchProducts = async () => {
      try {
        const responses = await Promise.all(
          numbers.map((num) => axios.get(`https://fakestoreapi.com/products/${num}`))
        );
        setRandomProducts(responses.map((res) => res.data));
        console.log(responses.map((res) => res.data));

      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="">
      {
        randomProducts.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} >
            <img src={product.image} alt={product.title} className="w-24 h-24" />
          </Link>

        ))
      }
    </div>
  )
}