import { API_ENDPOINTS } from "../constants";
import type { IVerifyOTPPayload } from "../types";
import api from "./axiosInstance";

const postGenerateOTP = async (data: { mobile: string }) => {
  try {
    const response = await api.post(API_ENDPOINTS?.GENERATE_OTP, data);
    return response?.data;
  } catch (error) {
    console.error("Error generating OTP: ", error);
    return Promise.reject(error);
  }
};

const postVerifyOTP = async (data: IVerifyOTPPayload) => {
  try {
    const response = await api.post(API_ENDPOINTS?.VALIDATE_OTP, data);
    return response?.data;
  } catch (error) {
    console.error("Error verifying OTP: ", error);
    return Promise.reject(error);
  }
};

const getSSOLogin = async () => {
  try {
    const response = await api.get(API_ENDPOINTS?.SSO_LOGIN);
    return response?.data;
  } catch (error) {
    console.error("Error Logging in: ", error);
    return Promise.reject(error);
  }
};

export { postGenerateOTP, postVerifyOTP, getSSOLogin };
