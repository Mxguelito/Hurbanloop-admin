import api from "./axiosInstance";

export const propietarioApi = {
  async getDashboardData() {
    const res = await api.get("/propietarios/dashboard");
    return res.data;
  },
};
