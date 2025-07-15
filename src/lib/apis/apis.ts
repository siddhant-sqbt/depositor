import { API_ENDPOINTS } from "../constants";
import type { DocumentFormValues, IWarehouseNameOption } from "../types";
import api from "./axiosInstance";

const postRegisterDepositor = async (data: DocumentFormValues) => {
  try {
    const response = await api.post(API_ENDPOINTS?.REGISTER_DEPOSITOR, data);
    return response?.data;
  } catch (error) {
    console.error("Error submitting contact form: ", error);
    return Promise.reject(error);
  }
};

const getRegisterDepositorDetails = async (id: string) => {
  try {
    const response = await api.get(`${API_ENDPOINTS?.VIEW_DEPOSITOR}/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error getting data: ", error);
    return Promise.reject(error);
  }
};

const getTableList = async (action_type: string, action_for: string) => {
  try {
    const response = await api.get(`${API_ENDPOINTS?.LIST_DEPOSITOR}?action_type=${action_type}&action_for=${action_for}&page=1&limit=10`);
    return response?.data;
  } catch (error) {
    console.error("Error getting data: ", error);
    return Promise.reject(error);
  }
};

const getStatesList = async (type: string): Promise<{ states: string[] }> => {
  try {
    const response = await api.get<{ states: string[] }>(`${API_ENDPOINTS?.WAREHOUSE_STATES_LIST}?state_inp=${type}`);
    return response?.data;
  } catch (error) {
    console.error("Error getting data: ", error);
    return Promise.reject(error);
  }
};

const getStateWiseNameList = async (type: string, state: string): Promise<{ data: IWarehouseNameOption[] }> => {
  try {
    const response = await api.get<{ data: IWarehouseNameOption[] }>(`${API_ENDPOINTS?.WAREHOUSE_NAME_LIST}?state_inp=${type}&state=${state}`);
    return response?.data;
  } catch (error) {
    console.error("Error getting data: ", error);
    return Promise.reject(error);
  }
};

export { postRegisterDepositor, getRegisterDepositorDetails, getTableList, getStatesList, getStateWiseNameList };
