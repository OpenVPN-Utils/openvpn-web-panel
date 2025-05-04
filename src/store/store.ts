import {configureStore} from '@reduxjs/toolkit';
import clientsReducer from './slices/clientsSlice';
import networkReducer from './slices/networkSlice';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import {useDispatch, useSelector} from "react-redux";

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    network: networkReducer,
    theme: themeReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;