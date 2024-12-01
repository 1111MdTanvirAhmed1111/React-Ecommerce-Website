'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Trash2 } from 'lucide-react'

export default function Cart() {
  return (
    <div className="container mx-auto p-4">

      <p>Your cart is empty.</p>

      {/* Cart Item */}
      <Card key={1} className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center">
            <img src="/placeholder.svg?height=100&width=100" alt="Item" className="w-20 h-20 object-cover mr-4" />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">Item Name</h2>
              <p className="text-gray-600">$19.99</p>
            </div>
            <div className="flex items-center">
              <Button variant="outline" size="icon" aria-label="Decrease quantity of Item Name">
                <Minus className="h-4 w-4" />
              </Button>
              <Input type="number" min="0" value={1} className="w-16 mx-2 text-center" aria-label="Quantity of Item Name" />
              <Button variant="outline" size="icon" aria-label="Increase quantity of Item Name">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4">
          <Button variant="destructive" size="sm" className="flex items-center">
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
          <p className="font-semibold">
            Total: $19.99
          </p>
        </CardFooter>
      </Card>

      <Separator className="my-4" />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Subtotal</h2>
        <p className="text-xl font-bold">$19.99</p>
      </div>
      <Button className="w-full mt-4" size="lg">
        Proceed to Checkout
      </Button>
    </div>
  )
}
