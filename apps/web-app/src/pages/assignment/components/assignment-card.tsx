import { Calendar } from 'lucide-react';

const AssignmentCard = () => {
  return (
    <div className="flex justify-between shadow-md rounded-md p-3 mx-auto bg-white space-y-3">
      <div>
        <div className="flex justify-between items-center ">
          <p>Math Homework1</p>
          <p className="ml-3 text-xs opacity-30">Complete</p>
        </div>
        <p className="text-xs">complet exercises from the textbook</p>
        <p className="mt-2 cursor-pointer text-blue-500">View Details</p>
      </div>
      <div className="flex items-center gap-x-7">
        <div className='space-y-2 opacity-70'>
          <p>Assign Date</p>
          <p className="flex items-center gap-x-2">
            <Calendar />
            June 30, 2021
          </p>
        </div>
        <div className='space-y-2 opacity-70'>
          <p>Due Date</p>
          <p className="flex items-center gap-x-2 opacity-70">
            <Calendar />
            July 7, 2021
          </p>
        </div>
      </div>
    </div>
  );
}

export default AssignmentCard
