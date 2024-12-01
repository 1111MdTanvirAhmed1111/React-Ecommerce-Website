import {createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext()

const url = `${import.meta.env.VITE_bApi}/cart/`
import  axios from 'axios';



export const CartProvider = ({children})=>{
    const [Cart, setCart] = useState([])

    const sCart = async ()=>{
        const  res = await axios.post(url,Cart,{
            headers: {
              Authorization: localStorage.getItem('jwt')
            }
           })
        setCart(res.data.cart)
    }
console.log(Cart)

       useEffect(()=>{
        if(localStorage.getItem('jwt')){
        sCart()}},[])

    return <CartContext.Provider value={{Cart,setCart}}>
                    {children}
    </CartContext.Provider>
}



export const useCart = ()=>{
    return useContext(CartContext)
}