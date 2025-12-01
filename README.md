# 🛒 SAK Global – Frontend (React + Redux)

Frontend del e-commerce **SAK Global**, desarrollado con **React**, **Redux** y un ecosistema moderno orientado a rendimiento, escalabilidad y mantenibilidad.  
Este proyecto consume el microservicio **ms_security** (Java Spring Boot) y el resto de servicios del backend general de Sak Global.

---

## 🚀 Tecnologías Utilizadas

- **React 18**
- **Redux Toolkit**
- **React Router DOM**
- **Axios**
- **JavaScript / ES2023**
- **Vite** (para desarrollo rápido y build optimizado)
- **CSS Modules / Styled Components (según código entregado)**
- **JWT** (gestión local de autenticación)

## ⚙️ Instalación y Ejecución

### 1. Clonar repositorio
```bash
git clone https://github.com/jsco1809/GuardianShopFrontend
cd sak-global-frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno  
Crear `.env` en la raíz:

```
VITE_API_URL=http://localhost:8081
```

(O usar la URL pública del ms_security o gateway).

### 4. Ejecutar el proyecto
```bash
npm run dev
```

El sistema arrancará en:

```
http://localhost:5173
```

---

## 🔐 Funcionalidades Principales

### 🔸 Autenticación (ms_security)
- Login
- Registro
- Validación de token
- Persistencia de sesión
- Acceso protegido mediante rutas privadas

### 🔸 Catálogo de Productos
- Listado general
- Filtros por categoría
- Detalles del producto
- Manejo de stock desde el backend

### 🔸 Categorías
- Listado general
- Consultas dinámicas
- Carga desde API real

### 🔸 Carrito de Compras
- Agregar productos
- Eliminar productos
- Vaciar carrito
- Gestión de cantidades
- Cálculo automático del total

### 🔸 UI General
- Navbar funcional con login/logout
- Footer global
- Cards totalmente reutilizables
- Manejo de estados de carga (Loader)
- Alertas con SweetAlert2

---

## 🔗 Comunicación con Backend

El frontend consume los siguientes endpoints del backend (todos obtenidos del proyecto):

### **AuthController**
```
POST /auth/login
POST /auth/register
POST /auth/validate
```

### **CategoryController**
```
POST /categories/create
POST /categories/list
POST /categories/{id}
```

### **CartController**
```
POST /cart/add
POST /cart/remove
POST /cart/clear
POST /cart/by-user
POST /cart/product/{id}
```

Estos endpoints ya están integrados desde los thunks de Redux.

---

## 🧪 Pruebas

- Se validan llamadas a la API mediante Postman
- Se utiliza Redux DevTools para depuración
- Se integran alertas de éxito/error provenientes del backend ms_security

---

## 🧱 Arquitectura del Frontend

- **Redux Toolkit** para manejo global de estado
- **React Router DOM** para navegación entre vistas
- **Axios** configurado con interceptores
- **Componentes desacoplados y reutilizables**
- **Optimización con Vite**

---

## 🚀 Despliegue

Puede desplegarse fácilmente en:

- **Vercel**
- **Netlify**
- **Firebase Hosting**
- **GitHub Pages (solo SPA)**

---

## 👥 Autores

**Jefferson Andrés Moreno Pedraza**  
**Johan Sebastián Cárdenas Orozco**

Proyecto personal – 2024.

---

## 📄 Licencia

Este proyecto es de uso académico y personal.  
