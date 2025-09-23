export default function ProductCard({ product }) {

    const { id, price, image, title, rating } = product;

    return (
        <div className="relative m-3 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border justify-between border-gray-100 bg-white shadow-md">
            <div className="relative mx-3 mt-3 flex h-40 overflow-hidden rounded-xl justify-center" href="#">
                <img className="object-cover" src={image} alt="product image" />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-[var(--detail-color)] px-2 text-center text-sm font-medium text-white">39% OFF</span>
            </div>
            <div className="mt-3 px-2 pb-1">
                <div href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">{title}</h5>
                </div>
                <div className="mt-2 mb-3 gap-4 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-slate-900">${price}</span>
                        <span className="text-sm text-slate-900 line-through">${(price + (price * 0.3)).toFixed(2)}</span>
                    </p>
                    <div className="flex flex-col items-start">
                        <div className="flex items-center">
                            {Array.from({ length: 5 }, (_, index) => (
                                <svg
                                    key={index}
                                    aria-hidden="true"
                                    className={`h-5 w-5 ${index < Math.round(rating.rate) ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        <span className="mt-1">
                            <span className="text-gray-700">{rating.rate} de 5 </span>
                            <span className="text-xs text-gray-400">({rating.count} avaliações)</span>
                             
                        </span>
                    </div>

                </div>
                <div href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to cart</div>
            </div>
        </div>
    )
}