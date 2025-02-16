// components/PendingAssignments.tsx
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  teacher: string;
  status: "pending" | "overdue";
  progress: number;
  icon: "description" | "science" | "calculate" | "history" | "language";
}

const dummyAssignments: Assignment[] = [
  {
    id: "1",
    title: "Chapter 5 Exercises",
    subject: "Mathematics",
    dueDate: "2025-02-20",
    teacher: "Mr. Johnson",
    status: "pending",
    progress: 0,
    icon: "calculate",
  },
  {
    id: "2",
    title: "Lab Report: Chemical Reactions",
    subject: "Chemistry",
    dueDate: "2025-02-18",
    teacher: "Ms. Davis",
    status: "overdue",
    progress: 30,
    icon: "science",
  },
  {
    id: "3",
    title: "Essay: World War II",
    subject: "History",
    dueDate: "2025-02-22",
    teacher: "Mr. Wilson",
    status: "pending",
    progress: 60,
    icon: "history",
  },
  {
    id: "4",
    title: "Grammar Exercises",
    subject: "English",
    dueDate: "2025-02-21",
    teacher: "Mrs. Smith",
    status: "pending",
    progress: 45,
    icon: "language",
  },
];

export const PendingAssignments: React.FC = () => {
  const today = new Date();

  const getStatusColor = (status: string, dueDate: string) => {
    if (status === "overdue") return "#EF4444";
    const due = new Date(dueDate);
    const daysLeft = Math.ceil(
      (due.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    return daysLeft <= 2 ? "#F59E0B" : "#059669";
  };

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const daysLeft = Math.ceil(
      (due.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    if (daysLeft < 0) return "Overdue";
    if (daysLeft === 0) return "Due Today";
    if (daysLeft === 1) return "Due Tomorrow";
    return `${daysLeft} days left`;
  };

  const handleAssignmentPress = (assignment: Assignment) => {
    // Navigate to the assignment form with pre-filled data
    router.push("/assignment");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Pending Assignments</Text>
          <Text style={styles.headerSubtitle}>
            You have {dummyAssignments.length} pending tasks
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {dummyAssignments.map((assignment) => (
          <TouchableOpacity
            key={assignment.id}
            style={styles.assignmentCard}
            onPress={() => handleAssignmentPress(assignment)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <MaterialIcons
                  name={assignment.icon}
                  size={24}
                  color="#4F46E5"
                />
              </View>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: getStatusColor(
                        assignment.status,
                        assignment.dueDate
                      ),
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: getStatusColor(
                        assignment.status,
                        assignment.dueDate
                      ),
                    },
                  ]}
                >
                  {getDaysRemaining(assignment.dueDate)}
                </Text>
              </View>
            </View>

            <Text style={styles.title}>{assignment.title}</Text>
            <Text style={styles.subject}>{assignment.subject}</Text>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${assignment.progress}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{assignment.progress}%</Text>
            </View>

            <View style={styles.footer}>
              <View style={styles.teacherInfo}>
                <MaterialIcons name="person" size={16} color="#6B7280" />
                <Text style={styles.teacherName}>{assignment.teacher}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  addButton: {
    backgroundColor: "#4F46E5",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4F46E5",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    padding: 16,
  },
  assignmentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  subject: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginRight: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4F46E5",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teacherInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  teacherName: {
    marginLeft: 4,
    fontSize: 12,
    color: "#6B7280",
  },
});

export default PendingAssignments;
