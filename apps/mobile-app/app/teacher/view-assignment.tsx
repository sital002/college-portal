import { apiClient } from "@/config/api";
import { FontAwesome5 } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

type FileType = {
  uri: string;
  name: string;
  type: string;
};

// Define the Assignment type with added file and room fields
interface Assignment {
  id: string;
  title: string;
  description: string;
  deadLine: string;
  attachments: string | FileType; // Added file field
  room: string; // Added room field
}

const AssignmentListScreen: React.FC = () => {
  // Sample initial data with file and room fields
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "React Native Basics",
      description: "Learn the fundamentals of React Native development",
      deadLine: "2025-03-20",
      attachments: "react_native_basics.pdf",
      room: "Lab 101",
    },
    {
      id: "2",
      title: "TypeScript Integration",
      description: "Implement TypeScript in a React Native project",
      deadLine: "2025-03-25",
      attachments: "typescript_guide.docx",
      room: "Room 203",
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      description: "Study and apply UI/UX design principles in mobile apps",
      deadLine: "2025-04-01",
      attachments: "ui_ux_principles.pptx",
      room: "Design Studio",
    },
  ]);

  // State for modals and form data - updated with file and room
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [formData, setFormData] = useState<Omit<Assignment, "id">>({
    title: "",
    description: "",
    deadLine: "",
    attachments: "",
    room: "",
  });

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const response = await apiClient.get("/assignments/view/52");

        console.log("The response", response.data.data);
        setAssignments(response.data.data);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log("The error is", error.response?.data.error);
          return;
        }
        console.error("Error uploading assignment:", error);
      }
    };

    getAssignments();
  }, []);

  // Handle viewing an assignment
  const handleView = async (assignment: Assignment) => {
    setViewModalVisible(true);
    try {
      const response = await apiClient.get("/assignments/viewe/52");

      console.log("The response", response.data);
      //   setSelectedAssignment(assignment);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("The error is", error.response?.data.error);
        return;
      }
      console.error("Error uploading assignment:", error);
    }
  };

  // Handle updating an assignment
  const handleUpdate = async (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description,
      deadLine: assignment.deadLine,
      attachments: assignment.attachments,
      room: assignment.room,
    });
    setUpdateModalVisible(true);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result.canceled || !result.assets) return;

      const file = result.assets[0];
      setFormData({
        ...formData,
        attachments: {
          uri: file.uri,
          name: file.name,
          type: file.mimeType as string,
        },
      });
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  // Handle deleting an assignment
  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Assignment",
      "Are you sure you want to delete this assignment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setAssignments(assignments.filter((item) => item.id !== id));
          },
          style: "destructive",
        },
      ]
    );
  };

  // Save updated assignment
  const saveUpdatedAssignment = async () => {
    if (!selectedAssignment) return;

    const updatedAssignments = assignments.map((item) =>
      item.id === selectedAssignment.id ? { ...item, ...formData } : item
    );

    const updateFormData = new FormData();
    updateFormData.append("title", formData.title);
    updateFormData.append("description", formData.description);
    updateFormData.append("deadLine", formData.deadLine);
    updateFormData.append("file", formData.attachments as unknown as Blob);
    updateFormData.append("room", formData.room);

    setUpdateModalVisible(true);
    try {
      console.log("ready for update>>>>", updateFormData);
      const response = await apiClient.put(
        "/assignments/update/" + selectedAssignment.id,
        updateFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("The response", response.data);
      //   setSelectedAssignment(assignment);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("The error is", error.response?.data.error);
        return;
      }
      console.error("Error uploading assignment:", error);
    }

    setAssignments(updatedAssignments);
    setUpdateModalVisible(false);
  };

  // Render each assignment item
  const renderItem = ({ item }: { item: Assignment }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.deadLine}>Due: {item.deadLine}</Text>
        <Text style={styles.roomText}>Room: {item.room}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.viewButton]}
          onPress={() => handleView(item)}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.updateButton]}
          onPress={() => handleUpdate(item)}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <FlatList
        data={assignments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* View Assignment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={viewModalVisible}
        onRequestClose={() => setViewModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Assignment Details</Text>

            {selectedAssignment && (
              <>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Id:</Text>
                  <Text style={styles.detailValue}>
                    {selectedAssignment.id}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Title:</Text>
                  <Text style={styles.detailValue}>
                    {selectedAssignment.title}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Due Date:</Text>
                  <Text style={styles.detailValue}>
                    {selectedAssignment.deadLine}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Room:</Text>
                  <Text style={styles.detailValue}>
                    {selectedAssignment.room}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>File:</Text>
                  <Text style={styles.detailValue}>
                    {selectedAssignment.attachments as string}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Description:</Text>
                  <Text style={styles.detailValue}>
                    {selectedAssignment.description}
                  </Text>
                </View>
              </>
            )}

            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setViewModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Update Assignment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Assignment</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={(text) => {
                  setFormData({ ...formData, title: text });
                }}
                placeholder="Assignment title"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Due Date</Text>
              <TextInput
                style={styles.input}
                value={formData.deadLine}
                onChangeText={(text) =>
                  setFormData({ ...formData, deadLine: text })
                }
                placeholder="YYYY-MM-DD"
              />
            </View>

            {/* Added Room field */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Room</Text>
              <TextInput
                style={styles.input}
                value={formData.room}
                onChangeText={(text) =>
                  setFormData({ ...formData, room: text })
                }
                placeholder="Room number or name"
              />
            </View>

            {/* Added File field */}
            <View>
              <Text style={styles.inputLabel}>File</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={pickDocument}
              >
                <FontAwesome5 name="upload" size={20} color="#fff" />
                <Text style={styles.buttonText}>Choose File</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: "green",
              }}
            >
              {(formData.attachments as FileType).name ||
                (selectedAssignment?.attachments as string)}
            </Text>
            {/* <TextInput
                style={styles.input}
                value={formData.attachments}
                onChangeText={(text) =>
                  setFormData({ ...formData, attachments: text })
                }
                placeholder="File name or path"
              /> */}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                placeholder="Assignment description"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setUpdateModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={saveUpdatedAssignment}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    backgroundColor: "#4a6fa5",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  deadLine: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  roomText: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  viewButton: {
    backgroundColor: "#4a6fa5",
  },
  updateButton: {
    backgroundColor: "#4caf50",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  closeButton: {
    backgroundColor: "#4a6fa5",
    alignSelf: "center",
    paddingHorizontal: 24,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#4caf50",
    flex: 1,
  },
  cancelButton: {
    backgroundColor: "#757575",
    flex: 1,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "85%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  detailRow: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  modalButtonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
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
});

export default AssignmentListScreen;
