"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  department: string;
  description: string;
  credits: string;
  duration: string;
  startDate: string;
  endDate: string;
  maxStudents: string;
  prerequisites: string;
  instructor: string;
  schedule: string;
  location: string;
  isActive: boolean;
  enrolledStudents: number;
}

// Sample data for demonstration
const sampleCourses: Course[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    department: "Computer Science",
    description:
      "An introductory course to computer science principles and programming fundamentals.",
    credits: "3",
    duration: "16",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    maxStudents: "30",
    prerequisites: "None",
    instructor: "Dr. John Smith",
    schedule: "Mon, Wed, Fri 10:00 AM - 11:30 AM",
    location: "Room 101, Building A",
    isActive: true,
    enrolledStudents: 28,
  },
  {
    id: "2",
    courseCode: "MATH201",
    courseName: "Calculus I",
    department: "Mathematics",
    description: "Introduction to differential and integral calculus.",
    credits: "4",
    duration: "16",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    maxStudents: "35",
    prerequisites: "MATH101",
    instructor: "Dr. Emily Davis",
    schedule: "Tue, Thu 9:00 AM - 11:00 AM",
    location: "Room 205, Building B",
    isActive: true,
    enrolledStudents: 32,
  },
  {
    id: "3",
    courseCode: "ENG102",
    courseName: "English Composition",
    department: "English",
    description: "Focuses on developing writing skills and critical thinking.",
    credits: "3",
    duration: "16",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    maxStudents: "25",
    prerequisites: "ENG101",
    instructor: "Prof. Robert Johnson",
    schedule: "Mon, Wed 1:00 PM - 2:30 PM",
    location: "Room 110, Building C",
    isActive: false,
    enrolledStudents: 0,
  },
  {
    id: "4",
    courseCode: "PHYS101",
    courseName: "Physics I",
    department: "Science",
    description: "Introduction to mechanics, heat, and sound.",
    credits: "4",
    duration: "16",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    maxStudents: "30",
    prerequisites: "MATH101",
    instructor: "Dr. Michael Wilson",
    schedule: "Tue, Thu 1:00 PM - 3:00 PM",
    location: "Lab 201, Building D",
    isActive: true,
    enrolledStudents: 25,
  },
  {
    id: "5",
    courseCode: "HIST101",
    courseName: "World History",
    department: "History",
    description:
      "Survey of world history from ancient civilizations to the modern era.",
    credits: "3",
    duration: "16",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    maxStudents: "40",
    prerequisites: "None",
    instructor: "Prof. Sarah Brown",
    schedule: "Mon, Wed, Fri 2:00 PM - 3:00 PM",
    location: "Room 301, Building A",
    isActive: true,
    enrolledStudents: 38,
  },
];

export default function CourseViewPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Course | null>(null);
  const [editErrors, setEditErrors] = useState<Partial<Course>>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const itemsPerPage = 5;

  // Simulate API fetch
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCourses(sampleCourses);
      setFilteredCourses(sampleCourses);
      setIsLoading(false);
    };

    fetchCourses();
  }, []);

  // Filter courses based on search term and filters
  useEffect(() => {
    let result = courses;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (course) =>
          course.courseCode.toLowerCase().includes(term) ||
          course.courseName.toLowerCase().includes(term) ||
          course.instructor.toLowerCase().includes(term)
      );
    }

    // Apply department filter
    if (filterDepartment) {
      result = result.filter(
        (course) => course.department === filterDepartment
      );
    }

    // Apply status filter
    if (filterStatus) {
      if (filterStatus === "active") {
        result = result.filter((course) => course.isActive);
      } else if (filterStatus === "inactive") {
        result = result.filter((course) => !course.isActive);
      }
    }

    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filterDepartment, filterStatus, courses]);

  // Get unique departments for filter dropdown
  const departments = [...new Set(courses.map((course) => course.department))];

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsViewModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditFormData({ ...course });
    setIsEditModalOpen(true);
    setEditErrors({});
    setUpdateSuccess(false);
  };

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (courseToDelete) {
      // Filter out the deleted course
      const updatedCourses = courses.filter((c) => c.id !== courseToDelete.id);
      setCourses(updatedCourses);
      setIsDeleteModalOpen(false);
      setCourseToDelete(null);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterDepartment("");
    setFilterStatus("");
    setIsFilterOpen(false);
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        Active
      </span>
    ) : (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
        Inactive
      </span>
    );
  };

  const getEnrollmentStatus = (enrolled: number, max: string) => {
    const maxNum = Number.parseInt(max);
    const percentage = (enrolled / maxNum) * 100;

    if (percentage >= 90) {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          Almost Full
        </span>
      );
    } else if (percentage >= 70) {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Filling Up
        </span>
      );
    } else {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Available
        </span>
      );
    }
  };

  const handleEditFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });

      // Clear error when user types
      if (editErrors[name as keyof Course]) {
        setEditErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [name]: checked,
      });
    }
  };

  const validateEditForm = () => {
    const newErrors: Partial<Course> = {};

    if (!editFormData) return false;

    if (!editFormData.courseCode.trim())
      newErrors.courseCode = "Course code is required";
    if (!editFormData.courseName.trim())
      newErrors.courseName = "Course name is required";
    if (!editFormData.department)
      newErrors.department = "Department is required";
    if (!editFormData.credits.trim())
      newErrors.credits = "Credits are required";
    if (!editFormData.startDate) newErrors.startDate = "Start date is required";
    if (!editFormData.endDate) newErrors.endDate = "End date is required";

    if (editFormData.startDate && editFormData.endDate) {
      const start = new Date(editFormData.startDate);
      const end = new Date(editFormData.endDate);
      if (end < start) {
        newErrors.endDate = "End date cannot be before start date";
      }
    }

    if (editFormData.maxStudents && isNaN(Number(editFormData.maxStudents))) {
      newErrors.maxStudents = "Max students must be a number";
    }

    if (editFormData.credits && isNaN(Number(editFormData.credits))) {
      newErrors.credits = "Credits must be a number";
    }

    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateCourse = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateEditForm() && editFormData) {
      setIsUpdating(true);

      // Simulate API call
      setTimeout(() => {
        // Update the course in the list
        const updatedCourses = courses.map((course) =>
          course.id === editFormData.id ? editFormData : course
        );

        setCourses(updatedCourses);
        setIsUpdating(false);
        setUpdateSuccess(true);

        // Close modal after showing success message
        setTimeout(() => {
          setIsEditModalOpen(false);
          setUpdateSuccess(false);
        }, 1500);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Manage Courses</h1>
          <p className="mt-2 opacity-90">
            View, edit, and manage course information
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search courses..."
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

              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Course
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
        </div>

        {/* Courses Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredCourses.length === 0 ? (
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
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Course
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Instructor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Schedule
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">
                          {course.courseName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {course.courseCode}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {course.department}
                      </div>
                      <div className="text-sm text-gray-500">
                        {course.credits} Credits
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {course.instructor}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {course.schedule}
                      </div>
                      <div className="text-sm text-gray-500">
                        {course.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(course.isActive)}
                        {course.isActive &&
                          getEnrollmentStatus(
                            course.enrolledStudents,
                            course.maxStudents
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewCourse(course)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="text-amber-600 hover:text-amber-900 p-1 rounded-full hover:bg-amber-50"
                          title="Edit Course"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course)}
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
        {!isLoading && filteredCourses.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredCourses.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredCourses.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
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
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Course Modal */}
      {isViewModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Course Details</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {selectedCourse.courseName}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {selectedCourse.courseCode}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(selectedCourse.isActive)}
                    {selectedCourse.isActive &&
                      getEnrollmentStatus(
                        selectedCourse.enrolledStudents,
                        selectedCourse.maxStudents
                      )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                      Course Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Department
                        </h4>
                        <p className="mt-1">{selectedCourse.department}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Credits
                        </h4>
                        <p className="mt-1">{selectedCourse.credits}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Description
                        </h4>
                        <p className="mt-1">{selectedCourse.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Prerequisites
                        </h4>
                        <p className="mt-1">
                          {selectedCourse.prerequisites || "None"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                      Schedule Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Instructor
                        </h4>
                        <p className="mt-1">{selectedCourse.instructor}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Schedule
                        </h4>
                        <p className="mt-1">{selectedCourse.schedule}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Location
                        </h4>
                        <p className="mt-1">{selectedCourse.location}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Duration
                        </h4>
                        <p className="mt-1">{selectedCourse.duration} weeks</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Dates
                        </h4>
                        <p className="mt-1">
                          {new Date(
                            selectedCourse.startDate
                          ).toLocaleDateString()}{" "}
                          to{" "}
                          {new Date(
                            selectedCourse.endDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                      Enrollment Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Maximum Students
                        </h4>
                        <p className="mt-1">{selectedCourse.maxStudents}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Enrolled Students
                        </h4>
                        <p className="mt-1">
                          {selectedCourse.enrolledStudents}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Available Seats
                        </h4>
                        <p className="mt-1">
                          {Number.parseInt(selectedCourse.maxStudents) -
                            selectedCourse.enrolledStudents}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Enrollment Status
                        </h4>
                        <p className="mt-1">
                          {selectedCourse.isActive
                            ? "Open for Enrollment"
                            : "Closed for Enrollment"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditCourse(selectedCourse);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && courseToDelete && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-center">Delete Course</h3>
              <p className="mt-2 text-center text-gray-500">
                Are you sure you want to delete {courseToDelete.courseName} (
                {courseToDelete.courseCode})? This action cannot be undone.
              </p>
            </div>
            <div className="flex border-t">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-bl-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-br-xl border-l"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {isEditModalOpen && editFormData && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Edit Course</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {updateSuccess && (
              <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
                <Check className="h-5 w-5 mr-2" />
                Course updated successfully!
              </div>
            )}

            <form onSubmit={handleUpdateCourse} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <h3 className="text-lg font-semibold text-gray-800 md:col-span-2 border-b pb-2">
                  Course Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Code*
                  </label>
                  <input
                    type="text"
                    name="courseCode"
                    value={editFormData.courseCode}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.courseCode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="e.g. CS101"
                  />
                  {editErrors.courseCode && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.courseCode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name*
                  </label>
                  <input
                    type="text"
                    name="courseName"
                    value={editFormData.courseName}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.courseName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="e.g. Introduction to Computer Science"
                  />
                  {editErrors.courseName && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.courseName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department*
                  </label>
                  <select
                    name="department"
                    value={editFormData.department}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.department
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {editErrors.department && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.department}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credits*
                  </label>
                  <input
                    type="text"
                    name="credits"
                    value={editFormData.credits}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.credits ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g. 3"
                  />
                  {editErrors.credits && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.credits}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Description
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter course description"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 md:col-span-2 border-b pb-2 mt-4">
                  Schedule Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date*
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={editFormData.startDate}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.startDate
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {editErrors.startDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.startDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date*
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={editFormData.endDate}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.endDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {editErrors.endDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.endDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (weeks)
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={editFormData.duration}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="e.g. 16"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Schedule
                  </label>
                  <input
                    type="text"
                    name="schedule"
                    value={editFormData.schedule}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="e.g. Mon, Wed, Fri 10:00 AM - 11:30 AM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editFormData.location}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="e.g. Room 101, Building A"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Students
                  </label>
                  <input
                    type="text"
                    name="maxStudents"
                    value={editFormData.maxStudents}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.maxStudents
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="e.g. 30"
                  />
                  {editErrors.maxStudents && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.maxStudents}
                    </p>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 md:col-span-2 border-b pb-2 mt-4">
                  Additional Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructor
                  </label>
                  <input
                    type="text"
                    name="instructor"
                    value={editFormData.instructor}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="e.g. Dr. John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prerequisites
                  </label>
                  <input
                    type="text"
                    name="prerequisites"
                    value={editFormData.prerequisites}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="e.g. CS100, MATH101"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={editFormData.isActive}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="isActive"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Course is active and available for enrollment
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`px-6 py-2.5 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center ${
                    isUpdating ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isUpdating ? (
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
                      Updating...
                    </>
                  ) : (
                    "Update Course"
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
