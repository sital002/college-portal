import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Route, router } from "expo-router";

type MenuItem = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  url?: string;
};

type FunType = () => void;

const menuItems: MenuItem[] = [
  {
    id: "1",
    title: "Attendance",
    icon: "people",
    route: "/teacher/a",
    url: "/teacher/attendence",
  },
  {
    id: "2",
    title: "Assignments",
    icon: "document-text",
    route: "assignments",
    url: "/teacher/classlist",
  },
  {
    id: "2",
    title: "Submitted Assignments",
    icon: "copy",
    route: "assignments",
    url: "/teacher/submited-assignments",
  },
  {
    id: "3",
    title: "Grade Book",
    icon: "book",
    route: "grades",
    url: "/classlist",
  },
  {
    id: "4",
    title: "Schedule",
    icon: "calendar",
    route: "schedule",
    url: "/teacher/schedule",
  },
  {
    id: "5",
    title: "Students",
    icon: "person",
    route: "students",
    url: "/classlist",
  },
  {
    id: "6",
    title: "Announcements",
    icon: "megaphone",
    route: "announcements",
    url: "/classlist",
  },
];

const HomeScreen: React.FC = () => {
  const [teacherName, setTeacherName] = React.useState("Ms. Johnson");
  const [pendingTasks, setPendingTasks] = React.useState(5);
  const [averageAttendance, setAverageAttendance] = React.useState("95.5%");

  const MenuCard: React.FC<{ item: MenuItem; onPress: FunType }> = ({
    item,
    onPress,
  }) => (
    <Pressable style={styles.menuCard} onPress={onPress}>
      <Ionicons name={item.icon} size={24} color="#ffffff" />
      <Text style={styles.menuTitle}>{item.title}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              source={{
                uri: "https://th.bing.com/th/id/R.3bcbeff4ee0abb81ef150c9ea7e35730?rik=t3aMo1m4uUQi6g&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2010%2f05%2ffree-stock-photos-people_102217.jpg&ehk=vGjIrntn5QyP%2fIXY2Ei7Iiz4%2fy%2byXvP8I8j0XxemwjI%3d&risl=&pid=ImgRaw&r=0",
              }}
              style={styles.profileImage}
            />
            <View style={styles.headerText}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.nameText}>{teacherName}</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Total Class</Text>
              <Text style={styles.statValue}>{pendingTasks}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Class Attendance</Text>
              <Text style={styles.statValue}>{averageAttendance}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <MenuCard
              onPress={() => router.push(item.url as Route)}
              key={item.id}
              item={item}
            />
          ))}
        </View>
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
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    width: "48%",
  },
  statTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  menuGrid: {
    padding: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuCard: {
    backgroundColor: "#4a69bd",
    width: "48%",
    aspectRatio: 1.5,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  menuTitle: {
    color: "#ffffff",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default HomeScreen;
