import { fetchedDataType } from "../types";
const env = "DEV";

export function iconColorCheck(route: string) {
  const white = "hsl(340, 27%, 97%)";
  const black = "hsl(0, 0%, 17%)";

  if (route === "/") {
    return black;
  } else {
    return white;
  }
}

export function getQuery(category: string) {
  const endpoint =
    env === "DEV"
      ? process.env.NEXT_PUBLIC_DEV_BACKEND_ENDPOINT
      : process.env.NEXT_PUBLIC_PROD_BACKEND_ENDPOINT;
  const newQuery = `${endpoint}/api/${category}`;
  return newQuery;
}