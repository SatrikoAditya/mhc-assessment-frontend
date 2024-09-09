import axios from "@/utils/axios";

export const userLogin = async (params: any) => {
  const result = await axios.post("user/login", params);

  return result.data;
};
