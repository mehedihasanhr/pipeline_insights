import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

// goal
import goalReducer from "./slices/goalSlice";
import goalModalReducer from "./slices/goalModalSlice";
import goalFormModalReducer from "./slices/goalFormModalSlice";

// dashboard
import dashboardReducer from "./slices/dashboardSlice";

// reports
import reportReducer from "./slices/reportSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        goals: goalReducer,
        goalModal : goalModalReducer,
        goalFormModal: goalFormModalReducer,
        dashboards: dashboardReducer,
        reports: reportReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});
