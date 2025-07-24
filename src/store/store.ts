import { configureStore } from "@reduxjs/toolkit";
import registrationFormReducer from "@/store/slice/registrationFormSlice";
import authFormReducer from "@/store/slice/authSlice";
import { authSlice } from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    registrationForm: registrationFormReducer,
    auth: authFormReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
