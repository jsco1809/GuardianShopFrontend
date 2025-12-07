import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from "react-router-dom";
import Login from './pages/auth/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/cart/Orders";
import Products from "./pages/services/Products";
import ServiceForm from "./pages/services/ServiceForm";
import ServiceUpdate from "./pages/services/ServiceUpdate";
import ServiceList from "./pages/services/ServiceList";
import CategoryCreateForm from "./pages/services/CategoryCreateForm";
import CategoryUpdateForm from "./pages/services/CategoryUpdateForm";
import CategoryList from "./pages/services/CategoryList";
import Contact from "./components/Contact";
import ProductDetails from "./pages/services/ProductDetails";
import ChangePassword from "./pages/auth/ChangePassword";
import Cart from "./pages/cart/Cart";
import useAuthInitializer from "./hooks/useAuthInitializer";
import PrivateRoute from './components/routes/PrivateRoute';


function App() {
  useAuthInitializer();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>

  {/* Rutas públicas */}
  <Route index element={<Dashboard />} />
  <Route path="products" element={<Products />} />
  <Route path="contact" element={<Contact />} />
  <Route path="productDetails/:id" element={<ProductDetails />} />

  {/* Rutas protegidas para cualquier usuario */}
  <Route element={<PrivateRoute />}>
    <Route path="orders" element={<Orders />} />
    <Route path="cart" element={<Cart />} />
  </Route>

  {/* Rutas SOLO para role ADMIN */}
  <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
    <Route path="services/new" element={<ServiceForm />} />
    <Route path="services/edit" element={<ServiceUpdate />} />
    <Route path="services/list" element={<ServiceList />} />
    <Route path="categories/new" element={<CategoryCreateForm />} />
    <Route path="categories/edit" element={<CategoryUpdateForm />} />
    <Route path="categories/list" element={<CategoryList />} />
  </Route>

  {/* Auth */}
  <Route path="register" element={<Register />} />
  <Route path="login" element={<Login />} />
  <Route path="reset-password" element={<ChangePassword />} />
  <Route path="change-password" element={<ChangePassword />} />
</Route>

    )
  );

  return (
    <div className="App h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

const Root = () => {
  return (
    <>
      <section>
        <Navbar />
      </section>
      <section>
        <Outlet />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};