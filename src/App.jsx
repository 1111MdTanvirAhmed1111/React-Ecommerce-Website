import { Button } from "@/components/ui/button"
import Navbar from './components/Header/Navbar';
import { Outlet } from "react-router-dom";
import Footer from './components/Footer';

const App = () => {
  return (
   
<div>
<Navbar />
<Outlet />
<Footer />
</div>
  );
};

export default App;