import { router } from "expo-router";
import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AssignmentListScreen from "./view-assignment";

const classes = [
  {
    id: "1",
    name: "Class 1",
    subject: "Math",
    teacher: "Mr. Johnson",
    color: "#FF6F61",
  },
  {
    id: "2",
    name: "Class 2",
    subject: "Science",
    teacher: "Ms. Smith",
    color: "#6B5B95",
  },
  {
    id: "3",
    name: "Class 3",
    subject: "History",
    teacher: "Mr. Brown",
    color: "#88B04B",
  },
  {
    id: "4",
    name: "Class 4",
    subject: "English",
    teacher: "Mrs. Davis",
    color: "#45A29E",
  },
];

const ClassListScreen = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Text
            style={{
              color: "#007bff",
              marginBottom: 20,
              fontSize: 16,
              fontWeight: "bold",
              backgroundColor: "#f1f1f1",
              padding: 12,
              borderRadius: 8,
              width: "100%",
              textAlign: "center",
            }}
            onPress={() => router.push(`/teacher/assignment-upload`)}
          >
            Create Assignment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginBottom: 20 }}
          onPress={() => router.push(`/teacher/view-assignment`)}
        >
          <Text style={{ color: "green",paddingHorizontal:20, }}>View Assignment</Text>
        </TouchableOpacity>
      </View>
          <Text style={{ color: "#007bff",paddingHorizontal:20 }}>Recent Assignments</Text>
      <AssignmentListScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  classCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    marginVertical: 12,
    borderRadius: 12,
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 50,
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  className: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  subject: { color: "#fff", fontSize: 16, fontWeight: "600" },
  teacher: { color: "#fff", fontSize: 14, opacity: 0.9 },
});

export default ClassListScreen;
