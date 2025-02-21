import { User } from "lucide-react";

const Card = () => {
  return (
    <div className="flex gap-x-3 p-3 items-center grow rounded-md bg-white border-gray-200">
      <User strokeWidth={1} size={80} className="bg-blue-500 text-white rounded-md" />
      <div>
        <h1 className="font-medium text-2xl">Top Student</h1>
        <p className="font-medium text-3xl">10</p>
      </div>
    </div>
  );
};

export default Card;
