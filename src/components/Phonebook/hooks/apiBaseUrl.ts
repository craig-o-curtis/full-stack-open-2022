// ** assumes site and api endpoints on same url
export const apiBaseUrl =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api";
