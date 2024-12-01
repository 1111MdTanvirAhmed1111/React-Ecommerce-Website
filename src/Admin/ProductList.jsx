
import { ScrollArea } from "@/components/ui/scroll-area"
import React, { useEffect, useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
}  from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProducts } from './Contexts/ProductsContext';

import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import ProductEditForm from './ProductEditForm'
const url = `${import.meta.env.VITE_bApi}/products/all`

   



export function ProductList() {
  const {Products,setProducts} = useProducts()

  const [search,setSearch] = useState('')


  const DeleteProducts = async (id)=> await axios.delete(`${import.meta.env.VITE_bApi}/product/${id}`,{
    headers: {
      Authorization: localStorage.getItem('jwt')
    }
 
}).catch(err=>{
  console.log(err)
  toast({
    title: err.response.data.messege,
  })
})
 
   

  const sProducts = async (s)=>{
    try {
     const  res = await axios.get(
      
      url,{
      params: {
        headline: s
      },
      
        headers: {
          Authorization: localStorage.getItem('jwt')
        }
    },


    


  
  
  )
     setProducts(res.data)
   } catch (error) {
    console.log(error)
    toast({
      title: err.response.data.messege,
    })
   }}




useEffect(()=>{
  sProducts(search)
},[search])


const handleDelete = (product)=>{
  setProducts(Products.filter(v=> v._id !== product._id))

  toast({
    title: 'Product Deleted successfully',
    description: `Name: ${product.headline}, Price: $${product.price}, Stock: ${product.stock}`,
  })

DeleteProducts(product._id)
}


  return (
    <div className="space-y-4">
         <Toaster />
         
      <div className="flex justify-between">
        <Input
          placeholder="Search products..."
          className="max-w-sm"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>
      
    {Products && Products.length > 0 ?  <Table>
        <TableHeader>
          <TableRow>
          <TableHead>View</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
   
        
          </TableRow>
        </TableHeader>
        <TableBody>
          {Products && Products.map((product) => (
            <TableRow key={product._id}>
              <TableCell><NavLink to={`/products/${product._id}`}><Button>View</Button></NavLink></TableCell>
              <TableCell>{product.headline}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
            
              <TableCell>
                <Button variant="ghost" size="sm">  <Drawer>
  <DrawerTrigger>Edit</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure want to edit This Product?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <ScrollArea className="h-96 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
  
         
  <ProductEditForm product={product} imgs={product.img} />
     
      </div>
    </ScrollArea>
           

    <DrawerFooter>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer></Button>
                <Button variant="ghost" size="sm" className="text-red-500" onClick={()=>handleDelete(product)}>Delete</Button>   
              </TableCell>



             

            </TableRow>
          ))}
        </TableBody>
      </Table> : <h1 className='text-center font-bold text-5xl'>No Products Found</h1>}

    </div>
  )
}

