import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import  ticketSlice  from "./slice/tickets";
import userSlice  from "./slice/users";
import contentSlice from "./slice/data";
import headerSlice from "./slice/headers";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  tickets: ticketSlice,
  users: userSlice,
  content: contentSlice,
  headers: headerSlice,
});

const reduxStore = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default reduxStore;
export const persistor = persistStore(reduxStore);
