import api from "./axiosInstance";

export const comercioApi = {
  async getDashboardData() {
    const res = await api.get("/comercios/dashboard");
    return res.data;
  },
};
