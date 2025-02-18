import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import { Pressable, Text, View } from "react-native";
import { Student } from "./type";

const StudentAttendanceRow: React.FC<{
  student: Student;
  attendance: "present" | "absent" | "late";
  onStatusChange: (status: "present" | "absent" | "late") => void;
}> = ({ student, attendance, onStatusChange }) => (
  <View style={styles.studentRow}>
    <View style={styles.studentInfo}>
      <Text style={styles.studentName}>{student.name}</Text>
      <Text style={styles.rollNo}>Roll No: {student.rollNo}</Text>
    </View>
    <View style={styles.attendanceButtons}>
      <Pressable
        style={[
          styles.statusButton,
          attendance === "present" && styles.presentButton,
        ]}
        onPress={() => onStatusChange("present")}
      >
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={attendance === "present" ? "#fff" : "#4CAF50"}
        />
      </Pressable>
      <Pressable
        style={[
          styles.statusButton,
          attendance === "late" && styles.lateButton,
        ]}
        onPress={() => onStatusChange("late")}
      >
        <Ionicons
          name="time"
          size={24}
          color={attendance === "late" ? "#fff" : "#FFC107"}
        />
      </Pressable>
      <Pressable
        style={[
          styles.statusButton,
          attendance === "absent" && styles.absentButton,
        ]}
        onPress={() => onStatusChange("absent")}
      >
        <Ionicons
          name="close-circle"
          size={24}
          color={attendance === "absent" ? "#fff" : "#F44336"}
        />
      </Pressable>
    </View>
  </View>
);


export default StudentAttendanceRow;