import axios from "axios";

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://server.verafied.tech/api",
  withCredentials: false,
});

export function attachClerkInterceptor(getToken) {
  baseApi.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}
