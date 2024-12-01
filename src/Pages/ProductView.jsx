'use client'

import React, { useEffect, useState } from 'react'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// Mock product data




export default function ProductView() {
    const {_id} =useParams()


const url = `${import.meta.env.VITE_bApi}/product/${_id}`

const [product,setProduct] = useState({})


const sProducts = async ()=> {

  const datas =await axios.get(url)
  console.log(datas.data)
  setProduct(datas.data)
}
   

   
   
   
   useEffect(()=>{sProducts()},[])



  const [quantity, setQuantity] = useState(1)


  const handleAddToCart = () => {
    
  }

  return (
    <div className="container mx-auto px-2 py-8">
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-4">
         
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center h-96 p-2 w-full">
                      <div style={{backgroundImage: `url(${product.img})`}} alt={`Product image`} className=" bg-center bg-cover w-full h-full object-contain" ></div>
                    </CardContent>
                  </Card>
              
        </div>
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">{product.headline}</h1>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < Math.floor(2.5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="text-sm text-gray-600">({2.5})</span>
          </div>
          <p className="text-xl font-semibold">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => quantity >1 && setQuantity(quantity -1 )}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(e.target.value) || 1, product.stock)))}
              className="w-20 text-center" 
            />
            <Button variant="outline" size="icon" onClick={() => setQuantity(quantity +1 )}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleAddToCart} className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <p className="text-sm text-gray-600">{product.stock} items left in stock</p>
        </div>
      </div>
    </div>
  )
}

