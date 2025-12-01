import { apiGet, apiPost, apiDelete } from "./api";

export const getAllSubmissions = () => apiGet("/submissions");
export const getSubmission = (id: number) => apiGet(`/submissions/${id}`);
export const createSubmission = (data: FormData) => apiPost("/submissions", data);
export const updateSubmission = (id: number, data: FormData) =>
  apiPost(`/submissions/${id}`, data);
export const deleteSubmission = (id: number) => apiDelete(`/submissions/${id}`);
