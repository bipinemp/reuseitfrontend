import { parseCookies } from "nookies";

export default function getCookie() {
  const cookies = parseCookies();
  const token = cookies["jwt"];

  return token;
}
