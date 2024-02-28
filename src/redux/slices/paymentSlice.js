import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../api/axios";


export const fetchGetWorkbookPaymentToken = createAsyncThunk("payment/fetchGetWorkbookPaymentToken", async (params, thunkAPI) => {
    try {
        const response = await axios.post("/payments/create-payment", params);
        return response.data;

    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
});

export const fetchGetWorkbookPaymentStatus = createAsyncThunk("payment/fetchGetWorkbookPaymentStatus", async ( thunkAPI) => {
    try {
        const response = await axios.get("/payments/get-payment-status");
        return response.data;

    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
});



const initialState = {
    workbookPaymentToken: '',
    workbookPaymentStatus: ''
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        deleteRegistrSuccess(state) {
            state.registrationSuccess = false
        }
    },
    extraReducers: {
        [fetchGetWorkbookPaymentToken.pending]: (state) => {
            state.workbookPaymentToken = ''
        },
        [fetchGetWorkbookPaymentToken.fulfilled]: (state, action) => {
            state.workbookPaymentToken = action.payload

        },
        [fetchGetWorkbookPaymentToken.rejected]: (state, action) => {
            state.workbookPaymentToken = ''
        },
        [fetchGetWorkbookPaymentStatus.pending]: (state) => {
            state.workbookPaymentStatus = ''
        },
        [fetchGetWorkbookPaymentStatus.fulfilled]: (state, action) => {
            state.workbookPaymentStatus = action.payload

        },
        [fetchGetWorkbookPaymentStatus.rejected]: (state, action) => {
            state.workbookPaymentToken = ''
        }
    },
});

export const {  } = paymentSlice.actions



export const paymentReducer = paymentSlice.reducer;
