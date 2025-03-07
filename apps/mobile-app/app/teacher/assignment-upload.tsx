import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { useUser } from "@/context/context";

const AssignmentUploadScreen = () => {
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { user } = useUser();
  console.log("user", user);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result.canceled || !result.assets) return;
      setSelectedFile(result.assets[0].name);
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>📂 Upload Assignment</Text>

        <TextInput
          style={styles.input}
          placeholder="Assignment Title"
          placeholderTextColor="#666"
          value={assignmentTitle}
          onChangeText={setAssignmentTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Assignment Description"
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Deadline (YYYY-MM-DD)"
          placeholderTextColor="#666"
          value={deadline}
          onChangeText={setDeadline}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <FontAwesome5 name="upload" size={20} color="#fff" />
          <Text style={styles.buttonText}>Choose File</Text>
        </TouchableOpacity>

        {selectedFile && (
          <View style={styles.fileContainer}>
            <FontAwesome5 name="file-alt" size={18} color="green" />
            <Text style={styles.fileText}>{selectedFile}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Assignment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: { height: 80, textAlignVertical: "top" },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e9f5e9",
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
  },
  fileText: { fontSize: 16, marginLeft: 8, color: "#28a745" },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default AssignmentUploadScreen;
