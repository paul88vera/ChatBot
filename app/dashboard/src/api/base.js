import axios from "axios";

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://server.verafied.tech/api',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function attachClerkInterceptor(getToken) {
  baseApi.interceptors.request.use(async (config) => {
    const token = await getToken();

    console.log("=== AXIOS CLERK ===");
    console.log("URL:", config.url);
    console.log("Token exists:", Boolean(token));
    console.log("Token length:", token?.length);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return () => {
    baseApi.interceptors.request.eject(interceptorId);
  };
}