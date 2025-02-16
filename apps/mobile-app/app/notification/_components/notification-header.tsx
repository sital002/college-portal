import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  onMarkAllRead,
}) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSubtitle}>
          {unreadCount} unread{" "}
          {unreadCount === 1 ? "notification" : "notifications"}
        </Text>
      </View>
      {unreadCount > 0 && (
        <TouchableOpacity style={styles.markAllButton} onPress={onMarkAllRead}>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  markAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 20,
  },
  markAllText: {
    fontSize: 14,
    color: "#3498db",
    fontWeight: "500",
  },
});


export default NotificationHeader;