import axios from "@/utils/axios";

export const getVendors = async () => {
  const result = await axios.get("vendor");
  return result.data;
};
