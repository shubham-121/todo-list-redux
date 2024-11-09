import { configureStore } from "@reduxjs/toolkit";
import featureReducer from "./features";
import UiReducer from "./uiFeatures";

const store = configureStore({
  reducer: {
    features: featureReducer,
    UI: UiReducer,
  },
});
console.log(store.getState());

export default store;
