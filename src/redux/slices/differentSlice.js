import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import axios from "../../api/axios";


export const fetchEmailSubscribe = createAsyncThunk("different/fetchEmailSubscribe", async (params, thunkAPI) => {
    try {
        const response = await axios.post("/email-subscription", params);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})

export const fetchGrLessApp = createAsyncThunk("different/fetchGrLessApp", async (params, thunkAPI) => {
    try {
        const response = await axios.post("/signin", params);

        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})

export const fetchSendAnswer = createAsyncThunk("different/fetchSendAnswer", async (params, thunkAPI) => {
    try {
        const response = await axios.post("/signin", params);

        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})


const initialState = {
    emailSubscribeModalOpen: false,
    emailSubscribeError: false,
    emailSubsStatus: 'loading',
    grLessAppSuccess: false,
    sendAnswerIsSuccess: false

};
const differentSlice = createSlice({
    name: "different",
    initialState,
    reducers: {
        closeSubscribeModalOpen(state) {
            state.emailSubscribeModalOpen = false
        },
        clearAuthErrors(state) {
            state.authErrors = null
        },
        clearGroupLessApp(state) {
            state.grLessAppSuccess = false
        },

    },
    extraReducers: {
        [fetchEmailSubscribe.pending]: (state) => {
            state.emailSubsStatus = "loading";
            state.pendingStatus = 'loading'

        },
        [fetchEmailSubscribe.fulfilled]: (state, action) => {
            state.emailSubsStatus = "loaded";
            state.pendingStatus = null
            state.emailSubscribeModalOpen = Date.now()
            state.emailSubscribeError = false

        },
        [fetchEmailSubscribe.rejected]: (state, action) => {
            state.emailSubsStatus = "error";
            state.pendingStatus = null;
            state.emailSubscribeModalOpen = Date.now()
            state.emailSubscribeError = action.payload
        },
        [fetchGrLessApp.pending]: (state) => {
            state.status = "loading";
            state.pendingStatus = 'loading'

        },
        [fetchGrLessApp.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.pendingStatus = null
            state.grLessAppSuccess = true

        },
        [fetchGrLessApp.rejected]: (state, action) => {
            state.status = "error";
            state.pendingStatus = null;
            state.grLessAppSuccess = false
        },
        [fetchSendAnswer.pending]: (state) => {
            state.sendAnswerIsSuccess = false
        },
        [fetchSendAnswer.fulfilled]: (state, action) => {
            state.sendAnswerIsSuccess = true

        },
        [fetchSendAnswer.rejected]: (state, action) => {
            state.sendAnswerIsSuccess = false
        }
    },
});

export const selectIsAuth = (state) => Boolean(state.auth.isAuth);
export const pendingStatus = (state) => state.auth.pendingStatus
export const token = (state) => state.auth.token


export const {closeSubscribeModalOpen, clearGroupLessApp, clearAuthErrors} = differentSlice.actions

export const differentReducer = differentSlice.reducer;
