import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import CapaComLogo from "./CapaComLogo";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <CapaComLogo />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
