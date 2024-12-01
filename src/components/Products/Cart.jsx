import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // Button component
import { Input } from '@/components/ui/input'; // Input component
import { Plus, Minus, Trash2 } from 'lucide-react'; // Icons
import { useCart } from '@/Contexts/CartContext';
import axios from 'axios';
import { SheetTrigger } from '@/components/ui/sheet';



const Cart = () => {

  const { cartItems, addToCart, updateQuantity, removeItem, total } = useCart();
  const [produ, setProducts] = useState([]);
  
  const sProducts = async () => {
    try {
      const url = `${import.meta.env.VITE_bApi}/products/all`;
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sProducts();
  }, []);

  const handleQuantityChange = (_id, newQuantity) => {
    if (newQuantity >= 0) {
      updateQuantity(_id, newQuantity);
    }
  };

  const handleIncrease = (_id) => {
    const item = cartItems.find((item) => item._id === _id);
    updateQuantity(_id, item.quantity + 1);
  };

  const handleDecrease = (_id) => {
    const item = cartItems.find((item) => item._id === _id);
    if (item.quantity > 0) {
      updateQuantity(_id, item.quantity - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {produ.length === 0 || cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => {
          const da = produ.find((v) => v._id === item._id);
          if (!da) return null;

          return (
            <div key={da._id} className="card mb-4">
              <div className="card-content p-4">
                <div className="flex items-center">
                  <img 
                    src={da.img|| '/placeholder.svg'} 
                    alt={da.headline} 
                    className="w-20 h-20 object-cover mr-4" 
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{da.headline}</h2>
                    <p className="text-gray-600">${da.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Decrease quantity"
                      onClick={() => handleDecrease(da._id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="0"
                      value={item.quantity} // Use cartItem's quantity
                      className="w-16 mx-2 text-center"
                      onChange={(e) => handleQuantityChange(da._id, Number(e.target.value))}
                      aria-label={`Quantity of ${da.headline}`}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Increase quantity"
                      onClick={() => handleIncrease(da._id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="card-footer flex justify-between items-center p-4">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(item._id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
                <p className="font-semibold">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })
      )}

      {cartItems.length > 0 && (
        <div className="my-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Subtotal</h2>
            <p className="text-xl font-bold">${total.toFixed(2)}</p>
          </div>
        </div>
      )}
      <Button className="w-full mt-4" size="lg" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Cart;
