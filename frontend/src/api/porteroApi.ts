import api from "./axiosInstance";

export const porteroApi = {
  async getDashboardData() {
    const res = await api.get("/porteros/dashboard");
    return res.data;
  },
};
