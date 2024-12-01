
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductList } from './ProductList';
import  ProductForm  from './ProductForm';
const ProductManage = () => {
    return (
        <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Tabs defaultValue="products" className="mt-6">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
            
          </TabsList>
          <TabsContent value="products">
            <ProductList />
          </TabsContent>
          <TabsContent value="add-product">
            <ProductForm />
          </TabsContent>
        </Tabs>
      </div>
    );
};

export default ProductManage;