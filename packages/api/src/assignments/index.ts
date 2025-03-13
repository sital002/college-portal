import { apiClient } from "../apiClient";
import { ApiResponse, Assignment, assignmentSchema } from "../types";

export const updateAssignment = async (
  assignmentId: String,
  assignment: Assignment,
  token?: string
) => {
  const response = await apiClient.put<ApiResponse>(
    `/assignments/${assignmentId}`,
    assignment,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result = assignmentSchema.safeParse(response.data.data);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const viewAllAssignments = async (token?: string) => {
  const response = await apiClient.get<ApiResponse>(`/assignments/view`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = assignmentSchema.array().safeParse(response.data.data);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};
