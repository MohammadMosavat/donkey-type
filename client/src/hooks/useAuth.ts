import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    console.log(accessToken);
    if (accessToken) {
      if (pathname.startsWith("/register")) {
        router.push("/");
      }
    } else {
      if (pathname.startsWith("/yourhall")) {
        router.push("/register/login");
      }
    }
  }, [pathname, router]);
};

export default useAuth;
