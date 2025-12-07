import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../redux/categorySlice";
import { useUserFromToken } from "../../hooks/useUserFromToken";

const CategoryCreateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.categories);

  const { getUserNameFromToken } = useUserFromToken();

  const [dto, setDto] = useState({ name: "", description: "", status: 1 });

  const handleChange = (e) =>
    setDto({ ...dto, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!dto.name) {
    return toast.error("El nombre es obligatorio.", { position: "top-center" });
  }

  const userName = await getUserNameFromToken();
  
  const dtoToSend = { ...dto, createUser: userName };

  dispatch(addCategory(dtoToSend));
};


  useEffect(() => {
    if (success) {
      toast.success("Categoría creada correctamente", { position: "top-center" });
      setTimeout(() => navigate("/categories/List"), 2000);
    }
  }, [success, navigate]);

  useEffect(() => {
    if (error) toast.error(error, { position: "top-center" });
  }, [error]);

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 dark:bg-darkBg p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Crear Categoría
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-fourty/50 p-5 rounded-lg shadow"
      >
        <label className="block mb-1 font-semibold text-black dark:text-white">
          Nombre *
        </label>
        <input
          type="text"
          name="name"
          value={dto.name}
          onChange={handleChange}
          placeholder="Nombre de la categoría"
          className="input-field w-full bg-white dark:bg-darkBg dark:text-white placeholder:text-black dark:placeholder:text-white mb-3"
          required
        />

        <label className="block mb-1 font-semibold text-black dark:text-white">
          Descripción
        </label>
        <textarea
          name="description"
          value={dto.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="input-field w-full bg-white dark:bg-darkBg dark:text-white placeholder:text-black dark:placeholder:text-white mb-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-fourty w-full text-center dark:btn-primary"
        >
          {loading ? "Procesando..." : "Crear Categoría"}
        </button>
      </form>
    </div>
  );
};

export default CategoryCreateForm;
