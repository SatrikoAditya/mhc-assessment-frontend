"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUserLogin } from "@/hooks/react-query/user";
import { Cookies } from "react-cookie";
import axios from "@/utils/axios";
import { message } from "antd";
import { useRouter as useRouterNavigation } from "next/navigation";
import { usePathname } from "next/navigation";
import Spinner from "@/components/Spinner";
import { COLORS } from "@/utils/theme";

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const useAuthContext = (): AuthContext | undefined => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export const isUnRestrictedRoute = (pathName: string) => {
  return pathName === "/auth/login";
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();
  const routerNavigation = useRouterNavigation();
  const cookies = new Cookies();
  const [userData, setUserData] = useState<UserInfo>({
    id: "",
    username: "",
    userType: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAuthUser = async () => {
    try {
      const authUser = await axios.get("user/info");
      const userData: UserInfo = authUser.data.data;
      setUserData(userData);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (err) {
      axios.defaults.headers.common["Authorization"] = "";
      setUserData({
        id: "",
        username: "",
        userType: "",
        role: "",
        createdAt: "",
        updatedAt: "",
      });
      cookies.remove("accessToken");
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  const userLogin = useUserLogin({
    onMutationFailed: () => {
      message.error("Invalid email or password");
    },
    onMutationSuccess: (data: UserLoginResponse) => {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + data.data.accessToken;
      cookies.set("accessToken", data.data.accessToken, {
        path: "/",
      });
      getAuthUser();
      routerNavigation.push("/");
    },
  });

  const userSignOut = () => {
    message.success("User logout success!");
    const cookies = new Cookies();
    cookies.remove("accessToken");
    setUserData({
      id: "",
      username: "",
      userType: "",
      role: "",
      createdAt: "",
      updatedAt: "",
    });
    setIsLoggedIn(false);
    routerNavigation.push("/auth/login");
  };

  const contextValue: AuthContext = {
    userLogin,
    userData,
    setUserData,
    isAuthLoading: isLoading,
    isLoginLoading: userLogin.isPending,
    logout: userSignOut,
  };

  useEffect(() => {
    const accessTokenFromCookie = cookies.get("accessToken");
    console.log(cookies);
    if (accessTokenFromCookie) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + accessTokenFromCookie;
      getAuthUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn && !isUnRestrictedRoute(pathname)) {
      routerNavigation.push("/auth/login");
    } else if (isLoggedIn && isUnRestrictedRoute(pathname)) {
      routerNavigation.push("/");
    }
  }, [isLoggedIn, pathname]);

  return (
    <AuthContext.Provider value={contextValue}>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center align-center p-16 h-72">
          <Spinner
            text="Please wait..."
            color={COLORS["primary-blue"]}
            labelStyle={{ color: COLORS["secondary-black"] }}
          />
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};
