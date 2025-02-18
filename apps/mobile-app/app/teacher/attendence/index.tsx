import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import StudentAttendanceRow from "./attendence-row";
import ClassSelector from "./class-selector";
import { Alert } from "react-native";
import { useState } from "react";
import { sampleClasses } from "./type";
import AttendanceReport from "./attendence-report";
import { styles } from "./style";
import { router } from "expo-router";

const AttendanceScreen: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState(sampleClasses[0].id);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState<
    Record<string, "present" | "absent" | "late">
  >({});

  const handleSubmit = () => {
    // Here you would typically save the attendance to your backend
    Alert.alert("Success", "Attendance submitted successfully");
    router.push("/teacher/attendence/attendence-report");
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Attendance</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>

      <ClassSelector
        classes={sampleClasses}
        selectedClass={selectedClass}
        onSelect={setSelectedClass}
      />

      <ScrollView style={styles.studentList}>
        {sampleClasses
          .find((cls) => cls.id === selectedClass)
          ?.students.map((student) => (
            <StudentAttendanceRow
              key={student.id}
              student={student}
              attendance={attendance[student.id] || "present"}
              onStatusChange={(status) => {
                setAttendance((prev) => ({
                  ...prev,
                  [student.id]: status,
                }));
              }}
            />
          ))}
      </ScrollView>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Attendance</Text>
      </Pressable>

    </SafeAreaView>
  );
};

export default AttendanceScreen;
