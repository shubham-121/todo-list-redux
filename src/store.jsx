import { configureStore } from "@reduxjs/toolkit";
import featureReducer from "./features";

const store = configureStore({
  reducer: {
    features: featureReducer,
  },
});
console.log(store.getState());

export default store;
