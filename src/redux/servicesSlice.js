// src/redux/servicesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Global } from "../helpers/Global";

const toBase64 = (obj) => btoa(JSON.stringify(obj));

/* ------------------------------------
    GET SERVICE BY ID
--------------------------------------*/
export const getServiceById = createAsyncThunk(
  "services/getServiceById",
  async ({ id }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(Global.url + "services/list/id", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: toBase64({ id }),
      });

      if (!response.ok)
        return rejectWithValue("Error obteniendo servicio por ID");

      const base64Text = await response.text();
      return JSON.parse(atob(base64Text));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ------------------------------------
    GET ALL SERVICES (PAGINATED)
--------------------------------------*/
export const getAllServices = createAsyncThunk(
  "services/getAllServices",
  async ({ page = 1 }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(Global.url + "services/list/all", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: toBase64({ page }),
      });

      if (!response.ok) return rejectWithValue("Error listando servicios");

      const base64Text = await response.text();
      const data = JSON.parse(atob(base64Text));
      

      // Retornamos lista y totalPages como en categorySlice
      return {
        list: data.data.content || [],
        totalPages: data.data.totalPages || 1,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ------------------------------------
    ADD / UPDATE SERVICE
--------------------------------------*/
export const addService = createAsyncThunk(
  "services/addService",
  async ({ dto, file }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const categoryId = parseInt(dto.categoryId, 10);
      dto.categoryId = categoryId;
      const formData = new FormData();
      const dtoBase64 = toBase64(dto);
      formData.append("entity", dtoBase64);
      if (file) formData.append("file", file);
      const response = await fetch(Global.url + "services/addRecord", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) return rejectWithValue("Error creando servicio");
      const base64Text = await response.text();
      return JSON.parse(atob(base64Text));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ dto, file }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const formData = new FormData();
      const dtoBase64 = toBase64(dto);
      console.log("DTO Base64:", dtoBase64);
      formData.append("entity", dtoBase64);
      if (file) formData.append("file", file);
console.log("file to upload:", file);
      const response = await fetch(Global.url + "services/updateRecord", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) return rejectWithValue("Error actualizando servicio");

      const base64Text = await response.text();
      console.log("Response base64Text:", base64Text);
      return JSON.parse(atob(base64Text));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ------------------------------------
    GET SERVICE WITH INVENTORY
--------------------------------------*/
export const getServiceWithInventory = createAsyncThunk(
  "services/getServiceWithInventory",
  async ({ id }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(Global.url + "services/inventory", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: toBase64({ id }),
      });

      if (!response.ok) return rejectWithValue("Error obteniendo servicio con inventario");

      const base64Text = await response.text();
      return JSON.parse(atob(base64Text));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ------------------------------------
      SLICE
--------------------------------------*/
const servicesSlice = createSlice({
  name: "services",
  initialState: {
    list: [],
    service: null,
    currentService: null,
    loading: false,
    error: null,
    success: false,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setCurrentPage: (state, action) => { state.currentPage = action.payload; },
    setCurrentService: (state, action) => { state.currentService = action.payload; },
    resetServiceState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* GET BY ID */
      .addCase(getServiceById.pending, (state) => { state.loading = true; })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET ALL */
      .addCase(getAllServices.pending, (state) => { state.loading = true; })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD */
      .addCase(addService.pending, (state) => { state.loading = true; })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.service = action.payload;
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateService.pending, (state) => { state.loading = true; })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.service = action.payload;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET WITH INVENTORY */
      .addCase(getServiceWithInventory.pending, (state) => { state.loading = true; })
      .addCase(getServiceWithInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
      })
      .addCase(getServiceWithInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setCurrentService, resetServiceState } = servicesSlice.actions;

export default servicesSlice.reducer;
