import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/categorySlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error, { position: "top-center" });
  }, [error]);

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 dark:bg-darkBg p-4 min-h-screen">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Categorías
      </h1>

      <div className="w-full max-w-6xl flex justify-end mb-4">
        <Link to="/categories/new" className="btn btn-fourty">
          Crear Categoría
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {loading ? (
          <p className="text-black dark:text-white">Cargando...</p>
        ) : list && list.length > 0 ? (
          list.map((cat) => (
            <div
              key={cat.id}
              className="bg-fourty/50 p-4 rounded-lg shadow flex flex-col"
            >
              <h2 className="text-lg font-bold text-black dark:text-white mb-2">
                {cat.name}
              </h2>
              <p className="text-sm text-black dark:text-white mb-3">
                {cat.description || "Sin descripción"}
              </p>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold w-fit mb-3 ${
                  cat.status === 1
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {cat.status === true ? "Activo" : "Inactivo"}
              </span>
              <div className="mt-auto flex gap-2">
                <Link
                  to="/categories/edit"
                  state={{ category: cat }}
                  className="btn btn-fourty w-full text-center dark:btn-primary"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-black dark:text-white">No hay categorías.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
