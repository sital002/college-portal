import {
  Clock,
  FileText,
  GraduationCap,
  MessageSquare,
  UserPlus,
} from "lucide-react";

interface Activity {
  id: number;
  type: "message" | "assignment" | "enrollment" | "grade" | "announcement";
  content: string;
  time: string;
  user?: string;
}

const activities: Activity[] = [
  {
    id: 1,
    type: "enrollment",
    content: "New student enrolled in Computer Science",
    time: "2 hours ago",
    user: "Alex Johnson",
  },
  {
    id: 2,
    type: "assignment",
    content: 'Assignment "Data Structures" due date updated',
    time: "3 hours ago",
  },
  {
    id: 3,
    type: "grade",
    content: 'Grades posted for "Calculus 101" exam',
    time: "5 hours ago",
  },
  {
    id: 4,
    type: "message",
    content: "New message from department head",
    time: "Yesterday",
    user: "Dr. Williams",
  },
  {
    id: 5,
    type: "announcement",
    content: "Campus will be closed for maintenance",
    time: "Yesterday",
  },
];

export function ActivityFeed() {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "assignment":
        return <FileText className="h-5 w-5 text-purple-500" />;
      case "enrollment":
        return <UserPlus className="h-5 w-5 text-green-500" />;
      case "grade":
        return <GraduationCap className="h-5 w-5 text-yellow-500" />;
      case "announcement":
        return <MessageSquare className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      {activity.user && (
                        <span className="font-medium text-gray-900">
                          {activity.user}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {activity.content}
                    </p>
                  </div>
                  <div className="mt-2 text-xs flex items-center text-gray-500">
                    <Clock className="mr-1.5 h-3 w-3 text-gray-400" />
                    {activity.time}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
