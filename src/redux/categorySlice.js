// src/redux/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Global } from "../helpers/Global";

const toBase64 = (obj) => btoa(JSON.stringify(obj));

/* ------------------------------------
    GET CATEGORY BY ID
--------------------------------------*/
export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async ({ id }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(Global.url + "categories/list/id", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
        body: toBase64({ id }),
      });

      if (!response.ok)
        return rejectWithValue("Error obteniendo categoría por ID");

      const base64Text = await response.text();
      return JSON.parse(atob(base64Text));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ------------------------------------
    GET ALL CATEGORIES (PAGINATED)
--------------------------------------*/
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async ({ page = 1 }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(Global.url + "categories/list/all", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
        body: toBase64({ page }),
      });

      if (!response.ok) return rejectWithValue("Error listando categorías");

      const base64Text = await response.text();
      const data = JSON.parse(atob(base64Text));

      // Aquí asumimos que el backend devuelve un PageImpl como en productos
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
    ADD / UPDATE CATEGORY
--------------------------------------*/
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (dto, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(Global.url + "categories/addRecord", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
        body: toBase64(dto),
      });

      if (!response.ok) return rejectWithValue("Error creando categoría");

      const base64Text = await response.text();
      return JSON.parse(atob(base64Text));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (dto, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(Global.url + "categories/updateRecord", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
        body: toBase64(dto),
      });

      if (!response.ok) return rejectWithValue("Error actualizando categoría");

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
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    category: null,
    currentCategory: null,
    loading: false,
    error: null,
    success: false,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    resetCategoryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.category = null;
      state.currentCategory = null;
      state.list = [];
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      /* GET BY ID */
      .addCase(getCategoryById.pending, (state) => { state.loading = true; })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET ALL */
      .addCase(getAllCategories.pending, (state) => { state.loading = true; })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD */
      .addCase(addCategory.pending, (state) => { state.loading = true; })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.category = action.payload;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateCategory.pending, (state) => { state.loading = true; })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.category = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setCurrentCategory, resetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
