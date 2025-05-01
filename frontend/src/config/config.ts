export const BASE_API_URL =
  import.meta.env.VITE_ENV === 'production'
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_API_URL;
