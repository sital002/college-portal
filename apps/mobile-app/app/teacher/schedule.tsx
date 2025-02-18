import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type ClassSchedule = {
  id: string;
  subject: string;
  class: string;
  startTime: string;
  endTime: string;
  room: string;
  students: number;
};

type DaySchedule = {
  [key: string]: ClassSchedule[];
};

const scheduleData: DaySchedule = {
  Monday: [
    {
      id: "1",
      subject: "Mathematics",
      class: "Grade 10-A",
      startTime: "08:00",
      endTime: "09:30",
      room: "Room 101",
      students: 28,
    },
    {
      id: "2",
      subject: "Physics",
      class: "Grade 11-B",
      startTime: "09:45",
      endTime: "11:15",
      room: "Lab 202",
      students: 24,
    },
    {
      id: "3",
      subject: "Mathematics",
      class: "Grade 9-C",
      startTime: "11:30",
      endTime: "13:00",
      room: "Room 103",
      students: 26,
    },
    {
      id: "4",
      subject: "Physics",
      class: "Grade 10-B",
      startTime: "14:00",
      endTime: "15:30",
      room: "Lab 202",
      students: 25,
    },
  ],
  Tuesday: [
    {
      id: "5",
      subject: "Mathematics",
      class: "Grade 11-A",
      startTime: "08:00",
      endTime: "09:30",
      room: "Room 101",
      students: 27,
    },
    {
      id: "6",
      subject: "Physics Lab",
      class: "Grade 11-B",
      startTime: "09:45",
      endTime: "12:15",
      room: "Lab 202",
      students: 24,
    },
    {
      id: "7",
      subject: "Mathematics",
      class: "Grade 10-C",
      startTime: "13:00",
      endTime: "14:30",
      room: "Room 103",
      students: 26,
    },
  ],
  Wednesday: [
    /* Similar structure */
  ],
  Thursday: [
    /* Similar structure */
  ],
  Friday: [
    /* Similar structure */
  ],
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const ScheduleScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(days[0]);

  const ClassCard: React.FC<{ schedule: ClassSchedule }> = ({ schedule }) => (
    <Pressable
      style={styles.classCard}
      onPress={() => console.log(`Pressed class ${schedule.subject}`)}
    >
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{schedule.startTime}</Text>
        <View style={styles.timeDivider} />
        <Text style={styles.timeText}>{schedule.endTime}</Text>
      </View>

      <View style={styles.classInfo}>
        <Text style={styles.subjectText}>{schedule.subject}</Text>
        <Text style={styles.classText}>{schedule.class}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{schedule.room}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{schedule.students} students</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Class Schedule</Text>
      </View>

      

      <ScrollView style={styles.scheduleContainer}>
        {scheduleData[selectedDay]?.map((schedule) => (
          <ClassCard key={schedule.id} schedule={schedule} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  daySelector: {
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  dayButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedDayButton: {
    backgroundColor: "#4a69bd",
  },
  dayText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  selectedDayText: {
    color: "#fff",
  },
  scheduleContainer: {
    padding: 15,
  },
  classCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  timeContainer: {
    paddingRight: 15,
    borderRightWidth: 1,
    borderRightColor: "#eee",
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
  },
  timeText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  timeDivider: {
    height: 30,
    width: 1,
    backgroundColor: "#eee",
  },
  classInfo: {
    flex: 1,
    paddingLeft: 15,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  classText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 5,
    color: "#666",
    fontSize: 14,
  },
});

export default ScheduleScreen;
