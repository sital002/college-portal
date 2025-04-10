import { unknown } from "zod";
import { apiClient } from "../apiClient";
import { ApiResponse, Assignment, assignmentSchema } from "../types";
import { isAxiosError } from "axios";

export const updateAssignment = async (
  assignmentId: string | number,
  assignment: Omit<Assignment, "id">,
  token?: string
) => {
  const formData = new FormData();
  formData.append("title", assignment.title);
  formData.append("description", assignment.description);
  formData.append("deadLine", assignment.deadLine);
  formData.append("room", assignment.room);
  if (assignment.attachments) {
    formData.append("file", assignment.attachments);
  }

  const response = await apiClient.put<ApiResponse>(
    `/assignments/update/${assignmentId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log("response", response);
  const result = assignmentSchema.safeParse(response.data.data);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const viewAllAssignments = async ({ token }: { token: string }) => {
  try {
    const response = await apiClient.get<ApiResponse>(`/assignments/view`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);
    const result = assignmentSchema.array().safeParse(response.data.data);
    if (!result.success) {
      throw new Error(result.error.errors[0].message);
    }
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("The error is", error.response?.data);
      throw error;
    }
  }
};

export const deleteAssignment = async (
  assignmentId: string,
  token?: string
) => {
  const response = await apiClient.delete<ApiResponse>(
    `/assignments/single/${assignmentId}`,
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

export const viewSingleAssignment = async (
  assignmentId: string | number,
  token?: string
) => {
  const response = await apiClient.get<ApiResponse>(
    `/assignments/single/${assignmentId}`,
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

export const submitAssignment = async (
  assignmentId: string | number,
  assignment: any,
  room: string,
  token?: string
) => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: assignment.uri,
      name: assignment.name,
      type: assignment.mimeType,
    } as unknown as Blob);
    formData.append("room", room);
    const response = await apiClient.post<ApiResponse>(
      `/assignments/submit/${assignmentId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response", response);
    const result = assignmentSchema.safeParse(response.data.data);
    if (!result.success) {
      throw new Error(result.error.errors[0].message);
    }
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("The error is", error.response?.data);
      throw error;
    }
  }
};
