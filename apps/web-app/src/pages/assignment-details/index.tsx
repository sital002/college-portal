import React from 'react';
import { Calendar, Clock, Paperclip, Upload, Download, MessageCircle, User } from 'lucide-react';

const AssignmentDetails = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Math Assignment: Quadratic Equations</h1>
          <p className="text-blue-100">Class: Advanced Mathematics - Grade 11</p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Assignment Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Assignment Details</h2>
            <p className="text-gray-600 mb-4">
              Complete the following exercises on quadratic equations. Show all your work and explain your reasoning for each step. This assignment will help reinforce your understanding of solving and graphing quadratic equations.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="mr-2 text-blue-500" size={18} />
                <span>Assigned: May 15, 2023</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 text-blue-500" size={18} />
                <span>Due: May 22, 2023</span>
              </div>
              <div className="flex items-center">
                <Paperclip className="mr-2 text-blue-500" size={18} />
                <span>2 Attachments</span>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Resources</h2>
            <div className="space-y-3">
              {['Assignment_Instructions.pdf', 'Quadratic_Equations_Worksheet.docx'].map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-700">{file}</span>
                  <button className="text-blue-500 hover:text-blue-600 transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submission */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Submission</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <span className="text-gray-600 mb-2 sm:mb-0">Status: <span className="font-semibold text-yellow-500">Pending</span></span>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center">
                  <Upload className="mr-2" size={18} />
                  Upload Submission
                </button>
              </div>
              <p className="text-sm text-gray-500">Upload your completed assignment here. Make sure to include all required files and double-check your work before submitting.</p>
            </div>
          </div>

          {/* Comments */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <textarea 
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Add a comment or question about the assignment..."
              ></textarea>
              <div className="mt-2 flex justify-end">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors flex items-center">
                  <MessageCircle className="mr-2" size={18} />
                  Post Comment
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {/* Example comment */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <User size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <span className="text-xs text-gray-500">May 16, 2023 at 2:30 PM</span>
                  </div>
                </div>
                <p className="text-gray-600">Is it okay if we use a graphing calculator for the graphing portion of this assignment?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AssignmentDetails;