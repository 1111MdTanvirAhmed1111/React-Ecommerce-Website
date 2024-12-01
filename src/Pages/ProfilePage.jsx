import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from './../Contexts/UserContext';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';




export default function ProfilePage() {
const {User,setUser} = useUser()
const navigate = useNavigate()
  const [{_id,name,img:avatar,email,admin,orders:or},setUsa] = useState(User)
  const [orders, setOrders] = useState([
    { id: '1', date: '2023-05-01', total: 99.99, status: 'Delivered' },
    { id: '2', date: '2023-06-15', total: 149.99, status: 'Shipped' },
    { id: '3', date: '2023-07-20', total: 79.99, status: 'Processing' },
  ])


  useEffect(()=>{
    if(!localStorage.getItem("jwt"))
      navigate('/')
  },[])


  const ProfilePage = (e) => {
    e.preventDefault()

    const Reqobj = {
      name:e.target.name.value,
      email:e.target.email.value
    }
      const editAction = async ()=>{
        const res = await axios.put(`${import.meta.env.VITE_bApi}/user/`,Reqobj, {
          headers: {

            authorization: localStorage.getItem('jwt')
          }
         }).catch(err=>console.log(err))

         toast({
          title: 'Profile Updated successfully',
         
        })
    
         setUser(res.data.updatedUser)
      }

      editAction()
  }


  async function cngPass(obj){
    try {

      const res = await axios.put(`${import.meta.env.VITE_bApi}/user/cngpass`,obj, {
        headers: {
  
          authorization: localStorage.getItem('jwt')
        }
       })
       toast({
        title: res.data.messege,
       
      })
  
       
    } catch (error) {   
          toast({
      title: error.response.data.messege,
     
    })
    }


  }

function handlePassSubmit (e){
  e.preventDefault()
const obj = {
  currPass:e.target.currPass.value,newPass:e.target.newPass.value
}
cngPass(obj)
  

  }



  return (
    <div className="container mx-auto p-4">
      <div className=" flex justify-end">
    {admin &&<NavLink to="/admin"><Button variant="destructive" >Admin Zone</Button></NavLink> } 
      </div>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
        <Toaster />
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-20 h-20">
             <AvatarImage src={avatar} alt={User.name} />
                <AvatarFallback>{User.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{User.name}</h2>
                <p className="text-sm text-gray-500">{User.email}</p>
              </div>
            </div>
            <form onSubmit={ProfilePage}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={User.name} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email"name="email"  type="email" defaultValue={User.email} />
                </div>
                <Button type="submit">Update Profile</Button>
               <Button className="block mt-11" onClick={()=>{
                localStorage.clear('jwt')
                location.reload()
                navigate("/")
               }} variant="destructive" >Log Out</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="password">
              <TabsList className="mb-4">
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="password">
                <form onSubmit={handlePassSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" name="currPass" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" name="newPass" type="password" />
                    </div>

                    <Button type="submit">Change Password</Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="notifications">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <Input id="marketing-emails" type="checkbox" className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="order-updates">Order Updates</Label>
                    <Input id="order-updates" type="checkbox" className="w-6 h-6" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newsletter">Newsletter</Label>
                    <Input id="newsletter" type="checkbox" className="w-6 h-6" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View your recent orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

