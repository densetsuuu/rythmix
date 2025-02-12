"use client";

import { tuyau } from "@/lib/constants";
import { getUser } from "@/lib/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "@tuyau/client";
import { createContext, useContext } from "react";
import { navigate } from "@/app/actions";

type MeResponse = InferResponseType<typeof tuyau.auth.me.$get>;

type IAuthContext = {
  isAuthenticated: boolean;
  user: MeResponse | undefined;
  logout: () => any;
};

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  user: undefined,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery<MeResponse | undefined>({
    queryKey: ["currentUser"],
    queryFn: getUser,
  });

  const isAuthenticated: boolean = !!user;

  const login = () => {
    navigate(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/redirect`);
  };

  const logout = async () => {
    const response = await tuyau.auth.logout.$post();
    await queryClient.resetQueries({ queryKey: ["currentUser"], exact: true });
    return response;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
