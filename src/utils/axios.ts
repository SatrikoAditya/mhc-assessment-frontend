import AxiosInstance from "axios";

const axios = AxiosInstance.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3002/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
