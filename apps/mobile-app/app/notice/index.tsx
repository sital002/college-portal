import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
}

const notices: Notice[] = [
  {
    id: "1",
    title: "Exam Schedule Update",
    description: "Final exams are postponed by a week.",
    date: "Feb 20, 2025",
  },
  {
    id: "2",
    title: "Holiday Announcement",
    description: "School remains closed on March 1st.",
    date: "Feb 15, 2025",
  },
  {
    id: "3",
    title: "New Course Available",
    description: "Enrollments open for the new AI course.",
    date: "Feb 10, 2025",
  },
];

const NoticeCard: React.FC<{ notice: Notice }> = ({ notice }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{notice.title}</Text>
    <Text style={styles.description}>{notice.description}</Text>
    <Text style={styles.date}>{notice.date}</Text>
  </View>
);

const NoticePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notices</Text>
      <FlatList
        data={notices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoticeCard notice={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#1F2937",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "right",
  },
});

export default NoticePage;
