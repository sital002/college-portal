// components/ClassSchedule.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Period {
  id: string;
  subject: string;
  teacher: string;
  startTime: string;
  endTime: string;
  room: string;
}

interface DaySchedule {
  day: string;
  periods: Period[];
}

const schedule: DaySchedule[] = [
  {
    day: "Monday",
    periods: [
      {
        id: "1",
        subject: "Mathematics",
        teacher: "Mr. Johnson",
        startTime: "08:00",
        endTime: "08:45",
        room: "Room 101",
      },
      {
        id: "2",
        subject: "English",
        teacher: "Mrs. Smith",
        startTime: "09:00",
        endTime: "09:45",
        room: "Room 102",
      },
      {
        id: "3",
        subject: "Physics",
        teacher: "Dr. Brown",
        startTime: "10:00",
        endTime: "10:45",
        room: "Lab 201",
      },
      {
        id: "4",
        subject: "Break",
        teacher: "-",
        startTime: "10:45",
        endTime: "11:15",
        room: "-",
      },
      {
        id: "5",
        subject: "Chemistry",
        teacher: "Ms. Davis",
        startTime: "11:15",
        endTime: "12:00",
        room: "Lab 202",
      },
      {
        id: "6",
        subject: "History",
        teacher: "Mr. Wilson",
        startTime: "12:15",
        endTime: "13:00",
        room: "Room 103",
      },
    ],
  },
  // Add more days here
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const ClassSchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [expandedPeriod, setExpandedPeriod] = useState<string | null>(null);

  const todaySchedule =
    schedule.find((s) => s.day === selectedDay) || schedule[0];

  const getStatusColor = (startTime: string): string => {
    const now = new Date();
    const [hours, minutes] = startTime.split(":").map(Number);
    const periodTime = new Date();
    periodTime.setHours(hours, minutes);

    if (now.getHours() === hours && now.getMinutes() >= minutes) {
      return "#4F46E5"; // Current period
    }
    return now > periodTime ? "#9CA3AF" : "#059669"; // Past or upcoming
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Class Schedule</Text>
        <Text style={styles.headerSubtitle}>Class VIII-A</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysContainer}
      >
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay === day && styles.selectedDayText,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scheduleContainer}>
        {todaySchedule.periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            style={styles.periodCard}
            onPress={() =>
              setExpandedPeriod(expandedPeriod === period.id ? null : period.id)
            }
          >
            <View style={styles.periodHeader}>
              <View style={styles.timeContainer}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getStatusColor(period.startTime) },
                  ]}
                />
                <Text style={styles.timeText}>
                  {period.startTime} - {period.endTime}
                </Text>
              </View>
              <MaterialIcons
                name={
                  expandedPeriod === period.id ? "expand-less" : "expand-more"
                }
                size={24}
                color="#6B7280"
              />
            </View>

            <View style={styles.subjectContainer}>
              <Text style={styles.subjectText}>{period.subject}</Text>
              {expandedPeriod === period.id && (
                <View style={styles.expandedInfo}>
                  <View style={styles.infoRow}>
                    <MaterialIcons name="person" size={20} color="#6B7280" />
                    <Text style={styles.infoText}>{period.teacher}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <MaterialIcons name="room" size={20} color="#6B7280" />
                    <Text style={styles.infoText}>{period.room}</Text>
                  </View>
                </View>
              )}
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
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },
  daysContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  dayButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    height: 35,
  },
  selectedDayButton: {
    backgroundColor: "#4F46E5",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  selectedDayText: {
    color: "#FFFFFF",
  },
  scheduleContainer: {
    padding: 16,
  },
  periodCard: {
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
  periodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  timeText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  subjectContainer: {
    marginTop: 8,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  expandedInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#374151",
  },
});

export default ClassSchedule;
