import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import StatusCard from "./_component/status-card";
import MenuButton from "./_component/menu-btn";
import Icon from "react-native-vector-icons/Feather";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";

const HomeScreen = () => {
  const [pushToken, setPushToken] = useState("");

  const menuItems = [
    { id: 1, title: "Assignment", icon: "book-open", url: "/assignment" },
    { id: 2, title: "Assignments", icon: "clipboard" },
    { id: 3, title: "Holidays", icon: "calendar" },
    { id: 4, title: "Time Table", icon: "clock" },
    { id: 5, title: "Result", icon: "file-text" },
    { id: 6, title: "DateSheet", icon: "calendar" },
    { id: 7, title: "Syllabus", icon: "list" },
    { id: 8, title: "Notices", icon: "bell" },
    { id: 9, title: "Library", icon: "book" },
    { id: 11, title: "Sports", icon: "book" },
    { id: 12, title: "Sports", icon: "book" },
    { id: 13, title: "Sports", icon: "book" },
    { id: 14, title: "Sports", icon: "book" },
    { id: 15, title: "Sports", icon: "book" },
    { id: 16, title: "Sports", icon: "book" },
    { id: 17, title: "Sports", icon: "book" },
    { id: 18, title: "Sports", icon: "book" },
    { id: 19, title: "Sports", icon: "book" },
  ];

  useEffect(() => {
    // Request permission to show push notifications
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to receive notifications was denied");
      }
      console.log(status);
    }

    // Get the push token only after permission is granted
    async function getPushToken() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status === "granted") {
        const token = await Notifications.getExpoPushTokenAsync();
        console.log("token", token);
        console.log("Push token:", token.data); // Save this token to send notifications later
        setPushToken(token.data); // Update state with push token
      } else {
        console.log("Notification permission not granted.");
      }
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    requestPermissions().then(() => {
      getPushToken();
    });

    // Handle incoming notifications
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!pushToken) return;
    // Send a push notification

    const sendNotification = async () => {
      const message = {
        to: pushToken,
        sound: "default",
        title: "Hello, Ayesha",
        body: "Welcome to your dashboard!",
        data: { data: "goes here" },
      };

      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const data = await response.json();
      console.log("Notification sent:", data);
    };

    const timer = setInterval(sendNotification, 5000);
    // const timer = setInterval(sendNotification, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              position: "relative",
            }}
          >
            <Text style={styles.greeting}>Hi Ayesha</Text>
            <Icon
              onPress={() => router.push("/notification")}
              name="bell"
              size={28}
              color="black"
            />
            <Text
              style={{
                position: "absolute",
                top: -7,
                left: 138,
                backgroundColor: "#4267B2",
                color: "white",
                borderRadius: 50,
                padding: 3,
                cursor: "pointer",
              }}
            >
              12
            </Text>
          </View>
          <Text style={styles.classInfo}>Class X-A | Roll no. 12</Text>
        </View>
        <Image
          source={{
            uri: "https://th.bing.com/th/id/R.3bcbeff4ee0abb81ef150c9ea7e35730?rik=t3aMo1m4uUQi6g&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2010%2f05%2ffree-stock-photos-people_102217.jpg&ehk=vGjIrntn5QyP%2fIXY2Ei7Iiz4%2fy%2byXvP8I8j0XxemwjI%3d&risl=&pid=ImgRaw&r=0",
          }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.statusContainer}>
        <StatusCard title="Attendance" value="90.02%" />
        <StatusCard title="Fees Due" value="600$" />
      </View>

      {/* Scrollable Menu Items */}
      <ScrollView
        style={styles.menuContainer}
        contentContainerStyle={styles.menuGrid}
        keyboardShouldPersistTaps="handled"
      >
        {menuItems.map((item, index) => (
          <MenuButton
            key={item.id + index}
            title={item.title}
            icon={item.icon}
            onPress={() => router.push("/assignment")}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  classInfo: {
    fontSize: 14,
    color: "#666",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 12,
    padding: 10,
  },
  menuContainer: {
    flex: 1,
  },
  menuGrid: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20, // Added space for scrolling
  },
});

export default HomeScreen;
