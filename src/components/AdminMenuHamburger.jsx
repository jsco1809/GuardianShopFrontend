import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminMenuHamburger = () => {
  const [open, setOpen] = useState(false);

  // Empujar el contenido de la página hacia la derecha
  useEffect(() => {
    if (open) {
      document.body.style.marginLeft = "250px";
      document.body.style.transition = "margin 0.3s ease";
    } else {
      document.body.style.marginLeft = "0px";
    }

    return () => {
      document.body.style.marginLeft = "0px";
    };
  }, [open]);

  return (
    <>
      {/* Ícono hamburguesa SIEMPRE visible */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-[100] flex flex-col gap-1 p-2 cursor-pointer 
                   bg-tertiary dark:bg-fifthy rounded-lg shadow-md"
      >
        <span className="w-6 h-0.5 bg-black dark:bg-white"></span>
        <span className="w-6 h-0.5 bg-black dark:bg-white"></span>
        <span className="w-6 h-0.5 bg-black dark:bg-white"></span>
      </button>

      {/* Sidebar deslizable */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[250px] z-50 
          bg-tertiary dark:bg-fifthy shadow-xl 
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <ul className="flex flex-col mt-20 gap-6 p-6 text-black dark:text-white">
          <li>
            <Link to="/services/list" onClick={() => setOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/services/new" onClick={() => setOpen(false)}>
              Create Service
            </Link>
          </li>
          <li>
            <Link to="/services/edit" onClick={() => setOpen(false)}>
              Edit Service
            </Link>
          </li>
          <li>
            <Link to="/categories/list" onClick={() => setOpen(false)}>
              Categories
            </Link>
          </li>
          <li>
            <Link to="/categories/new" onClick={() => setOpen(false)}>
              Create Category
            </Link>
          </li>
          <li>
            <Link to="/categories/edit" onClick={() => setOpen(false)}>
              Edit Category
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenuHamburger;
