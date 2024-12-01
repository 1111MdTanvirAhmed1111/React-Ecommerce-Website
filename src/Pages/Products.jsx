
import { useEffect, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Menu, Laptop, Shirt, Book, Home, Gamepad, X } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import axios from 'axios';
import ProductCard from "@/components/Ecom/ProductCard"

const url = `${import.meta.env.VITE_bApi}/products/all`


const produ = () => {
  const [produ,setProdu] = useState([])
  const [categories,setCatagories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSheetOpen, setIsSheetOpen] = useState(false)


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
     setProdu(res.data)
   } catch (error) {
    console.log(error)
    toast({
      title: err.response.data.messege,
    })
   }}









   const catagoriesS = async ()=> {
    let datas = await axios.get(`${import.meta.env.VITE_bApi}/catagory`,{
      headers: {

        Authorization: localStorage.getItem('jwt')
      },
      
     }).catch(err=>console.log(err))
    setCatagories(datas.data)

  }

  useEffect(()=>{
  catagoriesS()
  sProducts(searchQuery)
},[searchQuery])



  const filteredprodu = produ.filter((product) => {

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.catagory)
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesSearch = product.headline.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesPrice && matchesSearch
  })

  const SidebarContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.label} className="flex items-center space-x-2">
              <Checkbox
                id={category.label}
                checked={selectedCategories.includes(category.value)}
                onCheckedChange={(checked) => {
                  setSelectedCategories(
                    checked
                      ? [...selectedCategories, category.value]
                      : selectedCategories.filter((c) => c !== category.value)
                  )
                }}
              />
              <Label htmlFor={category.label} className="flex items-center space-x-2 cursor-pointer">
              
                <span>{category.label}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile toggle */}
      <div className="md:hidden p-4 flex justify-between items-center border-b">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-80px)] py-4">
              <SidebarContent />
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-semibold">Product Catalog</h1>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 bg-muted/40 p-6 border-r">
          <h2 className="text-lg font-semibold mb-6">Filters</h2>
          <ScrollArea className="h-[calc(100vh-120px)]">
            <SidebarContent />
          </ScrollArea>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search produ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredprodu.map(({catagory,description,headline,img,price,stock,_id}) => (
   <ProductCard
   _id={_id}
   image={img}
   title={headline}
   description={description}
   price={price}
   category={catagory}
   onAddToCart={()=>handleAddToCart(_id)}
 />)
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default produ;