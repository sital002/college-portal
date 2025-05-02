import React, { useState } from "react";
import { Check } from "lucide-react";
import { addBook } from "@repo/api";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router";

interface CourseFormData {
  title: string;
  author: string;
  isbn: string;
  avaliable: string;
}

export default function BookAddPage() {
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    author: "",
    isbn: "",
    avaliable: "",
  });
const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CourseFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        console.log("response", "dam");
      // setIsSubmitting(true);
      const token = (localStorage.getItem("access_token") as string) || "";
      const response = await addBook({ ...formData, token });
      console.log(response);
      if (response) {
        navigate("/book/manage");
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        console.log("The error is", error);
        throw error;
      }
    }
  };

  return (
    <div className="min-h-screen w-full overflow-y-scroll bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Add New Book</h1>
          <p className="mt-2 opacity-90">
            Enter the details to add a new book to the system
          </p>
        </div>

        {successMessage && (
          <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
            <Check className="h-5 w-5 mr-2" />
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <h3 className="text-lg font-semibold text-gray-800 md:col-span-2 border-b pb-2">
              Book Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Book Name*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. Muna Madan"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Isbn*
              </label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.isbn ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g.1232"
              />
              {errors.isbn && (
                <p className="mt-1 text-sm text-red-500">{errors.isbn}</p>
              )}
            </div>

            <div className=" w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avaliable*
              </label>
              <select onChange={handleChange} name="avaliable" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors">
                <option defaultChecked value="">
                  Select Avaliable
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.isbn && (
                <p className="mt-1 text-sm text-red-500">{errors.avaliable}</p>
              )}
            </div>

            <div >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.avaliable ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. Laxmi Prasad Devkota"
              />
              {errors.isbn && (
                <p className="mt-1 text-sm text-red-500">{errors.author}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Add Course"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
