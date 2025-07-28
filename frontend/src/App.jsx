import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Cars from "./Pages/Cars";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import ScrollToTop from "./Components/HelperComopnents/ScrollToTop";
import CarDetails from "./Components/CarsComponents/CarDetails";
import Notfound from "./Components/HelperComopnents/Notfound";
import AddCarForm from "./Components/CarsComponents/AddCarForm";
import Toaster from "react-hot-toast";
import LoginForm from "./Components/Admin/Login";
import Logout from "./Components/Admin/Logout";

function App() {
  const location = useLocation();

  const isCarDetailsPage = /^\/car\/[^/]+$/.test(location.pathname);

  return (
    <>
      <Toaster position="Top" />
      <ScrollToTop />

      {!isCarDetailsPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-car" element={<AddCarForm />} />
        <Route path="/admin" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Notfound />} />
      </Routes>

      {!isCarDetailsPage && <Footer />}
    </>
  );
}

export default App;
