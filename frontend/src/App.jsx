import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
// import ProductDetailPage from './pages/ProductDetailPage.jsx';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import Company from './pages/Company';
import Contact from './pages/Contact.jsx';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import { useThemeStore } from './store/useThemeStore.js';

function App() {
  const { theme } = useThemeStore();
  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-300"
      data-theme={theme}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/company" element={<Company />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/product/:id" element={<ProductDetailPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
