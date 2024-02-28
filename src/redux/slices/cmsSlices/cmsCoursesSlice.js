import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import axios from "../../../api/axios";


export const fetchGetAllCourses = createAsyncThunk("cms/fetchGetAllCourses", async (params, thunkAPI) => {
    try {
        const response = await axios.get("/course/get-courses");

        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})


export const fetchModifyCourse = createAsyncThunk("cms/fetchModifyCourse", async (params, thunkAPI) => {
    try {
        const response = await axios.patch(`/course/modify/${params.courseId}`, params.formData);

        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})

export const fetchAddNewCourse = createAsyncThunk("cms/fetchAddNewCourse", async (params, thunkAPI) => {
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
    courses: [],
    addNewCourseSuccess: false

};
const cmsCoursesSlice = createSlice({
    name: "cmsCourses",
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
        [fetchGetAllCourses.pending]: (state) => {
            state.status = "loading";
            state.pendingStatus = 'loading'

        },
        [fetchGetAllCourses.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.pendingStatus = null
            state.courses = action.payload
        },
        [fetchGetAllCourses.rejected]: (state, action) => {
            state.status = "error";
            state.pendingStatus = null;
        },
        [fetchModifyCourse.pending]: (state) => {
            state.status = "loading";
            state.pendingStatus = 'loading'

        },
        [fetchModifyCourse.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.pendingStatus = null

        },
        [fetchModifyCourse.rejected]: (state, action) => {
            state.status = "error";
            state.pendingStatus = null;
        },
        [fetchAddNewCourse.pending]: (state) => {
            state.status = "loading";
            state.pendingStatus = 'loading'

        },
        [fetchAddNewCourse.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.pendingStatus = null
            state.addNewCourseSuccess = true
            console.log(action.payload)

        },
        [fetchAddNewCourse.rejected]: (state, action) => {
            state.status = "error";
            state.pendingStatus = null;
            state.addNewCourseSuccess = false
        }
    }
});

export const selectIsAuth = (state) => Boolean(state.auth.isAuth);
export const pendingStatus = (state) => state.auth.pendingStatus
export const token = (state) => state.auth.token


export const {logout, setAuth, clearAuthErrors} = cmsCoursesSlice.actions

export const cmsCoursesReducer = cmsCoursesSlice.reducer;
