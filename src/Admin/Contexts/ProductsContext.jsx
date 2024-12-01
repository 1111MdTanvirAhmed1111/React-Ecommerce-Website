import {createContext, useContext, useEffect, useState } from "react";

export const ProductsContext = createContext()

const url = `${import.meta.env.VITE_bApi}/products/all`
import  axios  from 'axios';



export const ProductsProvider = ({children})=>{
    const [Products, setProducts] = useState([])

    const sProducts = async ()=>{
        try {
            const  res = await axios.get(url,{
                headers: {
                  Authorization: localStorage.getItem('jwt')
                }
             
        }
    
    )
        } catch (error) {
            console.log(error.response.data.messege)
            setProducts(null)
        }

    }
  
       
       
       
       useEffect(()=>{sProducts()},[Products])

    return <ProductsContext.Provider value={{Products,setProducts}}>
                    {children}
    </ProductsContext.Provider>
}



export const useProducts = ()=>{
    return useContext(ProductsContext)
}