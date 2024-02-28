import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import {registrationReducer} from "./slices/registrationSlice";
import {differentReducer} from "./slices/differentSlice";
import {paymentReducer} from "./slices/paymentSlice";
import {cmsCoursesReducer} from "./slices/cmsSlices/cmsCoursesSlice";
import {cmsWorkbooksReducer} from "./slices/cmsSlices/cmsWorkbooksSlice";
import {cmsUsersReducer} from "./slices/cmsSlices/cmsUsersSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    different: differentReducer,
    payment: paymentReducer,
    cmsCourses: cmsCoursesReducer,
    cmsWorkbooks: cmsWorkbooksReducer,
    cmsUsers: cmsUsersReducer
  },
});

export default store;

