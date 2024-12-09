import { Loader } from "@/components/loader";
import { Navbar } from "@/components/nav-bar";
import { axiosInstance } from "@/lib/axios";
import { cookieManager } from "@/lib/handle-cookie";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProviderProps {
  redirectPath?: string; // Optional redirect path
}

const ProtectedRouteProvider: FC<ProtectedRouteProviderProps> = ({
  redirectPath = "/sign-in", // Default redirect path
}) => {
  const isAuthenticated = cookieManager.getCookie("authToken");

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  const { data: user, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/me");
      return res.data;
    },
  });

  return (
    <Loader isLoading={isFetching}>
      <Navbar user={user?.data} />
      <Outlet />
    </Loader>
  );
};

export default ProtectedRouteProvider;
