import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

type Professor = {
  id: number;
  name: string;
};

type Subject = {
  id: number;
  name: string;
  color: string;
};

type Classroom = {
  id: string;
  capacity: number;
};

type TimeSlot = { start: string; end: string };
type Day = string;

type ScheduleEntry = {
  subject: string;
  professor: string;
  classroom: string;
  day: Day;
  startTime: string;
  endTime: string;
};

const professors: Professor[] = [
  { id: 1, name: "Dr. Smith" },
  { id: 2, name: "Prof. Jane" },
  { id: 3, name: "Dr. Brown" },
  { id: 4, name: "Prof. Miller" },
  { id: 5, name: "Dr. Anderson" },
  { id: 6, name: "Prof. Davis" },
  { id: 7, name: "Dr. Johnson" },
];

const subjects: Subject[] = [
  { id: 101, name: "Math", color: "#FF6B6B" },
  { id: 102, name: "Physics", color: "#4ECDC4" },
  { id: 103, name: "Chemistry", color: "#FF9F1C" },
  { id: 104, name: "Biology", color: "#1E90FF" },
  { id: 105, name: "Computer Science", color: "#8A2BE2" },
  { id: 106, name: "History", color: "#FFD700" },
  { id: 107, name: "Literature", color: "#FF4500" },
  { id: 108, name: "Art", color: "#32CD32" },
  { id: 109, name: "Music", color: "#FF1493" },
  { id: 110, name: "Economics", color: "#20B2AA" },
];

const classrooms: Classroom[] = [
  { id: "A101", capacity: 50 },
  { id: "B202", capacity: 60 },
  { id: "C303", capacity: 40 },
  { id: "D404", capacity: 70 },
  { id: "E505", capacity: 55 },
  { id: "F606", capacity: 65 },
];

const timeSlots: TimeSlot[] = [
  { start: "8AM", end: "9AM" },
  { start: "9AM", end: "10AM" },
  { start: "10AM", end: "11AM" },
  { start: "11AM", end: "12PM" },
  { start: "1PM", end: "2PM" },
  { start: "2PM", end: "3PM" },
  { start: "3PM", end: "4PM" },
];

const days: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Schedule = () => {
  const [scheduledSubjects, setScheduledSubjects] = useState<ScheduleEntry[]>(
    []
  );
  const [animations, setAnimations] = useState<
    { fade: Animated.Value; slide: Animated.Value }[]
  >([]);

  useEffect(() => {
    setAnimations(
      subjects.map(() => ({
        fade: new Animated.Value(0),
        slide: new Animated.Value(50),
      }))
    );
  }, []);

  const handleGenerateSchedule = () => {
    const newSchedule = scheduleTimetable(
      subjects,
      professors,
      classrooms,
      timeSlots,
      days
    );
    console.log(newSchedule);
    if (!newSchedule) return;
    setScheduledSubjects(newSchedule);

    newSchedule.forEach((_, index) => {
      Animated.parallel([
        Animated.timing(animations[index]?.fade, {
          toValue: 1,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(animations[index]?.slide, {
          toValue: 0,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  function isValid(
    schedule: ScheduleEntry[],
    newEntry: ScheduleEntry
  ): boolean {
    return !schedule.some(
      (e) =>
        e.day === newEntry.day &&
        e.startTime === newEntry.startTime &&
        (e.professor === newEntry.professor ||
          e.classroom === newEntry.classroom)
    );
  }

  function scheduleTimetable(
    subjects: Subject[],
    professors: Professor[],
    classrooms: Classroom[],
    timeSlots: TimeSlot[],
    days: Day[],
    schedule: ScheduleEntry[] = [],
    index: number = 0
  ): ScheduleEntry[] | null {
    if (index === subjects.length) return schedule;

    const subject = subjects[index];

    for (const professor of professors) {
      for (const day of days) {
        for (const time of timeSlots) {
          for (const classroom of classrooms) {
            const newEntry: ScheduleEntry = {
              subject: subject.name,
              professor: professor.name,
              classroom: classroom.id,
              day: day,
              startTime: time.start,
              endTime: time.end,
            };

            if (isValid(schedule, newEntry)) {
              const newSchedule = [...schedule, newEntry];
              const result = scheduleTimetable(
                subjects,
                professors,
                classrooms,
                timeSlots,
                days,
                newSchedule,
                index + 1
              );
              if (result) return result;
            }
          }
        }
      }
    }

    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Schedule</Text>
      <TouchableOpacity style={styles.button} onPress={handleGenerateSchedule}>
        <Text style={styles.buttonText}>Generate Schedule</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {scheduledSubjects.map((entry, index) => (
          <Animated.View
            key={`${entry.subject}-${entry.day}-${entry.startTime}`}
            style={[
              styles.subjectCard,
              {
                opacity: animations[index]?.fade,
                transform: [{ translateY: animations[index]?.slide }],
              },
            ]}
          >
            <LinearGradient
              colors={[
                subjects.find((s) => s.name === entry.subject)?.color ||
                  "#4ECDC4",
                "#4ECDC499",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBackground}
            >
              <View style={styles.timeContainer}>
                <MaterialIcons name="access-time" size={20} color="white" />
                <Text style={styles.timeText}>
                  {entry.startTime} - {entry.endTime}
                </Text>
              </View>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectName}>{entry.subject}</Text>
                <View style={styles.teacherContainer}>
                  <MaterialIcons name="person" size={16} color="white" />
                  <Text style={styles.teacherName}>{entry.professor}</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 20,
    marginTop: 40,
  },
  button: {
    backgroundColor: "#2d3436",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  subjectCard: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradientBackground: {
    padding: 20,
    borderRadius: 16,
    minHeight: 120,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  timeText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "500",
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  teacherContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  teacherName: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default Schedule;
