import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./style";

interface SubmitButtonProps {
  onPress: () => void;
  title: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onPress,
  title,
}) => (
  <TouchableOpacity style={styles.submitButton} onPress={onPress}>
    <Text style={styles.submitButtonText}>{title}</Text>
  </TouchableOpacity>
);
