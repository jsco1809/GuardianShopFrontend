import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.svg";
import carBuy from "../assets/CarBuy.svg";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";
import lupa from "../assets/lupa.svg";
import useCart from "../hooks/useCart";
import useDarkMode from "../hooks/useDarkMode";
import AdminMenuHamburger from "./AdminMenuHamburger";


const Navbar = () => {
  const navigate = useNavigate();
  const { validateCart } = useCart();
  const { theme, toggleTheme } = useDarkMode();
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);


  useEffect(() => {
    const fetchCartItems = async () => {
      if (isAuthenticated) {
        try {
          await validateCart();
        } catch (error) {
          console.error("Error al validar el carrito:", error);
        }
      }
    };
    fetchCartItems();
  }, [isAuthenticated, validateCart]);

  const handleCartClick = async () => {
    if (isAuthenticated) {
      try {
        await validateCart();
        navigate("/cart");
      } catch (error) {
        console.error("Error al acceder al carrito:", error);
      }
    } else {
      navigate("/login");
    }
  };

  const cartContent = cartItems.content || [];
  const totalItems = cartContent.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="top-0 relative justify-center place-content-center items-center h-134px flex bg-gray-100 dark:bg-darkBg text-black dark:text-white">
      {role === "ADMIN" && <AdminMenuHamburger />}

      <div className="hidden md:flex md:m-5">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 rounded-full object-cover invert dark:brightness-100"
          />
        </Link>
      </div>

      <div className="flex-row p-4">
        <div className="p-4">
          <ol className="flex gap-2 md:gap-14 bg-tertiary dark:bg-fifthy w-[274px] md:w-full h-[48px] lg:w-[1200px] lg:gap-44 justify-center items-center place-content-center rounded-md  text-black dark:text-white  mb-5">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>

            <li className="relative">
              <button onClick={handleCartClick}>
                <img
                  src={carBuy}
                  alt="Ver carrito"
                  className="brightness-0 dark:brightness-100"
                />
                {isAuthenticated && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </li>
          </ol>
        </div>

        <div className="hidden md:flex bg-tertiary dark:bg-fifthy md:text-black dark:text-white md:w-[314px] lg:w-[1000px] md:h-[48px] rounded-md md:place-content-center md:justify-center md:items-center md:ml-12">
          <img
            src={lupa}
            alt="Buscar"
            className="ml-8 brightness-0 dark:brightness-100"
          />
          <input
            type="text"
            placeholder="Search something..."
            className="  bg-transparent text-black dark:text-white w-full h-full outline-none placeholder:text-black dark:placeholder:text-white "
          />
        </div>
      </div>
      <div className="m-8">
        <button onClick={toggleTheme}>
          <img
            src={theme === "dark" ? moon : sun}
            alt="Cambiar modo"
            className="w-7 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
