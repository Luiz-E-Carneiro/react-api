export default function CartItem({ product, quantity }) {
    return (
        <div className="flex items-center space-x-4 p-4 border-b">
            <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                <p className="text-gray-600">${product.price} x {quantity}</p>
                <p className="text-gray-800 font-bold">Total: ${(product.price * quantity).toFixed(2)}</p>
            </div>
        </div>
    );
}