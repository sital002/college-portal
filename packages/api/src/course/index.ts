import { apiClient } from "../apiClient";
import { ApiResponse } from "../types";
import { CourseSchema } from "../types/course";

export const addCourse = async ({
  name,
  description,
  courseCode,
  token,
}: {
  name: string;
  description: string;
  courseCode: string;
  token: string;
}) => {
  const response = await apiClient.post<ApiResponse>(
    "/course/new",
    { name, description, courseCode },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = CourseSchema.safeParse(response.data.data);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const getAllCourses = async (token: string) => {
  const response = await apiClient.get<ApiResponse>("/course/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = CourseSchema.array().safeParse(response.data.data);
  console.log("result", result);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const getSingleCourse = async (
  courseId: string | number,
  token: string
) => {
  const response = await apiClient.get<ApiResponse>(
    `/course/single/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = CourseSchema.safeParse(response.data.data);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const deleteCourse = async (courseId: string, token: string) => {
  const response = await apiClient.delete<ApiResponse>(`/course/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCourse = async (
  courseId: string,
  name: string,
  description: string,
  courseCode: string,
  token: string
) => {
  const response = await apiClient.put<ApiResponse>(
    `/course/${courseId}`,
    { name, description, code: courseCode },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = CourseSchema.safeParse(response.data.data);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};
