import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "../../api/axios";


export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params, thunkAPI) => {
  try {
    const response = await axios.post("/signin", params);
    if (response.data.token) {
      window.localStorage.setItem('token', response.data.token)
    }
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async (state, dispatch) => {
  const { data } = await axios.get("/users/me");
  return data
});

export const fetchChangeName = createAsyncThunk("auth/fetchChangeName", async (params) => {
  const { data } = await axios.patch("/users/me", params);
  return data
});

export const fetchChangeAvatar = createAsyncThunk("auth/fetchChangeAvatar", async (params, dispatch, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("avatar", params);
    const { data } = await axios.patch("/users/me/avatar", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
});

export const fetchChangeLangLevel = createAsyncThunk("auth/fetchChangeLangLevel", async (params, thunkAPI) => {
  try {
    const {data} = await axios.patch("/users/me/lang-level", params);
    return data
  } catch (err) {
    console.log(err.response.data)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
});

export const fetchEmailSubscribe = createAsyncThunk("auth/fetchEmailSubscribe", async (params, thunkAPI) => {
  try {
    const {data} = await axios.patch("/users/me/email-subscription", params);
    return data
  } catch (err) {
    console.log(err.response.data)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
});

const initialState = {
  initialized: false,
  isAuth: false,
  isAdmin: false,
  token: null,
  userData: null,
  userName: '',
  langLevel: null,
  avatar: '',
  avatarLoaded: false,
  status: "loading",
  pendingStatus: null,
  authErrors: null,
  emailSubsSuccess: false,
  authMeError: null
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false
      state.userData = null
      state.userName = ''
      state.avatar = ''
      state.langLevel = null
      state.isAdmin = false
    },
    setAuth(state) {
      state.isAuth = true
    },
    clearAuthErrors(state) {
      state.authErrors = null
    },
    setEmptyAvatar(state) {
      state.avatar = ''
    },
    setAvatar(state, action) {
      state.avatar = action.payload
    },
    deleteEmailSubsSuccess(state) {
      state.emailSubsSuccess = false
    }
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.token = null;
      state.isAuth = false;
      state.pendingStatus = 'loading'
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.token = action.payload.token;
      state.isAuth = true;
      state.pendingStatus = null
      state.authErrors = null
    },
    [fetchAuth.rejected]: (state, action) => {
      state.status = "error";
      state.token = null;
      state.isAuth = false;
      state.pendingStatus = null;
      state.authErrors = action.payload
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.authMeError = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.isAdmin = action.payload.is_admin
      state.authMeError = null;
      state.userData = action.payload;
      state.userName = action.payload.name;
      state.avatar = action.payload.avatar;
      state.langLevel = action.payload.lang_level
    },
    [fetchAuthMe.rejected]: (state) => {
      state.pendingStatus = null;
      state.authMeError = true;
    },
    [fetchChangeName.pending]: (state) => {
    },
    [fetchChangeName.fulfilled]: (state, action) => {
      state.userName = action.payload.name;
    },
    [fetchChangeName.rejected]: (state, action) => {
      state.userName = '';
    },
    [fetchChangeAvatar.pending]: (state) => {
    },
    [fetchChangeAvatar.fulfilled]: (state, action) => {
      state.avatar = action.payload.avatar;
      state.avatarLoaded = !state.avatarLoaded;
    },
    [fetchChangeAvatar.rejected]: (state, action) => {

    },
    [fetchChangeLangLevel.pending]: (state) => {
    },
    [fetchChangeLangLevel.fulfilled]: (state, action) => {
      state.langLevel = action.payload.lang_level;
    },
    [fetchChangeLangLevel.rejected]: (state, action) => {
    },
    [fetchEmailSubscribe.pending]: (state) => {
    },
    [fetchEmailSubscribe.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.emailSubsSuccess = true
    },
    [fetchEmailSubscribe.rejected]: (state, action) => {
    }
  }


});

// export const selectIsAuth = (state) => Boolean(state.auth.userData);
export const selectIsAuth = (state) => Boolean(state.auth.isAuth);
export const pendingStatus = (state) => state.auth.pendingStatus
export const token = (state) => state.auth.token


export const { logout, clearAuthErrors, deleteEmailSubsSuccess} = authSlice.actions

export const authReducer = authSlice.reducer;
