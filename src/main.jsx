import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import Home from './Pages/Home'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Auth from './Pages/Auth';
import ProductView from './Pages/ProductView'
import { AdminPanel } from './Admin/AdminPannel';
import ProductManage from './Admin/ProductManage'
import { ProductsProvider } from './Admin/Contexts/ProductsContext'
import WelcomeAdmin from './Admin/WelcomeAdmin'
import ProfilePage from './Pages/ProfilePage'
import Cart from './components/Products/Cart'
import Products from './Pages/Products'
import { UserProvider } from './Contexts/UserContext'
import { CartProvider } from './Contexts/CartContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:  [
      
    {
      path: "/",
      element: <Home />
    }, 
    {
      path: "/profile",
      element: <ProfilePage />  
    }, 
    {
      path: "/cart",
      element: <Cart />
    }, 
    {
      path: "/products",
      element: <Products />
    }, 

    {
      path: "/admin",
      element:  <ProductsProvider> <AdminPanel /></ProductsProvider>,
      children:[
        {
          path: "/admin",
          element: <WelcomeAdmin />
        }, 
        {
          path: "/admin/products",
          element: <ProductManage />
        }, 
        {
          path: "/admin/orders",
          element: <ProductManage />
        }, 
      ]
    },

    {
      path: "/products/:_id",
      element: <ProductView />
    },
    
  {
    path: "/auth",
    element: <Auth />
  },

  ],
  },




]);








createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
   <RouterProvider router={router} /> 
   </CartProvider>
   </UserProvider>
  </StrictMode>,
)
