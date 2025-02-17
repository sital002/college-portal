import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
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

const Schedule: React.FC<{ subjects: Subject[] }> = ({ subjects }) => {
  const sortedSubjects = [...subjects].sort((a, b) =>
    a.startTime.localeCompare(b.startTime)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Schedule</Text>
      <ScrollView style={styles.scrollView}>
        {sortedSubjects.map((subject, index) => {
          const fadeAnim = new Animated.Value(0);
          const slideAnim = new Animated.Value(50);

          useEffect(() => {
            Animated.parallel([
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: index * 100,
                useNativeDriver: true,
              }),
              Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                delay: index * 100,
                useNativeDriver: true,
              }),
            ]).start();
          }, []);

          return (
            <Animated.View
              key={subject.id}
              style={[
                styles.subjectCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
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
          );
        })}
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

// Example usage
const sampleSubjects: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    teacher: "Dr. Smith",
    startTime: "09:00",
    endTime: "10:30",
    color: "#FF6B6B",
  },
  {
    id: "2",
    name: "Physics",
    teacher: "Prof. Johnson",
    startTime: "11:00",
    endTime: "12:30",
    color: "#4ECDC4",
  },
  {
    id: "3",
    name: "Chemistry",
    teacher: "Dr. Williams",
    startTime: "14:00",
    endTime: "15:30",
    color: "#45B7D1",
  },
];

export default () => <Schedule subjects={sampleSubjects} />;
