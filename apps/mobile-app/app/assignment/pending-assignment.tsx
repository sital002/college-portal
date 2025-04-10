import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Assignment, viewAllAssignments } from "@repo/api";
import { getToken } from "@/config/token";

export const PendingAssignments: React.FC = () => {
  const today = new Date();
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const getStatusColor = (dueDate: string) => {
    const due = new Date(dueDate);
    const daysLeft = Math.ceil(
      (due.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    return daysLeft < 0 ? "#EF4444" : daysLeft <= 2 ? "#F59E0B" : "#059669";
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
    router.push(`/assignment?id=${assignment.id}&room=${assignment.room}`);
  };

  useEffect(() => {
    async function fetchAssignments() {
      const token = await getToken();
      if (token) {
        const allAssignments = await viewAllAssignments({token});
        console.log(allAssignments);
        setAssignments(allAssignments as Assignment[]);
      }
    }
    fetchAssignments();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pending Assignments</Text>
        <Text style={styles.headerSubtitle}>
          You have {assignments.length} pending tasks
        </Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {assignments.map((assignment) => (
          <TouchableOpacity
            key={assignment.id}
            style={styles.assignmentCard}
            onPress={() => handleAssignmentPress(assignment)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{assignment.title}</Text>
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(assignment.deadLine) },
                ]}
              >
                {getDaysRemaining(assignment.deadLine)}
              </Text>
            </View>
            <Text style={styles.description}>{assignment.description}</Text>
            <Text style={styles.room}>Room: {assignment.room}</Text>
            {assignment.attachments && (
              <Text style={styles.attachments}>
                Attachment:{" "}
                {typeof assignment.attachments === "string"
                  ? assignment.attachments
                  : "File uploaded"}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: { fontSize: 24, fontWeight: "700", color: "#111827" },
  headerSubtitle: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  content: { padding: 16 },
  assignmentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: "600", color: "#111827" },
  description: { fontSize: 14, color: "#6B7280", marginBottom: 8 },
  room: { fontSize: 12, color: "#4B5563" },
  attachments: { fontSize: 12, color: "#4F46E5", marginTop: 8 },
  statusText: { fontSize: 12, fontWeight: "500" },
});

export default PendingAssignments;
