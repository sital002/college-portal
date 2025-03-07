import { Text, TextInput, View } from "react-native";
import { styles } from "./style";

const Input: React.FC<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: "default" | "email-address" | "phone-pad";
  readOnly?: boolean;
}> = ({
  label,
  value,
  onChangeText,
  multiline,
  numberOfLines,
  keyboardType,
  readOnly,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        multiline && { height: numberOfLines ? numberOfLines * 40 : 100 },
      ]}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={numberOfLines}
      keyboardType={keyboardType}
      readOnly={readOnly}
    />
  </View>
);

export default Input;
