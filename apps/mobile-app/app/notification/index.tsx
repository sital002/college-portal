import React, { useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import  NotificationItem  from "./_components/types";
import  NotificationHeader  from "./_components/notification-header";
import  NotificationCard  from "./_components/notification-card";

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "New Message",
      message: "You have received a new message from John Doe",
      timestamp: "2 min ago",
      type: "info",
      isRead: false,
    },
    {
      id: "2",
      title: "Payment Successful",
      message: "Your payment of $50 has been processed successfully",
      timestamp: "1 hour ago",
      type: "success",
      isRead: false,
    },
    {
      id: "3",
      title: "Low Battery Warning",
      message: "Your device battery is below 20%",
      timestamp: "2 hours ago",
      type: "warning",
      isRead: true,
    },
    {
      id: "4",
      title: "Failed Login Attempt",
      message: "Someone tried to login to your account from a new device",
      timestamp: "1 day ago",
      type: "error",
      isRead: true,
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationPress = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllRead={handleMarkAllRead}
      />
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationCard
            notification={item}
            onPress={handleNotificationPress}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    paddingVertical: 8,
  },
});

export default NotificationsScreen;
