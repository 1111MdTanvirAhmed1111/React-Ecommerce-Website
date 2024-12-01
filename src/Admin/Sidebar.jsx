import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu, Package, ShoppingCart, Users } from "lucide-react";
import { NavLink } from 'react-router-dom';

const targetMen = [
  {
    element:  <Package className="h-4 w-4" />,
    text: "Products",
    target: "/admin/products"
  },
  {
    element:       <ShoppingCart className="h-4 w-4" />,
    text: " Orders",
    target: "/admin/orders"
  },
  {
    element:       <Users className="h-4 w-4" />,
    text: " Customers",
    target: "/admin/users"
  },
]

const Sidebar = () => {
    return (
        <Sheet>

        <div>
        <SheetTrigger className="border-4 border-black rounded-lg px-4 py-3"><Menu  size={34} /></SheetTrigger>
        </div>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>      <ScrollArea className="flex-1 overflow-auto">
          <nav className="grid items-start px-4 text-sm font-medium">

            {
              targetMen.map((v,i)=> <NavLink to={v.target} key={i} className={({ isActive, isPending }) => isActive? "bg-black text-white rounded-lg" : ""} ><Button  variant="ghost" className="w-full justify-start gap-2">
               
                {v.element}
                {v.text}
               
              </Button> </NavLink>)
            }
            
          </nav>
        </ScrollArea>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
};

export default Sidebar;