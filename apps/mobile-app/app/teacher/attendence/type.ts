export type Student = {
  id: string;
  name: string;
  rollNo: string;
  class: string;
};

export type AttendanceRecord = {
  id: string;
  studentId: string;
  date: string;
  status: "present" | "absent" | "late";
};

export type ClassSection = {
  id: string;
  name: string;
  students: Student[];
};

// Sample Data
export const sampleClasses: ClassSection[] = [
  {
    id: "1",
    name: "Grade 10-A",
    students: [
      { id: "1", name: "John Doe", rollNo: "101", class: "Grade 10-A" },
      { id: "2", name: "Jane Smith", rollNo: "102", class: "Grade 10-A" },
      { id: "2", name: "Jane Smith", rollNo: "102", class: "Grade 10-A" },
      { id: "2", name: "Jane Smith", rollNo: "102", class: "Grade 10-A" },
      { id: "2", name: "Jane Smith", rollNo: "102", class: "Grade 10-A" },
      { id: "2", name: "Jane Smith", rollNo: "102", class: "Grade 10-A" },
      { id: "2", name: "Jane Smith", rollNo: "102", class: "Grade 10-A" },
      { id: "2", name: "Jane Smith", rollNo: "102", class: "Grade 10-A" },
      { id: "2", name: "Jane Smith", rollNo: "102", class: "Grade 10-A" },
      { id: "2", name: "Jane Smith", rollNo: "102", class: "Grade 10-A" },
      // Add more students
    ],
  },
  {
    id: "2",
    name: "Grade 10-A",
    students: [
      { id: "1", name: "John Doe", rollNo: "101", class: "Grade 10-A" },
      { id: "2", name: "Jane Smith", rollNo: "102", class: "Grade 10-A" },
      // Add more students
    ],
  },
  {
    id: "3",
    name: "Grade 10-A",
    students: [
      { id: "1", name: "John Doe", rollNo: "101", class: "Grade 10-A" },
      { id: "2", name: "Jane Smith", rollNo: "102", class: "Grade 10-A" },
      // Add more students
    ],
  },
  {
    id: "4",
    name: "Grade 10-A",
    students: [
      { id: "1", name: "John Doe", rollNo: "101", class: "Grade 10-A" },
      { id: "2", name: "Jane Smith", rollNo: "102", class: "Grade 10-A" },
      // Add more students
    ],
  },
  // Add more classes
];
