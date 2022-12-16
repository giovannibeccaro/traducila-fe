import { fetchedDataType } from "../types";
let env = "PROD";

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

export const stringToSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function dangerouslyHtmlLinkConvert(e: any) {
  const targetLink = e.target.closest("a");
  if (!targetLink) return;
  e.preventDefault();
  return targetLink.href;
  console.log(targetLink.href); // this.props.history.push(e.target.href)
}
