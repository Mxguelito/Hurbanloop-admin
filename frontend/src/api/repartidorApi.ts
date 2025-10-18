import api from "./axiosInstance";

export const repartidorApi = {
  async getDashboardData() {
    const res = await api.get("/repartidores/dashboard");
    return res.data;
  },
};
