import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory, resetCategoryState } from "../../redux/categorySlice";
import { useUserFromToken } from "../../hooks/useUserFromToken";

const CategoryUpdateForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.categories);
  const { getUserNameFromToken } = useUserFromToken();
  const category = location.state?.category;

  const [dto, setDto] = useState({
    id: category?.id || null,
    name: category?.name || "",
    description: category?.description || "",
    status: category?.status || 1,
  });

  const handleChange = (e) =>
    setDto({ ...dto, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dto.name) {
      return toast.error("El nombre es obligatorio.", { position: "top-center" });
    }
    const userName = await getUserNameFromToken();
      
      const dtoToSend = { ...dto, updateUser: userName };
      
      console.log("dto to send:", dtoToSend);
    
    dispatch(updateCategory(dtoToSend));
  };

  useEffect(() => {
    if (success) {
      toast.success("Categoría actualizada correctamente", { position: "top-center" });
      dispatch(resetCategoryState());
      setTimeout(() => navigate("/categories/list"), 1500);
    }
  }, [success, navigate, dispatch]);

  useEffect(() => {
    if (error) toast.error(error, { position: "top-center" });
  }, [error]);

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 dark:bg-darkBg p-4">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Actualizar Categoría
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-fourty/50 p-5 rounded-lg shadow"
      >
        <label className="block mb-1 font-semibold text-black dark:text-white">ID</label>
        <input
          type="number"
          name="id"
          value={dto.id}
          readOnly
          className="input-field w-full bg-white dark:bg-darkBg dark:text-white mb-3 cursor-not-allowed"
        />

        <label className="block mb-1 font-semibold text-black dark:text-white">Nombre *</label>
        <input
          type="text"
          name="name"
          value={dto.name}
          onChange={handleChange}
          placeholder="Nombre de la categoría"
          className="input-field w-full bg-white dark:bg-darkBg dark:text-white mb-3"
          required
        />

        <label className="block mb-1 font-semibold text-black dark:text-white">Descripción</label>
        <textarea
          name="description"
          value={dto.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="input-field w-full bg-white dark:bg-darkBg dark:text-white mb-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-fourty w-full text-center dark:btn-primary"
        >
          {loading ? "Procesando..." : "Actualizar Categoría"}
        </button>
      </form>
    </div>
  );
};

export default CategoryUpdateForm;
