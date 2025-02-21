import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

interface Subject {
  id: string;
  name: string;
  teacher: string;
  startTime: string;
  endTime: string;
  color: string;
}

const { width } = Dimensions.get("window");

const generateSchedule = (
  subjects: Omit<Subject, "startTime" | "endTime">[]
) => {
  const startTime = 9 * 60;
  const periodDuration = 90;
  let schedule: Subject[] = [];
  let availableSubjects = [...subjects];

  for (let i = 0; i < subjects.length; i++) {
    const subjectIndex = Math.floor(Math.random() * availableSubjects.length);
    const subject = availableSubjects.splice(subjectIndex, 1)[0];
    const start = startTime + i * periodDuration;
    const end = start + periodDuration;

    const formatTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
    };

    schedule.push({
      ...subject,
      startTime: formatTime(start),
      endTime: formatTime(end),
    });
  }
  return schedule;
};

const Schedule: React.FC<{ subjects: Subject[] }> = ({ subjects }) => {
  const [scheduledSubjects, setScheduledSubjects] = useState<Subject[]>([]);
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
  }, [subjects]);

  const handleGenerateSchedule = () => {
    const shuffledSubjects = [...subjects].sort(() => Math.random() - 0.5);
    const newSchedule = generateSchedule(shuffledSubjects);
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Schedule</Text>
      <TouchableOpacity style={styles.button} onPress={handleGenerateSchedule}>
        <Text style={styles.buttonText}>Generate Schedule</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {scheduledSubjects.map((subject, index) => (
          <Animated.View
            key={subject.id}
            style={[
              styles.subjectCard,
              {
                opacity: animations[index]?.fade,
                transform: [{ translateY: animations[index]?.slide }],
              },
            ]}
          >
            <LinearGradient
              colors={[subject.color, subject.color + "99"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBackground}
            >
              <View style={styles.timeContainer}>
                <MaterialIcons name="access-time" size={20} color="white" />
                <Text style={styles.timeText}>
                  {subject.startTime} - {subject.endTime}
                </Text>
              </View>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <View style={styles.teacherContainer}>
                  <MaterialIcons name="person" size={16} color="white" />
                  <Text style={styles.teacherName}>{subject.teacher}</Text>
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

const sampleSubjects: Omit<Subject, "startTime" | "endTime">[] = [
  { id: "1", name: "Mathematics", teacher: "Dr. Smith", color: "#FF6B6B" },
  { id: "2", name: "Physics", teacher: "Prof. Johnson", color: "#4ECDC4" },
  { id: "3", name: "Chemistry", teacher: "Dr. Williams", color: "#45B7D1" },
];

export default () => <Schedule subjects={sampleSubjects as Subject[]} />;
