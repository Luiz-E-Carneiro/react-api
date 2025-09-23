import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const verticalMotion = (range = 5) => ({ y: [0, -range, 0, range, 0] });

const cursorMotion = {
  y: [0, -30, 30, -15, 5, 0],
  x: [0, 15, -10, 20, -5, 0],
  rotate: [0, 5, -5, 10, -10, 0],
};

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
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      <header className="text-center mb-12">
        <h1
          className="text-4xl font-bold"
          style={{ color: "var(--secondary-color)" }}
        >
          Your Stoore_API
        </h1>
        <h4 className="text-lg mt-2" style={{ color: "var(--accent-color)" }}>
          Hundreds of products waiting for you!!!
        </h4>
      </header>

      <div className="relative flex justify-center items-center">
        <img src="/table.png" alt="Tabela" className="w-130" />

        <motion.img
          src="/cursor.png"
          alt="Cursor"
          className="z-30 absolute top-1/2 left-1/2 -translate-x-1/2 w-15"
          animate={cursorMotion}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-around px-9 pt-8">
          {randomProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              className="w-25 h-25 flex items-center justify-center"
              animate={idx == 1 ? verticalMotion(5) : {}}
              transition={idx == 1 ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.img
          src="/woman_cart.png"
          alt="Mulher com carrinho"
          className="absolute -bottom-10 -left-25 w-64 z-10"
          animate={verticalMotion(2)}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}