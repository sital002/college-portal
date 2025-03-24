"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  Users,
  Bell,
  FileText,
  Clock,
} from "lucide-react";

interface Notice {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAudience: string[];
  publishDate: string;
  expiryDate: string | null;
  isImportant: boolean;
  attachments: FileAttachment[];
  publishedBy: string;
  publishedAt: string;
}

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

// Sample data for demonstration
const sampleNotices: Notice[] = [
  {
    id: "1",
    title: "End of Term Examination Schedule",
    description:
      "The end of term examinations will commence on 15th December 2023. All students are required to check the detailed schedule attached to this notice. Please ensure you arrive at least 15 minutes before the examination starts.",
    category: "Examination",
    targetAudience: ["students", "teachers", "parents"],
    publishDate: "2023-11-30",
    expiryDate: "2023-12-20",
    isImportant: true,
    attachments: [
      {
        id: "file-1",
        name: "Exam_Schedule_Dec2023.pdf",
        size: 1024 * 1024 * 2.5, // 2.5 MB
        type: "application/pdf",
        url: "#",
      },
    ],
    publishedBy: "Dr. John Smith",
    publishedAt: "2023-11-30T09:30:00",
  },
  {
    id: "2",
    title: "Annual Sports Day Announcement",
    description:
      "We are pleased to announce that the Annual Sports Day will be held on 10th January 2024. All students are encouraged to participate in various sports activities. Parents are cordially invited to attend and support their children.",
    category: "Sports",
    targetAudience: ["students", "teachers", "parents", "staff"],
    publishDate: "2023-12-01",
    expiryDate: "2024-01-10",
    isImportant: false,
    attachments: [
      {
        id: "file-2",
        name: "Sports_Day_Schedule.docx",
        size: 1024 * 512, // 512 KB
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        url: "#",
      },
      {
        id: "file-3",
        name: "Registration_Form.pdf",
        size: 1024 * 256, // 256 KB
        type: "application/pdf",
        url: "#",
      },
    ],
    publishedBy: "Prof. Sarah Johnson",
    publishedAt: "2023-12-01T14:15:00",
  },
  {
    id: "3",
    title: "Holiday Notice: Winter Break",
    description:
      "This is to inform all students, parents, and staff that the school will remain closed for Winter Break from 22nd December 2023 to 5th January 2024. Classes will resume on 6th January 2024. Wishing everyone a happy holiday season!",
    category: "Holiday",
    targetAudience: ["students", "teachers", "parents", "staff"],
    publishDate: "2023-12-05",
    expiryDate: "2024-01-06",
    isImportant: true,
    attachments: [],
    publishedBy: "Principal Robert Wilson",
    publishedAt: "2023-12-05T10:00:00",
  },
  {
    id: "4",
    title: "Parent-Teacher Meeting",
    description:
      "A Parent-Teacher Meeting is scheduled for 18th December 2023. Parents are requested to meet with respective class teachers to discuss their child's academic progress. Time slots have been allocated as per the attached schedule.",
    category: "Academic",
    targetAudience: ["teachers", "parents"],
    publishDate: "2023-12-08",
    expiryDate: "2023-12-18",
    isImportant: false,
    attachments: [
      {
        id: "file-4",
        name: "PTM_Schedule.xlsx",
        size: 1024 * 384, // 384 KB
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        url: "#",
      },
    ],
    publishedBy: "Dr. Emily Davis",
    publishedAt: "2023-12-08T11:45:00",
  },
  {
    id: "5",
    title: "New Admission Process for Academic Year 2024-25",
    description:
      "Applications for admission to the academic year 2024-25 are now open. Interested candidates can apply online through our website or visit the admission office during working hours. Please refer to the attached brochure for detailed information.",
    category: "Admission",
    targetAudience: ["staff"],
    publishDate: "2023-12-10",
    expiryDate: null,
    isImportant: true,
    attachments: [
      {
        id: "file-5",
        name: "Admission_Brochure_2024.pdf",
        size: 1024 * 1024 * 5, // 5 MB
        type: "application/pdf",
        url: "#",
      },
      {
        id: "file-6",
        name: "Fee_Structure.pdf",
        size: 1024 * 768, // 768 KB
        type: "application/pdf",
        url: "#",
      },
    ],
    publishedBy: "Admission Committee",
    publishedAt: "2023-12-10T09:00:00",
  },
];

export default function NoticeViewPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<Notice | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAudience, setFilterAudience] = useState("");
  const [filterImportant, setFilterImportant] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 5;

  // Simulate API fetch
  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNotices(sampleNotices);
      setFilteredNotices(sampleNotices);
      setIsLoading(false);
    };

    fetchNotices();
  }, []);

  // Filter notices based on search term and filters
  useEffect(() => {
    let result = notices;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (notice) =>
          notice.title.toLowerCase().includes(term) ||
          notice.description.toLowerCase().includes(term) ||
          notice.category.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (filterCategory) {
      result = result.filter((notice) => notice.category === filterCategory);
    }

    // Apply audience filter
    if (filterAudience) {
      result = result.filter((notice) =>
        notice.targetAudience.includes(filterAudience)
      );
    }

    // Apply important filter
    if (filterImportant) {
      if (filterImportant === "important") {
        result = result.filter((notice) => notice.isImportant);
      } else if (filterImportant === "regular") {
        result = result.filter((notice) => !notice.isImportant);
      }
    }

    // Sort by importance and then by publish date (newest first)
    result = [...result].sort((a, b) => {
      if (a.isImportant !== b.isImportant) {
        return a.isImportant ? -1 : 1;
      }
      return (
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
    });

    setFilteredNotices(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filterCategory, filterAudience, filterImportant, notices]);

  // Get unique categories for filter dropdown
  const categories = [...new Set(notices.map((notice) => notice.category))];

  // Pagination logic
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotices = filteredNotices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleViewNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (notice: Notice) => {
    setNoticeToDelete(notice);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (noticeToDelete) {
      // Filter out the deleted notice
      const updatedNotices = notices.filter((n) => n.id !== noticeToDelete.id);
      setNotices(updatedNotices);
      setIsDeleteModalOpen(false);
      setNoticeToDelete(null);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterAudience("");
    setFilterImportant("");
    setIsFilterOpen(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return "📷";
    if (type.startsWith("video/")) return "🎬";
    if (type.startsWith("audio/")) return "🎵";
    if (type.includes("pdf")) return "📄";
    if (type.includes("word") || type.includes("document")) return "📝";
    if (type.includes("excel") || type.includes("sheet")) return "📊";
    if (type.includes("powerpoint") || type.includes("presentation"))
      return "📊";
    return "📁";
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateTime = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case "students":
        return "Students";
      case "teachers":
        return "Teachers";
      case "parents":
        return "Parents";
      case "staff":
        return "Staff";
      default:
        return audience;
    }
  };

  return (
    <div className="min-h-screen w-full overflow-y-scroll bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Manage Notices</h1>
          <p className="mt-2 opacity-90">
            View, edit, and manage notices for the school community
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search notices..."
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
                onClick={() => (window.location.href = "/notice-publish-page")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Publish Notice
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience
                  </label>
                  <select
                    value={filterAudience}
                    onChange={(e) => setFilterAudience(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">All Audiences</option>
                    <option value="students">Students</option>
                    <option value="teachers">Teachers</option>
                    <option value="parents">Parents</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Importance
                  </label>
                  <select
                    value={filterImportant}
                    onChange={(e) => setFilterImportant(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">All Notices</option>
                    <option value="important">Important Only</option>
                    <option value="regular">Regular Only</option>
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

        {/* Notices List */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="text-center p-12">
              <div className="text-gray-500 mb-4">No notices found</div>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {paginatedNotices.map((notice) => (
                <div
                  key={notice.id}
                  className={`p-6 ${notice.isImportant ? "bg-amber-50" : ""}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {notice.isImportant && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full flex items-center">
                            <Bell className="h-3 w-3 mr-1" />
                            Important
                          </span>
                        )}
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {notice.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {notice.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {notice.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center text-xs text-gray-500 gap-x-4 gap-y-2">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Published: {formatDate(notice.publishDate)}
                        </div>
                        {notice.expiryDate && (
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            Expires: {formatDate(notice.expiryDate)}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          For:{" "}
                          {notice.targetAudience
                            .map(getAudienceLabel)
                            .join(", ")}
                        </div>
                        {notice.attachments.length > 0 && (
                          <div className="flex items-center">
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            {notice.attachments.length} attachment
                            {notice.attachments.length !== 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2 self-end md:self-start">
                      <button
                        onClick={() => handleViewNotice(notice)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center text-sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteClick(notice)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center text-sm"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && filteredNotices.length > 0 && (
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
                      filteredNotices.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredNotices.length}</span>{" "}
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

      {/* View Notice Modal */}
      {isViewModalOpen && selectedNotice && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Notice Details</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {selectedNotice.isImportant && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full flex items-center">
                      <Bell className="h-3 w-3 mr-1" />
                      Important
                    </span>
                  )}
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {selectedNotice.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedNotice.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center text-xs text-gray-500 gap-x-4 gap-y-2">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      Published: {formatDate(selectedNotice.publishDate)}
                    </div>
                    {selectedNotice.expiryDate && (
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        Expires: {formatDate(selectedNotice.expiryDate)}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      For:{" "}
                      {selectedNotice.targetAudience
                        .map(getAudienceLabel)
                        .join(", ")}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Description
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-line">
                    {selectedNotice.description}
                  </div>
                </div>

                {selectedNotice.attachments.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Attachments
                    </h4>
                    <div className="space-y-2">
                      {selectedNotice.attachments.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center">
                            <span className="text-xl mr-2">
                              {getFileIcon(file.type)}
                            </span>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <a
                            href={file.url}
                            download={file.name}
                            className="text-blue-500 hover:text-blue-700 p-1"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 border-t pt-4">
                  <p>Published by: {selectedNotice.publishedBy}</p>
                  <p>
                    Published at: {formatDateTime(selectedNotice.publishedAt)}
                  </p>
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
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && noticeToDelete && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-center">Delete Notice</h3>
              <p className="mt-2 text-center text-gray-500">
                Are you sure you want to delete "{noticeToDelete.title}"? This
                action cannot be undone.
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
    </div>
  );
}
