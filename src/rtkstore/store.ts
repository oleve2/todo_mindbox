import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todoreducer from "./todoreducer";

export const store = configureStore({
  reducer: {
    todoreducer: todoreducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
