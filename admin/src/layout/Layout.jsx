import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function Layout() {
  const navigate = useNavigate();

  const protectRoutes = () => {
    const token = Cookies.get("accessTokenAdmin");
    if (!token) {
      navigate("/");
      toast.error("Please Login to Access");
    }
  };

  useEffect(() => {
    protectRoutes();
  }, []);

  const location = useLocation();
  console.log(location.pathname.split("/")[2]);

  const { refreshAccessToken, isTokenExpire } = useContext(MyContext);

  const logoutFn = async () => {
    const val = isTokenExpire();
    if (val) {
      await refreshAccessToken();
    }
    const accessToken = Cookies.get("accessTokenAdmin");
    const decoded = jwtDecode(accessToken);
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://aayan.samadhaangroups.co.in/api/v1/admin/logout",
        headers: {
          Accept: "application/json",
        },
        data: {
          id: decoded?._id,
        },
      };
      const response = await axios.request(config);
      // toast.success("Service added successfully");

      Cookies.remove("accessTokenAdmin");
      Cookies.remove("refreshToken");
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 justify-between pr-6 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {location.pathname.split("/")[2]}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div>
            <Button onClick={logoutFn} variant="outline">
              Logout
            </Button>
          </div>
        </header>
        <div className="m-5">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
