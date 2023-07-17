import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

// END POINT DEVELOPTMENT
// const BASE_URL = "http://localhost:5000/";

// END POINT PRODUCTION
const BASE_URL = "http://54.206.254.31/";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default BASE_URL;
