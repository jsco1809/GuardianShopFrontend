import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices, setCurrentPage } from "../../redux/servicesSlice";

const ServiceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, currentPage, totalPages, loading, error } = useSelector(
    (state) => state.services
  );

  useEffect(() => {
    dispatch(getAllServices({ page: currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (error) toast.error(error, { position: "top-center" });
  }, [error]);

  const handleEdit = (service) =>
    navigate("/services/edit", { state: { service } });

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 dark:bg-darkBg p-4 min-h-screen">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Servicios
      </h1>

      <div className="w-full max-w-6xl flex justify-end mb-4">
        <Link to="/services/new" className="btn btn-fourty">
          Crear Servicio
        </Link>
      </div>

      {/* GRID DE TARJETAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {loading ? (
          <p className="text-black dark:text-white">Cargando...</p>
        ) : list && list.length > 0 ? (
          list.map((service) => (
           <div
  key={service.id}
  className="bg-fourty/50 p-4 rounded-lg shadow flex flex-col"
>
  {/* IMAGEN */}
  <img
    src={service.imageUrl}
    alt={service.name}
    className="w-full h-40 object-contain rounded mb-3 bg-white"
  />

  <h2 className="text-lg font-bold text-black dark:text-white mb-2">
    {service.name}
  </h2>

  <p className="text-sm text-black dark:text-white mb-1">
    <strong>Código:</strong> {service.code}
  </p>

  <p className="text-sm text-black dark:text-white mb-1">
    <strong>Categoría:</strong> {service.categoryId}
  </p>

  <p className="text-sm text-black dark:text-white mb-3">
    <strong>Precio:</strong> ${service.salePrice}
  </p>

  <span
    className={`px-2 py-1 rounded text-xs font-semibold w-fit mb-3 ${
      service.status === 1
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white"
    }`}
  >
    {service.status === 1 ? "Activo" : "Inactivo"}
  </span>

  <div className="mt-auto flex gap-2">
    <button
      onClick={() => handleEdit(service)}
      className="btn btn-fourty w-full text-center dark:btn-primary"
    >
      Editar
    </button>
  </div>
</div>

          ))
        ) : (
          <p className="text-black dark:text-white">No hay servicios.</p>
        )}
      </div>

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => dispatch(setCurrentPage(p))}
              className={`btn ${p === currentPage ? "btn-active" : ""}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
