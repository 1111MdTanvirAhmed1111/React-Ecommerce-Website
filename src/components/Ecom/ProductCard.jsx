
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import React from 'react';
import { NavLink } from 'react-router-dom';



const ProductCard = ({ image, title, description, price, category, onAddToCart,_id }) => {
  return (
    <Card className="w-[350px] overflow-hidden m-6 mx-auto ">
          <NavLink to={`/products/${_id}`}>
      <CardHeader className="p-0">
    
        <div className="relative h-[200px] w-full">
          <img
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className=" m-auto my-3 block h-full"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      </NavLink>
      <CardFooter className="flex justify-between items-center p-4">
        <p className="text-lg font-bold">${price.toFixed(2)}</p>
        <Button onClick={onAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}


export default ProductCard;