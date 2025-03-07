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
            title: "Upload Assignment",
          }}
        />
      </Stack>
    </Context>
  );
}
