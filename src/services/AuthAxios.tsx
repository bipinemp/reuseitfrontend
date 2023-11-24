import { cookies } from "next/headers";
import axios from "axios";

const AuthAxios = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;
  const http = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return { http };
};

export default AuthAxios;
