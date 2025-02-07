import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
// import ProductDetailPage from './pages/ProductDetailPage.jsx';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        {/* <Route path="/product/:id" element={<ProductDetailPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
