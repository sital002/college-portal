import { StyleSheet, Text, View } from "react-native";

const StatusCard = ({ title, value }:{title:string,value:string}) => (
  <View style={statusStyles.container}>
    <Text style={statusStyles.title}>{title}</Text>
    <Text style={statusStyles.value}>{value}</Text>
  </View>
);

const statusStyles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
    width: "48%",
  },
  title: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
});

export default StatusCard