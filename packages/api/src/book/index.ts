import { BookSchema } from "../types/book";
import { apiClient } from "../apiClient";
import { ApiResponse } from "../types";

export const addBook = async ({
  title,
  author,
  isbn,
  avaliable,
  token,
}: {
  title: string;
  author: string;
  isbn: string;
  avaliable: string;
  token: string;
}) => {
  const response = await apiClient.post<ApiResponse>(
    "/book/new",
    { title, author, isbn, avaliable },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("result", response.data.data);
  const result = BookSchema.safeParse(response.data.data);

  console.log("result", result);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const getAllBooks = async (token: string) => {
  const response = await apiClient.get<ApiResponse>("/book/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = BookSchema.array().safeParse(response.data.data);
  console.log("result", result);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const getAvaliableBooks = async (token: string) => {
  const response = await apiClient.get<ApiResponse>("/available", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = BookSchema.array().safeParse(response.data.data);
  console.log("result", result);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const getUnavaliableBooks = async (token: string) => {
  const response = await apiClient.get<ApiResponse>("/unavailable", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = BookSchema.array().safeParse(response.data.data);
  console.log("result", result);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

// export const getSingleCourse = async (
//   courseId: string | number,
//   token: string
// ) => {
//   const response = await apiClient.get<ApiResponse>(
//     `/course/single/${courseId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   const result = CourseSchema.safeParse(response.data.data);

//   if (!result.success) {
//     throw new Error(result.error.errors[0].message);
//   }
//   return result.data;
// };

export const deleteBook = async (courseId: string, token: string) => {
  const response = await apiClient.delete<ApiResponse>(
    `/book/delete/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateBook = async (
  bookId: string,
  title: string,
  author: string,
  isbn: string,
  avaliable: string,
  token: string
) => {
  const response = await apiClient.put<ApiResponse>(
    `/book/${bookId}`,
    { author, title, isbn, avaliable },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = BookSchema.safeParse(response.data.data);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const searchBookByName = async (name: string, token: string) => {
  const response = await apiClient.get<ApiResponse>(
    `/book/search?query=${name}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = BookSchema.array().safeParse(response.data.data);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const searchBookByAuthor = async (name: string, token: string) => {
  const response = await apiClient.get<ApiResponse>(
    `/book/search?author=${name}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = BookSchema.array().safeParse(response.data.data);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const searchBookByIsbn = async (name: string, token: string) => {
  const response = await apiClient.get<ApiResponse>(
    `/book/search?isbn=${name}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = BookSchema.array().safeParse(response.data.data);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};

export const searchBookByAvaliable = async (name: string, token: string) => {
  const response = await apiClient.get<ApiResponse>(
    `/book/search?available=${name == "yes" ? true : false}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = BookSchema.array().safeParse(response.data.data);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};
