import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import NotificationItem  from "./types";

interface NotificationCardProps {
  notification: NotificationItem;
  onPress: (id: string) => void;
}

 const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
}) => {
  const { id, title, message, timestamp, type, isRead } = notification;

  const getTypeColor = () => {
    switch (type) {
      case "info":
        return "#3498db";
      case "success":
        return "#2ecc71";
      case "warning":
        return "#f1c40f";
      case "error":
        return "#e74c3c";
      default:
        return "#3498db";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, !isRead && styles.unread]}
      onPress={() => onPress(id)}
    >
      <View style={[styles.indicator, { backgroundColor: getTypeColor() }]} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unread: {
    backgroundColor: "#f8f9fa",
  },
  indicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
});


export default NotificationCard;