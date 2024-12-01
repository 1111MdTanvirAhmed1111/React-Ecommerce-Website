
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
const formSchema = z.object({"email":z.string().min(1).max(255),"pass":z.string().min(1).max(255)})
import React from 'react';
const url = `${import.meta.env.VITE_bApi}/user/login`
import axios from "axios"
import { Toaster } from "@/components/ui/toaster"
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
email: "",
pass: "",
},
  })


  const fetchLogin = async(s)=>{
try {
  

    const da = await axios.post(url, s)
if(da.data.status == 200){
  localStorage.setItem('jwt',da.data.jwt)
  
    toast({
      title: 'Login Succeed',
    })
    setTimeout(()=>{location.reload()},1000)
}else{
  toast({
    title: da.data.messege,
  })
}
} catch (error) {
  const pa = await error.response.data
    if(pa){
      toast({
        title: error.response.data.messege,
      })
    }
} 
  }

  function onSubmit(values) {


fetchLogin(values)


  }

  return (
    <Form {...form}>
        <Toaster />
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
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
              name="pass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input  placeholder="Set Password" {...field} />
                  </FormControl>
                   
                    
                   
                  <FormMessage />
                </FormItem>
              )}
            />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

  )
}
export default Login;