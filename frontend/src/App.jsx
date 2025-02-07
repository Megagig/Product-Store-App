import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
// import ProductDetailPage from './pages/ProductDetailPage.jsx';
import Navbar from './components/Navbar';
import Resources from './pages/Resources';
import Company from './pages/Company';
import Contact from './pages/Contact.jsx';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-300"
      data-theme="forest"
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/resources" element={<Resources />} />
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
