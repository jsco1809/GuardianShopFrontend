import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserFromToken } from "../../hooks/useUserFromToken";

import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/categorySlice";
import { addService, resetServiceState } from "../../redux/servicesSlice";


const ServiceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getUserNameFromToken } = useUserFromToken();
  const { list: categories } = useSelector((state) => state.categories);
  const { loading, success, error } = useSelector((state) => state.services);
  const [dto, setDto] = useState({
    
    code: "",
    name: "",
    description: "",
    status: 1,
    categoryId: "",
    salePrice: 0,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(getAllCategories({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Servicio creado correctamente", { position: "top-center" });
      dispatch(resetServiceState());
      setTimeout(() => navigate("/services/list"), 2000);
    }
    if (error) toast.error(error, { position: "top-center" });
  }, [success, error, navigate, dispatch]);

  const handleChange = (e) => setDto({ ...dto, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!dto.code || !dto.name || !dto.categoryId)
    return toast.error("Todos los campos obligatorios deben estar completos.");

  if (!file)
    return toast.error("Debe seleccionar una imagen.");
  const userName = await getUserNameFromToken();  

  const dtoToSend = {
    ...dto,
    createUser: userName,
  };

  dtoToSend.categoryId = parseInt(dtoToSend.categoryId, 10);
  dtoToSend.salePrice = parseFloat(dtoToSend.salePrice);

  dispatch(addService({ dto: dtoToSend, file }));
};


  return (
    <div className="flex flex-col items-center w-full bg-gray-100 dark:bg-darkBg p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Crear Servicio</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-fourty/50 p-5 rounded-lg shadow">
        <label className="block mb-1 font-semibold text-black dark:text-white">Código *</label>
        <input type="number" name="code" value={dto.code} onChange={handleChange} className="input-field w-full mb-3" required />

        <label className="block mb-1 font-semibold text-black dark:text-white">Nombre *</label>
        <input type="text" name="name" value={dto.name} onChange={handleChange} className="input-field w-full mb-3" required />

        <label className="block mb-1 font-semibold text-black dark:text-white">Categoría *</label>
        <select name="categoryId" value={dto.categoryId} onChange={handleChange} className="input-field w-full mb-3" required>
          <option value="">Seleccione...</option>
          {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
        </select>

        <label className="block mb-1 font-semibold text-black dark:text-white">Imagen *</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="input-field w-full mb-3" required />
        {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded shadow mb-4" />}

        <label className="block font-semibold text-black dark:text-white mb-1">Precio</label>
        <input type="number" name="salePrice" value={dto.salePrice} onChange={handleChange} className="input-field w-full mb-3" />

        <label className="block mb-1 font-semibold text-black dark:text-white">Descripción</label>
        <textarea name="description" value={dto.description} onChange={handleChange} className="input-field w-full mb-3" />

        <button type="submit" disabled={loading} className="btn btn-fourty w-full">
          {loading ? "Procesando..." : "Crear Servicio"}
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
