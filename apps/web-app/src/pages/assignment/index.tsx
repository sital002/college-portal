import { Link } from "react-router";
import AssignmentCard from "./components/assignment-card";

const Assignment = () => {
  return (
    <div className="w-full p-4 overflow-y-scroll">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium">Assignments</h1>
          <p>Manage and track your class assignments</p>
        </div>
        <Link
          to={"upload"}
          className="bg-blue-500 text-white py-3 px-2 rounded-md cursor-pointer"
        >
          Publish Assignment
        </Link>
      </div>
      <div className="grid grid-cols-2 justify-between  ">
        <div className="p-4 my-2 rounded-md shadow-md border-2 border-gray-400 grow max-w-2xl ">
          <h1 className="text-2xl font-semibold mb-2">Class 1</h1>
          <div className="space-y-5">
            <AssignmentCard />
          </div>
        </div>
        <div className="p-4 h-auto rounded-md border-2 grow max-w-2xl my-2 shadow-md border-gray-400">
          <h1 className="text-2xl font-semibold mb-2">Class 1</h1>
          <div className="space-y-5 ">
            <AssignmentCard />
            <AssignmentCard />
            <AssignmentCard />
            <AssignmentCard />
          </div>
        </div>
        <div className="p-4 h-fit rounded-md border-2 grow max-w-2xl my-2 shadow-md border-gray-400">
          <h1 className="text-2xl font-semibold mb-2">Class 1</h1>
          <div className="space-y-5 ">
            <AssignmentCard />
            <AssignmentCard />
            <AssignmentCard />
            <AssignmentCard />
            <AssignmentCard />
            <AssignmentCard />
          </div>
        </div>
        <div className="p-4 h-fit rounded-md border-2 grow max-w-2xl my-2 shadow-md border-gray-400">
          <h1 className="text-2xl font-semibold mb-2">Class 1</h1>
          <div className="space-y-5 ">
            <AssignmentCard />
            <AssignmentCard />
            <AssignmentCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
