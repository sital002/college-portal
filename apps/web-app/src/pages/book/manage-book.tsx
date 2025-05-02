"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Edit,
} from "lucide-react";
import {
  deleteBook,
  deleteCourse,
  getAllBooks,
  getAllCourses,
  searchBookByAuthor,
  searchBookByAvaliable,
  searchBookByIsbn,
  searchBookByName,
  updateBook,
  updateCourse,
} from "@repo/api";
import { Link } from "react-router";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
  addedDate: string;
}

export default function BookViewPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBookes, setFilteredBookes] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [bookToUpdate, setBookToUpdate] = useState<Book | null>(null);
  const [updateFormData, setUpdateFormData] = useState({
    title: "",
    author: "",
    avaliable: "",
    isbn: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("access_token") as string;
        const response = await getAllBooks(token);
        const bookData = Array.isArray(response) ? response : [response];
        setBooks(bookData);
        setFilteredBookes(bookData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    // let result = books;
    // if (searchTerm) {
    //   const term = searchTerm.toLowerCase();
    //   result = result.filter(
    //     (book) =>
    //       (book.isbn?.toLowerCase() || "").includes(term) ||
    //       book.title.toLowerCase().includes(term)
    //   );
    // }
    // setFilteredBookes(result);
    // setCurrentPage(1);

    async function filterBooks() {
      const token = localStorage.getItem("access_token") as string;
      switch (filterStatus) {
        case "name":
          const booksByName = await searchBookByName(searchTerm, token);
          setFilteredBookes(booksByName);
          break;
        case "author":
          const booksByAuthor = await searchBookByAuthor(searchTerm, token);
          setFilteredBookes(booksByAuthor);
          break;
        case "avaliable":
          const booksByAvaliable = await searchBookByAvaliable(searchTerm, token);
          setFilteredBookes(booksByAvaliable);
          break;
        case "isbn":
          const booksByIsbn = await searchBookByIsbn(searchTerm, token);
          setFilteredBookes(booksByIsbn);
          break;
        default:
          setFilteredBookes(books);
          break;
      }
    }
    filterBooks();
  }, [searchTerm, books]);

  const totalPages = Math.ceil(filteredBookes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBookes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleViewCourse = (course: Book) => {
    setSelectedBook(course);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (course: Book) => {
    setBookToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateClick = (book: Book) => {
    setBookToDelete(book);
    // setUpdateFormData({
    //   title: book.title,
    //   author: course.description,
    //   courseCode: course.courseCode || "",
    // });
    setIsUpdateModalOpen(true);
  };

  const confirmDelete = async () => {
    if (bookToDelete) {
      try {
        const token = localStorage.getItem("access_token") as string;
        await deleteBook(String(bookToDelete.id), token);
        const updatedBooks = books.filter((c) => c.id !== bookToDelete.id);
        setBooks(updatedBooks);
        setBookToDelete(null);
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const handleUpdateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookToUpdate) return;

    try {
      setUpdateLoading(true);
      const token = localStorage.getItem("access_token") as string;
      const updateBookInfo = await updateBook(
        String(bookToUpdate.id),
        updateFormData.title,
        updateFormData.avaliable,
        updateFormData.author,
        updateFormData.isbn,
        token
      );

      // Update the course in the local state
      const updatedBooks = books.map((book) =>
        book.id === bookToUpdate.id ? { ...updateBookInfo } : book
      );

      setBooks(updatedBooks);
      setIsUpdateModalOpen(false);
      setBookToUpdate(null);
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Manage Book</h1>
          <p className="mt-2 opacity-90">
            View, edit, and manage book information
          </p>
        </div>

        {/* Search & Filter */}
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 text-gray-500" />
                <span>Filter</span>
              </button>
              <Link
                to={"/book/add"}
                onClick={resetFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Book
              </Link>
            </div>
          </div>
        </div>

        {isFilterOpen && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="" defaultChecked>
                    Select One
                  </option>
                  <option value="name">By Book Name</option>
                  <option value="author">By Book Author</option>
                  <option value="avaliable">By Avalibilaty</option>
                  <option value="isbn">By Isbn</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Book Table */}
        <div
          className={`overflow-x-auto ${isViewModalOpen || isUpdateModalOpen || isDeleteModalOpen ? "blur-xs" : ""}`}
        >
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredBookes.length === 0 ? (
            <div className="text-center p-12">
              <div className="text-gray-500 mb-4">No courses found</div>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ISBN
                  </th>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avaliable
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {book.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          {book.isbn ?? "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-md">
                      {book.author}
                    </td>
                    <td className="px-6 text-center py-4 text-sm text-gray-900 truncate max-w-md">
                      {book.isbn}
                    </td>
                    <td className="px-6 text-center py-4 text-sm text-gray-900 truncate max-w-md">
                      {book.available ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewCourse(book)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleUpdateClick(book)}
                          className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50"
                          title="Edit Course"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(book)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                          title="Delete Course"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && filteredBookes.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(startIndex + itemsPerPage, filteredBookes.length)}
              </span>{" "}
              of <span className="font-medium">{filteredBookes.length}</span>{" "}
              results
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-2 text-sm border rounded-l-md bg-white disabled:text-gray-300 hover:bg-gray-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm border ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-2 py-2 text-sm border rounded-r-md bg-white disabled:text-gray-300 hover:bg-gray-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedBook && (
        <div className={`fixed inset-0  flex justify-center items-center z-50`}>
          <div className="bg-white border-2 p-6 rounded-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setIsViewModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedBook.title}</h2>
            <p className="mb-2 text-sm text-gray-600">
              <strong>Isbn:</strong> {selectedBook.isbn ?? "N/A"}
            </p>
            <p className="text-gray-700">Author: {selectedBook.author}</p>
            <p className="text-gray-700">
              Avaliable: {selectedBook.available ? "Yes" : "No"}
            </p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && bookToDelete && (
        <div className="fixed inset-0  flex justify-center items-center z-50">
          <div className="bg-white border-2 p-6 rounded-lg max-w-sm w-full relative">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>{bookToDelete.title}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && bookToUpdate && (
        <div className="fixed inset-0  flex justify-center items-center z-50">
          <div className="bg-white p-6 border-2 rounded-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setIsUpdateModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Update Course</h2>

            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Book Name
                </label>
                <input
                  type="text"
                  name="title"
                  value={updateFormData.title}
                  onChange={handleUpdateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Isbn
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={updateFormData.isbn}
                  onChange={handleUpdateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avaliable
                </label>
                <input
                  type="text"
                  name="avaliable"
                  value={updateFormData.avaliable}
                  onChange={handleUpdateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={updateFormData.author}
                  onChange={handleUpdateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  {updateLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
