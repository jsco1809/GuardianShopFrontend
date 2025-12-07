import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setCurrentPage } from "../../redux/productSlice";
import "react-toastify/dist/ReactToastify.css";
import bgPromo from "../../assets/bgPromo.svg";
import useCart from "../../hooks/useCart";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToCart } = useCart();
  const { products, error, totalPages, currentPage, loading } = useSelector(
    (state) => state.products
  );

  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    if (location.state?.showSuccess) {
      toast.success(location.state.message || "Welcome to the products page!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const handleSizeChange = (serviceId, reference) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [serviceId]: reference,
    }));
  };

  const handleAddToCart = (service) => {
    const selectedReference = selectedSizes[service.id];
    if (!selectedReference) {
      alert("Por favor, selecciona una talla antes de agregar al carrito.");
      return;
    }

    const selectedProduct = service.derivedProducts.find(
      (product) => product.reference === selectedReference
    );

    if (!selectedProduct) {
      alert("Producto derivado no encontrado.");
      return;
    }

    const productToCart = {
      ...service,
      inventoryId: selectedProduct.id,
      selectedReference,
    };

    addToCart(productToCart);
    toast.success("Product added to the cart successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 dark:bg-darkBg">
      <ToastContainer />
      <div
        className="bg-fourty flex items-center justify-center mb-4 w-full max-w-screen-lg h-64"
        style={{
          backgroundImage: `url(${bgPromo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl text-center">
          Esta es la promo de <span className="font-extrabold italic">hoy</span>
          .
        </h1>
      </div>

      {loading ? (
        <p className="text-center text-lg">Cargando productos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-screen-lg px-2 sm:px-4">
          {products.map((service) => (
            <div
              key={service.id}
              className="bg-fourty/50 p-4 flex flex-col items-center shadow rounded-lg"
            >
              <div className="w-full mb-4 rounded bg-white dark:bg-black overflow-hidden">
  <img
    src={service.imageUrl}
    alt={service.name}
    className="w-full object-cover rounded"
  />
</div>

              <h1 className="font-bold text-center text-sm sm:text-base md:text-lg text-black dark:text-darkText">
                {service.name}
              </h1>
              <p className="font-semibold text-center text-xs sm:text-sm md:text-base text-black dark:text-darkText">
                {service.categoryId === 3
                  ? "Precio: Ver en Carrito"
                  : `Precio: $${
                      service.salePrice ? service.salePrice : "No disponible"
                    }`}
              </p>
              <div className="w-full mt-2">
                <label
                  htmlFor={`size-select-${service.id}`}
                  className="block font-medium mb-1 text-xs sm:text-sm"
                >
                  {service.categoryId === 3
                    ? "Seleccionar Almacenamiento:"
                    : "Seleccionar talla:"}
                </label>
                <select
                  id={`size-select-${service.id}`}
                  className="w-full p-2 border rounded text-xs sm:text-sm bg-white text-darkBg dark:bg-darkBg dark:text-white"
                  value={selectedSizes[service.id] || ""}
                  onChange={(e) => handleSizeChange(service.id, e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  {service.derivedProducts &&
                  service.derivedProducts.length > 0 ? (
                    service.derivedProducts.map((derivative) => (
                      <option key={derivative.id} value={derivative.reference}>
                        {derivative.reference}
                      </option>
                    ))
                  ) : (
                    <option
                      value=""
                      disabled
                      className="text-black dark:text-darkText"
                    >
                      No hay disponibles
                    </option>
                  )}
                </select>
              </div>
              <div className="mt-4 w-full">
                <button
                  className="btn btn-fourty p-2 w-full text-xs sm:text-sm truncate dark:btn-primary"
                  onClick={() => handleAddToCart(service)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {totalPages > 0 && (
        <div
          className={`bg-fourty/80 rounded-md p-2 flex items-center justify-center mt-5`}
        >
          <button className="btn-fourty font-bold mx-1 px-3 py-1 dark:btn-primary">
            Pages
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 px-3 py-1  rounded btn-fourty dark:btn-primary font-bold ${
                page === currentPage ? "active" : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
