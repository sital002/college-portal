import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const MenuButton = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={menuStyles.container} onPress={onPress}>
    <View style={menuStyles.iconContainer}>
      <Icon name={icon} size={24} color="#fff" />
    </View>
    <Text style={menuStyles.title}>{title}</Text>
  </TouchableOpacity>
);

const menuStyles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "#4267B2",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default MenuButton;
