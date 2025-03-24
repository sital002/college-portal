"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface Student {
  id: number
  name: string
  email: string
  grade: string
  department: string
  status: "Active" | "Inactive" | "On Leave"
  avatar: string
}

const students: Student[] = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    grade: "A",
    department: "Computer Science",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "James Rodriguez",
    email: "james.r@example.com",
    grade: "B+",
    department: "Mathematics",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Sophia Chen",
    email: "sophia.c@example.com",
    grade: "A-",
    department: "Physics",
    status: "On Leave",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Michael Johnson",
    email: "michael.j@example.com",
    grade: "B",
    department: "Chemistry",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Olivia Brown",
    email: "olivia.b@example.com",
    grade: "A+",
    department: "Biology",
    status: "Inactive",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

interface StudentTableProps {
  searchQuery: string
}

export function StudentTable({ searchQuery }: StudentTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max table-auto border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Student
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Department
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Grade
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentStudents.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={student.avatar}
                    alt={student.name}
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      {student.name}
                    </div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {student.department}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {student.grade}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}
                >
                  {student.status}
                </span>
              </td>
              <td className="px-4 py-2 text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
          {currentStudents.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-2 text-center text-sm text-gray-500"
              >
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

}

