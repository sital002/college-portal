import { apiClient } from "../apiClient";
import { ApiResponse } from "@/types";
import { z } from "zod";

const signInResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
export const signIn = async (email: string, password: string) => {
  const response = await apiClient.post<ApiResponse>("/auth/signin", {
    email,
    password,
  });
  const result = signInResponseSchema.safeParse(response.data.data);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }

  return result.data;
};
