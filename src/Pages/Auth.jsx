import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


import React, { useEffect } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { useNavigate } from "react-router-dom";

const Auth = () => {
const navigate  = useNavigate()

useEffect(()=>{
  if(localStorage.getItem("jwt"))
    navigate('/')
},[])

    return (
        <div className="flex mt-5 justify-center items-center">
            <Tabs defaultValue="account" className="w-[40rem]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Registert</TabsTrigger>
        <TabsTrigger value="password">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
            Create a new Account For Yourself
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
          <Register />
          </CardContent>

        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
             Get inside your existing Account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <Login />
          </CardContent>

        </Card>
      </TabsContent>
    </Tabs>

        </div>
    );
};

export default Auth;