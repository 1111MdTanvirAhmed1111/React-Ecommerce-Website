
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
const formSchema = z.object({"name":z.string().min(5).max(255),"email":z.string().min(1).max(255),"phone":z.coerce.number().gte(1).lte(9999999999),"pass":z.string().min(1).max(255),"terms":z.boolean()})
import React from 'react';
import { Toaster } from "@/components/ui/toaster"
import { toast } from '@/hooks/use-toast';
import { Checkbox } from "./ui/checkbox"
const url = `${import.meta.env.VITE_bApi}/user/register`
import  axios  from 'axios';





const Register = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
name: "",
email: "",
phone: "",
pass: "",
},
  })


  const fetchRegister = async(s)=>{


    const data = await axios.post(url,s,{
      headers:{
        'Content-Type': "application/json"
      }})
    
      
  
    toast({
      title: data.data.messege,
    })


  }


  function onSubmit(values) {
    const pat = JSON.stringify(values)
    fetchRegister(pat)
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
    
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input  placeholder="Your Name" {...field} />
                  </FormControl>
          
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input  placeholder="Your Email" {...field} />
                  </FormControl>
         
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Your Phone Number" {...field} />
                  </FormControl>
          
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input  placeholder="Set Account password" {...field} />
                  </FormControl>
          
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
                          control={form.control}
              name="terms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg  py-4">
                              <div className="flex">
                               
                              <FormControl>
                                <Checkbox
                                id="terms"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel  htmlFor="terms" className=" ml-2   text-md leading-none peer-disabled:cursor-not-allowed font-light peer-disabled:opacity-70">Accept terms and conditions</FormLabel>
                             
                              </div>
                    
                            </FormItem>
                          )}
                        />
        <Button type="submit">Submit</Button>
        <Toaster />
      </form>
    </Form>
  )
}
export default Register;