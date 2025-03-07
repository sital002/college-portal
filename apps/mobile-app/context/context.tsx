import { apiClient } from "@/config/api";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type ContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export type User = {
  firstName: string;
  email: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  profilePicture: string;
  id: string;
};

type ApiResponse = {
  data: User;
  success: boolean;
};
const ContextProvider = createContext<ContextType | null>(null);

const Context = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useLayoutEffect(() => {
    async function getUser() {
      try {
        const response = (await apiClient.get)<ApiResponse>("/auth/me");
        if ((await response).data.success) {
          console.log((await response).data.data);
          setUser((await response).data.data);
          router.replace("/home");
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response?.data);
          return;
        }
        console.log("error", error);
      }
    }

    getUser();
  }, []);

  return (
    <ContextProvider.Provider value={{ user, setUser }}>
      {children}
    </ContextProvider.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(ContextProvider);
  if (!context) {
    throw new Error("useUser must be used within a ContextProvider");
  }
  return context;
};

export default Context;
