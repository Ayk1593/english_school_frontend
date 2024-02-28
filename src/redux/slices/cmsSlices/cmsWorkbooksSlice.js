import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import {fetchModifyCourse} from "./cmsCoursesSlice";


export const fetchGetAllWorkbooks = createAsyncThunk("cms/fetchGetAllWorkbooks", async (params, thunkAPI) => {
    try {
        const response = await axios.get("/workbook/get-workbooks");

        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})

export const fetchModifyWorkbook = createAsyncThunk("cms/fetchModifyWorkbook", async (params, thunkAPI) => {
    try {
        const response = await axios.patch(`/workbook/modify/${params.workbookId}`, params.formData);

        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})

export const fetchAddNewWorkbook = createAsyncThunk("cms/fetchAddNewWorkbook", async (params, thunkAPI) => {
    try {
        const response = await axios.post("course/create", params);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})



const initialState = {
    workbooks: [],
    addNewWorkbookSuccess: false

};
const cmsWorkbooksSlice = createSlice({
    name: "cmsWorkbooks",
    initialState,
    reducers: {
        logout(state) {
            state.isAuth = false
            state.userData = null
            state.userName = ''
            state.langLevel = null
        },
        setAuth(state) {
            state.isAuth = true
        },
        clearAuthErrors(state) {
            state.authErrors = null
        }
    },
    extraReducers: {
        [fetchGetAllWorkbooks.pending]: (state) => {
            state.status = "loading";
            state.pendingStatus = 'loading'

        },
        [fetchGetAllWorkbooks.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.pendingStatus = null
            state.workbooks = action.payload
            console.log(action.payload)
        },
        [fetchGetAllWorkbooks.rejected]: (state, action) => {
            state.status = "error";
            state.pendingStatus = null;
        },
        [fetchModifyWorkbook.pending]: (state) => {
            state.status = "loading";
            state.pendingStatus = 'loading'

        },
        [fetchModifyWorkbook.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.pendingStatus = null

        },
        [fetchModifyWorkbook.rejected]: (state, action) => {
            state.status = "error";
            state.pendingStatus = null;
        },
        [fetchAddNewWorkbook.pending]: (state) => {

        },
        [fetchAddNewWorkbook.fulfilled]: (state, action) => {
            state.addNewWorkbookSuccess = true

        },
        [fetchAddNewWorkbook.rejected]: (state, action) => {
            state.addNewWorkbookSuccess = false
        }
    }
});

export const selectIsAuth = (state) => Boolean(state.auth.isAuth);
export const pendingStatus = (state) => state.auth.pendingStatus
export const token = (state) => state.auth.token


export const {logout, setAuth, clearAuthErrors} = cmsWorkbooksSlice.actions

export const cmsWorkbooksReducer = cmsWorkbooksSlice.reducer;
