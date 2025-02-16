import React from "react";
import { StyleSheet, Text } from "react-native";
import { styles } from "./style";

interface ErrorMessageProps {
  error: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) =>
  error ? <Text style={styles.errorText}>{error}</Text> : null;
