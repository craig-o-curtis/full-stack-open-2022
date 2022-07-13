export const specifyApiBaseUrl = (type: "production" | "development") => {
  return type === "production"
    ? "https://uhel-2022-server.herokuapp.com/api"
    : "http://localhost:3001/api";
};

export const apiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://uhel-2022-server.herokuapp.com/api"
    : "http://localhost:3001/api";
