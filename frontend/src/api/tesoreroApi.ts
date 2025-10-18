import api from "./axiosInstance";

export const tesoreroApi = {
  async getDashboardData() {
    const res = await api.get("/tesoreros/dashboard");
    return res.data;
  },
};
