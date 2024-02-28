import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import axios from "../../../api/axios";


export const fetchGetEmailSubsNoregistrUsers = createAsyncThunk("cms/fetchGetEmailSubsNoregistrUsers", async (thunkAPI) => {
    try {
        const response = await axios.get("/subscription/get-all");

        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})




const initialState = {
    emailSubsNoregistrList: []

};
const cmsUsersSlice = createSlice({
    name: "cmsUsers",
    initialState,
    reducers: {
        clearEmailSubsNoregistrListl(state) {
            state.emailSubsNoregistrList = []
        },
        setAuth(state) {
            state.isAuth = true
        },
        clearAuthErrors(state) {
            state.authErrors = null
        }
    },
    extraReducers: {
        [fetchGetEmailSubsNoregistrUsers.pending]: (state) => {

        },
        [fetchGetEmailSubsNoregistrUsers.fulfilled]: (state, action) => {
            state.emailSubsNoregistrList = action.payload
            console.log(action.payload)
        },
        [fetchGetEmailSubsNoregistrUsers.rejected]: (state, action) => {

        }
    }
});

export const selectIsAuth = (state) => Boolean(state.auth.isAuth);
export const pendingStatus = (state) => state.auth.pendingStatus


export const {clearEmailSubsNoregistrListl} = cmsUsersSlice.actions

export const cmsUsersReducer = cmsUsersSlice.reducer;
