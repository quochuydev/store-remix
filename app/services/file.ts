import axios from "axios";

export const fileService = {
  create: async (data: any) => {
    return axios.post("/files", data);
  },
  update: (id: string, data: any) => {
    return {};
  },
  delete: (id: string) => {
    return {};
  },
  getList: () => {
    return [];
  },
};
