
import type React from "react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload, File } from "lucide-react";
import Input from "../../../components/common/input";

const AssignmentUpload: React.FC = () => {
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [className, setClassName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ assignmentName, className, deadline, files });
  };

  return (
    <div className=" w-full max-w-3xl mx-auto from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl p-8 w-full "
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create New Assignment
        </h1>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="assignmentName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Assignment Name
            </label>
            <Input
              type="text"
              id="assignmentName"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter assignment name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="assignmentName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <Input
              type="text"
              id="description"
              value={assignmentDescription}
              onChange={(e) => setAssignmentDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter assignment description"
              required
            />
          </div>

          <div>
            <label
              htmlFor="className"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Class
            </label>
            <select
              id="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a class</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Deadline
            </label>
            <Input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Files
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-gray-600">
                Drag & drop files here, or click to select files
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports images, PDFs, and documents
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Uploaded Files:
              </h3>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 rounded-md p-2"
                  >
                    <div className="flex items-center">
                      <File className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(file)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Create Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentUpload;
