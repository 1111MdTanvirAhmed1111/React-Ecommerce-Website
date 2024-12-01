import React from 'react';
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Label } from "@/components/ui/label"
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
const jwt = localStorage.getItem('jwt')
import { Input } from "@/components/ui/input"
import Cart from './../Products/Cart';


import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

  import { ScrollArea } from "@/components/ui/scroll-area"
import { useCart } from '@/Contexts/CartContext';
const ItemArray = [ 
    
{
t:"/products",
element: <IoSearch  />
},

{
    t: jwt? "/profile": "/auth",
    element:  jwt? <IoPersonCircleOutline /> : <Button >Login</Button>
},  
   
     
    ]

const Navbar = () => {
  const {open,setOpen} = useCart()
    return (<div className=' py-2 border-slate-200 border-b-2 '>
        <div className='flex font-monserat justify-between w-[80%] m-auto text-2xl font-bold text-slate-800'>
            
        <div><NavLink to="/">E-com-BD</NavLink></div>
        <div className='flex '>{
          
            ItemArray.map(({t,element},i)=><div key={i} className='mx-2 cursor-pointer hover:text-slate-600'>
                <NavLink to={t}>{element}</NavLink>

            </div>)
            
            }
            <Sheet className="w-[200px]"  open={open} onOpenChange={setOpen}>
    <SheetTrigger  asChild>
    <IoCartOutline  />
  
    </SheetTrigger>


    <SheetContent style={{ maxWidth: '40vw' }}  >

      <SheetHeader>
        <SheetTitle className="text-center text-2xl">Your Cart</SheetTitle>
      </SheetHeader>
        <div className=" h-full overflow-y-scroll" >

        <Cart />
        
        </div>

    </SheetContent>


  </Sheet> 

</div>
        </div>


        </div>
    );
};

export default Navbar;