import api from "./axiosInstance";

export const inquilinoApi = {
  async getDashboardData() {
    const res = await api.get("/inquilinos/dashboard");
    return res.data;
  },
};
