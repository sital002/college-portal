import Context from "@/context/context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Context>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="teacher/classlist"
          options={{
            title: "Assignments",
          }}
        />
        <Stack.Screen
          name="teacher/index"
          options={{
            title: "Teacher",
          }}
        />
        <Stack.Screen
          name="teacher/attendence/index"
          options={{
            title: "Attendance",
          }}
        />
        <Stack.Screen
          name="teacher/assignment-upload"
          options={{
            title: "Create Assignment",
          }}
        />
        <Stack.Screen
          name="teacher/view-assignment"
          options={{
            title: "View Assignment",
          }}
        />
        <Stack.Screen
          name="teacher/submited-assignments"
          options={{
            title: "Submited Assignment",
          }}
        />
      </Stack>
    </Context>
  );
}
