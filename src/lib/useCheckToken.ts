import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import getCookie from "./getCookie";

export default function useCheckToken() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie(); // function to get token from cookies
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);
}
