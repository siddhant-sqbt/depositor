import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  userRole: "E" | "C" | null;
  userData: string | null;
  mobileNo: string | null;
  empPernr: string | null;
  empNumber: string | null;
  plantNo: string | null;
  employeeData: any;
  phoneNumber: string | null;
  authToken: string | null;
}

const initialState: AuthState = {
  userRole: null,
  userData: null,
  mobileNo: null,
  empPernr: null,
  empNumber: null,
  plantNo: null,
  employeeData: null,
  phoneNumber: null,
  authToken: null,
};

function createSetter<T>(key: keyof T) {
  return (state: T, action: PayloadAction<any>) => {
    state[key] = action.payload;
  };
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<"E" | "C" | null>) => {
      state.userRole = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    setAuthField: (state, action: PayloadAction<{ key: keyof AuthState; value: any }>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthField } = authSlice.actions;

export default authSlice.reducer;
