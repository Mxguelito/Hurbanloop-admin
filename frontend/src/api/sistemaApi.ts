import api from "./axiosInstance";

export const sistemaApi = {
  async getDashboardData() {
    const res = await api.get("/sistemas/dashboard");
    return res.data;
  },
};
