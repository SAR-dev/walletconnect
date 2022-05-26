import { configureStore } from "@reduxjs/toolkit";
import walletConnectReducer from "../features/walletConnectSlice";
import applicationReducer from "../features/applicationSlice";

const store = configureStore({
  reducer: {
    walletConnect: walletConnectReducer,
    application: applicationReducer,
  },
  preloadedState: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type StoreGetSate = typeof store.getState;
export type RootState = ReturnType<StoreGetSate>;
export type AppDispatch = typeof store.dispatch;

export default store;
