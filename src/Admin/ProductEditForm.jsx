import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Toaster } from "@/components/ui/toaster"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
}  from "@/components/ui/form"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  cn
} from "@/lib/utils"

import {
  Check,
  ChevronsUpDown
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { useProducts } from './Contexts/ProductsContext';
import { Button } from '@/components/ui/button'
import ImageUpload from './Components/ImageUpload';
import axios from 'axios'





const formSchema = z.object({
  headline: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Product name must be at least 10 characters.',
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Price must be a positive number.',
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Stock must be a non-negative number.',
  }),
  catagory: z.string()
})
const url = import.meta.env.VITE_bApi

const ProductEditForm = ({product}) =>{
const {_id,headline,catagory,description,price,stock} = product
  const {Products,setProducts} = useProducts()


  const [languages,setLanguages] = useState()

  const [img,setImg] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline,
      description,
      price,
      stock,
    },
  })


  const sendDB =  async (s)=> {
    const url = import.meta.env.VITE_bApi
    try {
      const formsend = new FormData()
      formsend.append("Pdata",s)
      formsend.append('productImg', img)
    let data =   await axios.put(`${url}/product/${_id}`,formsend,{ headers: {
          Authorization: localStorage.getItem('jwt')
        }})
 
    const newProduct = data.data.product
    setProducts((prev)=>{
      return prev.map((v)=>{

        return  v._id == newProduct._id ? newProduct : v
      })
    })

    console.log(data)
    } catch (error) {
      console.log("err")
    }
  } 


  function onSubmit(values) {
    toast({
      title: 'Product Edited successfully',
      description: `Name: ${values.headline}, Price: $${values.price}, Stock: ${values.stock}`,
    })
  
   let ProductData = JSON.stringify(values)
    sendDB(ProductData)
  }
  const catagories = async ()=> {
    let datas = await axios.get(`${import.meta.env.VITE_bApi}/catagory`,{
      headers: {

        Authorization: localStorage.getItem('jwt')
      }
     }).catch(err=>console.log(err))
    setLanguages(datas.data)

  }
useEffect(()=>{catagories()},[])
 

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <p className='  uppercase font-bold font-monserat text-4xl'>Create a New Product</p>
        <p className=' text-center uppercase font-bold font-monserat text-lg'>Drop YOur Product Image</p>
      <ImageUpload img={img} setImg={setImg} rquired={false} />
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormDescription>
                The name of the product as it will appear to customers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <textarea className='w-full h-40 overflow-y-scroll border-2 p-5 rounded-lg border-black' placeholder="Enter product Description" {...field} ></textarea>
              </FormControl>
              <FormDescription>
                The description of the product as it will appear to customers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="Enter price" {...field} />
              </FormControl>
              <FormDescription>
                The price of the product in dollars.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter stock quantity" {...field} />
              </FormControl>
              <FormDescription>
                The number of items available in stock.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
       
        <FormField
          control={form.control}
          name="catagory"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Product Catagory</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                      
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select Catagory"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Catagory..." />
                    <CommandList>
                      <CommandEmpty>No Catagory found.</CommandEmpty>
                      <CommandGroup>
                        {languages && languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("catagory", language.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.label === field.label
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>This is the Catagory that will be used in the dashboard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />




        <Button type="submit">Add Product</Button>
      </form>
    </Form>
  )
}



export default ProductEditForm;