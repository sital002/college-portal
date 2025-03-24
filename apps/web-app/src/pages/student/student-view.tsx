import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  Check,
} from "lucide-react";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  grade: string;
  section: string;
  rollNumber: string;
  admissionDate: string;
  bloodGroup: string;
  profileImage: string | null;
  status: "active" | "inactive" | "suspended";
}

// Sample data for demonstration
const sampleStudents: Student[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "(123) 456-7890",
    dateOfBirth: "2010-05-15",
    gender: "male",
    address: "123 School Ave, Academic City, AC 12345",
    guardianName: "Mary Smith",
    guardianPhone: "(123) 456-7899",
    guardianEmail: "mary.smith@example.com",
    grade: "9",
    section: "A",
    rollNumber: "2023001",
    admissionDate: "2023-06-15",
    bloodGroup: "O+",
    profileImage: "/placeholder.svg?height=200&width=200",
    status: "active",
  },
  {
    id: "2",
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@example.com",
    phone: "(234) 567-8901",
    dateOfBirth: "2011-08-22",
    gender: "female",
    address: "456 Education Blvd, Academic City, AC 12345",
    guardianName: "Robert Johnson",
    guardianPhone: "(234) 567-8999",
    guardianEmail: "robert.johnson@example.com",
    grade: "8",
    section: "B",
    rollNumber: "2023002",
    admissionDate: "2023-06-16",
    bloodGroup: "A+",
    profileImage: "/placeholder.svg?height=200&width=200",
    status: "active",
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    phone: "(345) 678-9012",
    dateOfBirth: "2009-03-10",
    gender: "male",
    address: "789 Learning St, Academic City, AC 12345",
    guardianName: "Jennifer Brown",
    guardianPhone: "(345) 678-9099",
    guardianEmail: "jennifer.brown@example.com",
    grade: "10",
    section: "A",
    rollNumber: "2023003",
    admissionDate: "2023-06-17",
    bloodGroup: "B-",
    profileImage: "/placeholder.svg?height=200&width=200",
    status: "suspended",
  },
  {
    id: "4",
    firstName: "Sophia",
    lastName: "Davis",
    email: "sophia.davis@example.com",
    phone: "(456) 789-0123",
    dateOfBirth: "2012-11-05",
    gender: "female",
    address: "101 Knowledge Dr, Academic City, AC 12345",
    guardianName: "William Davis",
    guardianPhone: "(456) 789-0199",
    guardianEmail: "william.davis@example.com",
    grade: "7",
    section: "C",
    rollNumber: "2023004",
    admissionDate: "2023-06-18",
    bloodGroup: "AB+",
    profileImage: "/placeholder.svg?height=200&width=200",
    status: "active",
  },
  {
    id: "5",
    firstName: "Daniel",
    lastName: "Wilson",
    email: "daniel.wilson@example.com",
    phone: "(567) 890-1234",
    dateOfBirth: "2008-07-30",
    gender: "male",
    address: "202 Scholar Lane, Academic City, AC 12345",
    guardianName: "Patricia Wilson",
    guardianPhone: "(567) 890-1299",
    guardianEmail: "patricia.wilson@example.com",
    grade: "11",
    section: "B",
    rollNumber: "2023005",
    admissionDate: "2023-06-19",
    bloodGroup: "O-",
    profileImage: "/placeholder.svg?height=200&width=200",
    status: "inactive",
  },
];

export default function StudentViewPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterGrade, setFilterGrade] = useState("");
  const [filterSection, setFilterSection] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Student | null>(null);
  const [editErrors, setEditErrors] = useState<Partial<Student>>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const itemsPerPage = 5;

  // Simulate API fetch
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStudents(sampleStudents);
      setFilteredStudents(sampleStudents);
      setIsLoading(false);
    };

    fetchStudents();
  }, []);

  // Filter students based on search term and filters
  useEffect(() => {
    let result = students;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (student) =>
          student.firstName.toLowerCase().includes(term) ||
          student.lastName.toLowerCase().includes(term) ||
          student.email.toLowerCase().includes(term) ||
          student.rollNumber.toLowerCase().includes(term)
      );
    }

    // Apply grade filter
    if (filterGrade) {
      result = result.filter((student) => student.grade === filterGrade);
    }

    // Apply section filter
    if (filterSection) {
      result = result.filter((student) => student.section === filterSection);
    }

    // Apply status filter
    if (filterStatus) {
      result = result.filter((student) => student.status === filterStatus);
    }

    setFilteredStudents(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filterGrade, filterSection, filterStatus, students]);

  // Get unique grades and sections for filter dropdowns
  const grades = [...new Set(students.map((student) => student.grade))];
  const sections = [...new Set(students.map((student) => student.section))];

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditFormData({ ...student });
    setIsEditModalOpen(true);
    setEditErrors({});
    setUpdateSuccess(false);
  };

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      // Filter out the deleted student
      const updatedStudents = students.filter(
        (s) => s.id !== studentToDelete.id
      );
      setStudents(updatedStudents);
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterGrade("");
    setFilterSection("");
    setFilterStatus("");
    setIsFilterOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      if (editErrors[name as keyof Student]) {
        setEditErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const validateEditForm = () => {
    const newErrors: Partial<Student> = {};

    if (!editFormData) return false;

    if (!editFormData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!editFormData.lastName.trim())
      newErrors.lastName = "Last name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (editFormData.email.trim() && !emailRegex.test(editFormData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!editFormData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!editFormData.gender) newErrors.gender = "Gender is required";
    if (!editFormData.guardianName.trim())
      newErrors.guardianName = "Guardian name is required";
    if (!editFormData.guardianPhone.trim())
      newErrors.guardianPhone = "Guardian phone is required";

    if (
      editFormData.guardianEmail.trim() &&
      !emailRegex.test(editFormData.guardianEmail)
    ) {
      newErrors.guardianEmail = "Please enter a valid guardian email";
    }

    if (!editFormData.grade) newErrors.grade = "Grade is required";
    if (!editFormData.section) newErrors.section = "Section is required";
    if (!editFormData.rollNumber.trim())
      newErrors.rollNumber = "Roll number is required";

    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateStudent = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateEditForm() && editFormData) {
      setIsUpdating(true);

      // Simulate API call
      setTimeout(() => {
        // Update the student in the list
        const updatedStudents = students.map((student) =>
          student.id === editFormData.id ? editFormData : student
        );

        setStudents(updatedStudents);
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

  // Handle profile image upload in edit form
  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editFormData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData({
          ...editFormData,
          profileImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove profile image in edit form
  const removeEditImage = () => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        profileImage: null,
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Manage Students</h1>
          <p className="mt-2 opacity-90">
            View, edit, and manage student information
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search students..."
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
                Add Student
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <select
                    value={filterGrade}
                    onChange={(e) => setFilterGrade(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">All Grades</option>
                    {grades.map((grade) => (
                      <option key={grade} value={grade}>
                        Grade {grade}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section
                  </label>
                  <select
                    value={filterSection}
                    onChange={(e) => setFilterSection(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">All Sections</option>
                    {sections.map((section) => (
                      <option key={section} value={section}>
                        Section {section}
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
                    <option value="suspended">Suspended</option>
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

        {/* Students Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center p-12">
              <div className="text-gray-500 mb-4">No students found</div>
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
                    Student
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Roll Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Guardian
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
                {paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              student.profileImage ||
                              "/placeholder.svg?height=40&width=40"
                            }
                            alt={`${student.firstName} ${student.lastName}`}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Grade {student.grade}
                      </div>
                      <div className="text-sm text-gray-500">
                        Section {student.section}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.rollNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {student.guardianName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.guardianPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(student.status)}`}
                      >
                        {student.status.charAt(0).toUpperCase() +
                          student.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="text-amber-600 hover:text-amber-900 p-1 rounded-full hover:bg-amber-50"
                          title="Edit Student"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(student)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                          title="Delete Student"
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
        {!isLoading && filteredStudents.length > 0 && (
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
                      filteredStudents.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredStudents.length}</span>{" "}
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

      {/* View Student Modal */}
      {isViewModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Student Details</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <img
                    src={
                      selectedStudent.profileImage ||
                      "/placeholder.svg?height=150&width=150"
                    }
                    alt={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  />
                  <div className="mt-4 text-center">
                    <span
                      className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(selectedStudent.status)}`}
                    >
                      {selectedStudent.status.charAt(0).toUpperCase() +
                        selectedStudent.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Full Name
                      </h4>
                      <p className="mt-1 text-base">
                        {selectedStudent.firstName} {selectedStudent.lastName}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Date of Birth
                      </h4>
                      <p className="mt-1 text-base">
                        {new Date(
                          selectedStudent.dateOfBirth
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Gender
                      </h4>
                      <p className="mt-1 text-base">
                        {selectedStudent.gender.charAt(0).toUpperCase() +
                          selectedStudent.gender.slice(1)}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Blood Group
                      </h4>
                      <p className="mt-1 text-base">
                        {selectedStudent.bloodGroup || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Email
                      </h4>
                      <p className="mt-1 text-base">
                        {selectedStudent.email || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Phone
                      </h4>
                      <p className="mt-1 text-base">
                        {selectedStudent.phone || "Not specified"}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="text-sm font-medium text-gray-500">
                        Address
                      </h4>
                      <p className="mt-1 text-base">
                        {selectedStudent.address || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 mt-6">
                    Guardian Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Guardian Name
                      </h4>
                      <p className="mt-1 text-base">
                        {selectedStudent.guardianName}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Guardian Phone
                      </h4>
                      <p className="mt-1 text-base">
                        {selectedStudent.guardianPhone}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="text-sm font-medium text-gray-500">
                        Guardian Email
                      </h4>
                      <p className="mt-1 text-base">
                        {selectedStudent.guardianEmail || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 mt-6">
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Grade/Class
                      </h4>
                      <p className="mt-1 text-base">
                        Grade {selectedStudent.grade}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Section
                      </h4>
                      <p className="mt-1 text-base">
                        Section {selectedStudent.section}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Roll Number
                      </h4>
                      <p className="mt-1 text-base">
                        {selectedStudent.rollNumber}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Admission Date
                      </h4>
                      <p className="mt-1 text-base">
                        {new Date(
                          selectedStudent.admissionDate
                        ).toLocaleDateString()}
                      </p>
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
                  handleEditStudent(selectedStudent);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && studentToDelete && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-center">
                Delete Student
              </h3>
              <p className="mt-2 text-center text-gray-500">
                Are you sure you want to delete {studentToDelete.firstName}{" "}
                {studentToDelete.lastName}? This action cannot be undone.
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

      {/* Edit Student Modal */}
      {isEditModalOpen && editFormData && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Edit Student</h2>
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
                Student updated successfully!
              </div>
            )}

            <form onSubmit={handleUpdateStudent} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative">
                      {editFormData.profileImage ? (
                        <div className="relative">
                          <img
                            src={
                              editFormData.profileImage || "/placeholder.svg"
                            }
                            alt="Profile Preview"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={removeEditImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
                          <label className="cursor-pointer flex flex-col items-center justify-center">
                            <Upload className="h-8 w-8 text-gray-400" />
                            <span className="text-xs text-gray-500 mt-1">
                              Upload Photo
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleEditImageUpload}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Upload student profile picture
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 md:col-span-2 border-b pb-2">
                  Personal Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.firstName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter first name"
                  />
                  {editErrors.firstName && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter last name"
                  />
                  {editErrors.lastName && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth*
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={editFormData.dateOfBirth}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.dateOfBirth
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {editErrors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender*
                  </label>
                  <select
                    name="gender"
                    value={editFormData.gender}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.gender ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {editErrors.gender && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.gender}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="student@example.com"
                  />
                  {editErrors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="(123) 456-7890"
                  />
                  {editErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditFormChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter full address"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 md:col-span-2 border-b pb-2 mt-4">
                  Guardian Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guardian Name*
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    value={editFormData.guardianName}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.guardianName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter guardian name"
                  />
                  {editErrors.guardianName && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.guardianName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guardian Phone*
                  </label>
                  <input
                    type="tel"
                    name="guardianPhone"
                    value={editFormData.guardianPhone}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.guardianPhone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="(123) 456-7890"
                  />
                  {editErrors.guardianPhone && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.guardianPhone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guardian Email
                  </label>
                  <input
                    type="email"
                    name="guardianEmail"
                    value={editFormData.guardianEmail}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.guardianEmail
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="guardian@example.com"
                  />
                  {editErrors.guardianEmail && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.guardianEmail}
                    </p>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 md:col-span-2 border-b pb-2 mt-4">
                  Academic Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade/Class*
                  </label>
                  <select
                    name="grade"
                    value={editFormData.grade}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.grade ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Grade</option>
                    {grades.map((grade) => (
                      <option key={grade} value={grade}>
                        Grade {grade}
                      </option>
                    ))}
                  </select>
                  {editErrors.grade && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.grade}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section*
                  </label>
                  <select
                    name="section"
                    value={editFormData.section}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.section ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Section</option>
                    {sections.map((section) => (
                      <option key={section} value={section}>
                        Section {section}
                      </option>
                    ))}
                  </select>
                  {editErrors.section && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.section}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roll Number*
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={editFormData.rollNumber}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      editErrors.rollNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter roll number"
                  />
                  {editErrors.rollNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {editErrors.rollNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admission Date
                  </label>
                  <input
                    type="date"
                    name="admissionDate"
                    value={editFormData.admissionDate}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
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
                    "Update Student"
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
