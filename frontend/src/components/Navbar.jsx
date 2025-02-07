import { useState } from 'react';
import { Link, useResolvedPath } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { ShoppingBagIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Company', path: '/company' },
    { id: 2, text: 'Resources', path: '/resources' },
    { id: 3, text: 'About', path: '/about' },
    { id: 4, text: 'Contact', path: '/contact' },
    { id: 5, text: 'Register', path: '/register' },
    // { id: 6, text: 'ThemeSelector', path: '/theme' },
  ];

  const { pathname } = useResolvedPath();
  const isHomePage = pathname === '/';
  const products = []; // Replace with your actual products array

  return (
    <div className="bg-black flex justify-between items-center h-24 w-full px-4 text-white">
      <Link to="/">
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">MEGAGIG</h1>
      </Link>

      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            <Link to={item.path}>{item.text}</Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <ThemeSelector />

        {isHomePage && (
          <div className="indicator">
            <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
              <ShoppingBagIcon className="size-5" />
              <span className="badge badge-sm badge-primary indicator-item">
                {products.length}
              </span>
            </div>
          </div>
        )}
      </div>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
          MEGAGIG
        </h1>
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            <Link to={item.path}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
