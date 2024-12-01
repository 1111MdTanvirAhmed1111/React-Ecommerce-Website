import React, { useEffect, useState } from 'react';
import ProductCard from '../Ecom/ProductCard';
const url = `${import.meta.env.VITE_bApi}/products/all`
import axios from 'axios';
import { useCart } from '@/Contexts/CartContext';

 


const Products = () => {
const [produ,setProdu] = useState([])
const {Cart,setCart} = useCart()


const sProducts = async ()=>{
 try {
  const  res = await axios.get(url)
  setProdu(res.data)
} catch (error) {console.log(error)}}



useEffect(()=>{sProducts()},[])




    const handleAddToCart = (id) => {
      const currCart = Cart.cartItems
      currCart.push({productId:id, quantity: 1})
setCart(c)
        alert("Product added to cart!")
      }

    return (
        <div className='w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5'>


{
  produ.length >0 ? produ.map(({catagory,description,headline,img,price,stock,_id},i)=> 
  <ProductCard
  _id={_id}
  image={img}
  title={headline}
  description={description}
  price={price}
  category={catagory}
  onAddToCart={()=>handleAddToCart(_id)}
/>)
: <h1 className='text-center'>No Products Found</h1>}
     


      
        </div>
    );
};

export default Products;