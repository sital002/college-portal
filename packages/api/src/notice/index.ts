import { NoticeSchema } from "../types/notice";
import { apiClient } from "../apiClient";
import { ApiResponse } from "../types";

export const addNotice = async ({
  noticeTitle,
  noticeContent,
  token,
}: {
  noticeTitle: string;
  noticeContent: string;
  token: string;
}) => {
  const response = await apiClient.post<ApiResponse>(
    "/notice/new",
    { title: noticeTitle, content: noticeContent },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = NoticeSchema.safeParse(response.data.data);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const getAllNotice = async (token: string) => {
  const response = await apiClient.get<ApiResponse>("/notice/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = NoticeSchema.array().safeParse(response.data.data);
  console.log("result", result);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const getSingleNotice = async (
  noticeId: string | number,
  token: string
) => {
  const response = await apiClient.get<ApiResponse>(
    `/course/single/${noticeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = NoticeSchema.safeParse(response.data.data);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const deleteNotice = async (noticeId: string, token: string) => {
  const response = await apiClient.delete<ApiResponse>(`/course/${noticeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateNotice = async (
  noticeId: string,
  noticeTitle: string,
  noticeContent: string,
  token: string
) => {
  const response = await apiClient.put<ApiResponse>(
    `/course/${noticeId}`,
    { title: noticeTitle, content: noticeContent },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = NoticeSchema.safeParse(response.data.data);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};
