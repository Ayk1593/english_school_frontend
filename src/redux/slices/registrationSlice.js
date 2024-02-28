import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../api/axios";
import {fetchAuth} from "./authSlice";


export const fetchRegistration = createAsyncThunk("registr/fetchRegistration", async (params, thunkAPI) => {
    try {
        const response = await axios.post("/signup", params);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
});


export const fetchRegistrationWithAuth = createAsyncThunk("registr/fetchRegistrationWithAuth", async (params, thunkAPI) => {
    const objForAuth = {
        'email': params.email,
        'password': params.password
    }
    try {
        const response = await axios.post("/signup", params);
        await thunkAPI.dispatch(fetchAuthAfterRegistr(objForAuth))
        return response.data;

    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
});

export const fetchAuthAfterRegistr = createAsyncThunk("auth/fetchAuthAfterRegistr", async (params, thunkAPI) => {
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

const initialState = {
    registrationSuccess: false,
    status: "loading",
    pendingStatus: null,
    registrErrors: null,
    passwordForAuth: '',
    registrAndAuthSuccess: false
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        deleteRegistrSuccess(state) {
            state.registrationSuccess = false
        },
        clearRegistrAndAuthSuccess(state) {
            state.registrAndAuthSuccess = false
        },
        clearRegistrErrors(state) {
            state.registrErrors = null
        },
        clearRegistrStatus(state) {
            state.status = 'loading'
        }
    },
    extraReducers: {
        [fetchRegistration.pending]: (state) => {
            state.status = "loading"
            state.registrationSuccess = false
            state.pendingStatus = 'loading'
        },
        [fetchRegistration.fulfilled]: (state, action) => {
            state.status = "loaded"
            state.registrationSuccess = true
            state.pendingStatus = null
            state.registrErrors = null
        },
        [fetchRegistration.rejected]: (state, action) => {
            state.status = "error";
            state.registrationSuccess = false;
            state.pendingStatus = null;
            state.registrErrors = action.payload
        },
        [fetchRegistrationWithAuth.pending]: (state) => {
            state.status = "loading"
            state.registrAndAuthSuccess = false
            state.pendingStatus = 'loading'
        },
        [fetchRegistrationWithAuth.fulfilled]: (state, action) => {
            state.status = "loaded"
            state.registrAndAuthSuccess = true
            state.pendingStatus = null
        },
        [fetchRegistrationWithAuth.rejected]: (state, action) => {
            state.status = "error";
            state.registrAndAuthSuccess = false;
            state.pendingStatus = null
            state.registrErrors = action.payload
        },
    },
});

export const { deleteRegistrSuccess, clearRegistrAndAuthSuccess, clearRegistrErrors, clearRegistrStatus } = registrationSlice.actions

export const selectRegistrationSuccess = (state) => state.registration.registrationSuccess;
export const registrationPendingStatus = (state) => state.registration.pendingStatus

export const registrationReducer = registrationSlice.reducer;
