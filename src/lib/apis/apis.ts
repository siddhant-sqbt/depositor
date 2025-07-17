import { API_ENDPOINTS } from "../constants";
import type { DocumentFormValues, IWarehouseNameOption } from "../types";
import api from "./axiosInstance";

const postRegisterDepositor = async (data: DocumentFormValues) => {
  try {
    const response = await api.post(API_ENDPOINTS?.POST_REGISTER_DEPOSITOR, data);
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

const getDistricts = async (selectedState: string) => {
  try {
    const response = await api.get(`/get-state-district?state=${selectedState}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching districts:", error);
  }
};

const postApproveForm = async (data: { remarks?: string; user_id: string }, req_no: string) => {
  try {
    const response = await api.put(`${API_ENDPOINTS?.APPROVE_FORM}/${req_no}`, data);
    return response?.data;
  } catch (error) {
    console.error("Error approving form: ", error);
    return Promise.reject(error);
  }
};

const postRejectForm = async (data: { remarks?: string; user_id: string }, req_no: string) => {
  try {
    const response = await api.put(`${API_ENDPOINTS?.REJECT_FORM}/${req_no}`, data);
    return response?.data;
  } catch (error) {
    console.error("Error rejecting form: ", error);
    return Promise.reject(error);
  }
};

const postDeleteForm = async (req_no: string) => {
  try {
    const response = await api.put(`${API_ENDPOINTS?.DELETE_FORM}/${req_no}`);
    return response?.data;
  } catch (error) {
    console.error("Error rejecting form: ", error);
    return Promise.reject(error);
  }
};

const getAttachment = async (req_no: string, doc_key: string) => {
  try {
    const response = await api.get(`${API_ENDPOINTS?.GET_ATTACHMENT}/${req_no}/${doc_key}`);
    return response?.data;
  } catch (error) {
    console.error("Error getting document: ", error);
    return Promise.reject(error);
  }
};

const deleteAttachment = async (req_no: string, doc_key: string) => {
  try {
    const response = await api.delete(`${API_ENDPOINTS?.DELETE_ATTACHMENT}/${req_no}/${doc_key}`);
    return response?.data;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return Promise.reject(error);
  }
};

const updateRegisterDepositor = async (data: DocumentFormValues) => {
  try {
    const response = await api.put(API_ENDPOINTS?.UPDATE_REGISTER_DEPOSITOR, data);
    return response?.data;
  } catch (error) {
    console.error("Error updating contact form: ", error);
    return Promise.reject(error);
  }
};

export {
  postRegisterDepositor,
  updateRegisterDepositor,
  getRegisterDepositorDetails,
  getTableList,
  getStatesList,
  getStateWiseNameList,
  getDistricts,
  postApproveForm,
  postRejectForm,
  postDeleteForm,
  getAttachment,
  deleteAttachment,
};
