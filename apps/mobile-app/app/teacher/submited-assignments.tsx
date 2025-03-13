import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

// Types
type Assignment = {
  id: string;
  studentName: string;
  title: string;
  submittedDate: string;
  content: string;
  attachments?: string[];
  marks?: number;
  feedback?: string;
  status: "pending" | "graded";
};

const AssignmentReviewScreen: React.FC = () => {
  // Sample data - in a real app this would come from an API
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      studentName: "Emma Thompson",
      title: "History Essay: World War II",
      submittedDate: "2023-10-15",
      content:
        "This essay explores the major causes and effects of World War II...",
      attachments: ["essay.pdf", "references.docx"],
      status: "pending",
    },
    {
      id: "2",
      studentName: "Michael Chen",
      title: "Math Problem Set: Calculus",
      submittedDate: "2023-10-14",
      content:
        "Solutions to differential equations and integration problems...",
      attachments: ["solutions.pdf"],
      status: "pending",
    },
    {
      id: "3",
      studentName: "Sarah Johnson",
      title: "Science Lab Report: Photosynthesis",
      submittedDate: "2023-10-12",
      content:
        "Experimental results and analysis of photosynthesis in different light conditions...",
      attachments: ["lab_report.pdf", "data.xlsx"],
      status: "pending",
    },
    {
      id: "4",
      studentName: "David Wilson",
      title: "English Literature Analysis",
      submittedDate: "2023-10-10",
      content: 'Critical analysis of themes in "To Kill a Mockingbird"...',
      status: "pending",
    },
    {
      id: "5",
      studentName: "Aisha Patel",
      title: "Geography Project: Climate Change",
      submittedDate: "2023-10-09",
      content:
        "Research on the effects of climate change in coastal regions...",
      attachments: ["presentation.pptx", "research.pdf"],
      status: "pending",
    },
  ]);

  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const openAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setMarks(assignment.marks?.toString() || "");
    setFeedback(assignment.feedback || "");
    setModalVisible(true);
    setErrorMessage("");
  };

  const submitGrade = () => {
    if (
      !marks ||
      isNaN(Number(marks)) ||
      Number(marks) < 0 ||
      Number(marks) > 100
    ) {
      setErrorMessage("Please enter a valid mark between 0 and 100");
      return;
    }

    if (selectedAssignment) {
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === selectedAssignment.id
          ? {
              ...assignment,
              marks: Number(marks),
              feedback,
              status: "graded" as const,
            }
          : assignment
      );

      setAssignments(updatedAssignments);
      setModalVisible(false);
      setSelectedAssignment(null);
    }
  };

  const renderAssignmentItem = ({ item }: { item: Assignment }) => (
    <TouchableOpacity
      style={styles.assignmentCard}
      onPress={() => openAssignment(item)}
      activeOpacity={0.7}
    >
      <View style={styles.assignmentHeader}>
        <Text style={styles.studentName}>{item.studentName}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === "graded" ? styles.gradedBadge : styles.pendingBadge,
          ]}
        >
          <Text style={styles.statusText}>
            {item.status === "graded" ? "Graded" : "Pending"}
          </Text>
        </View>
      </View>

      <Text style={styles.assignmentTitle}>{item.title}</Text>

      <View style={styles.assignmentFooter}>
        <Text style={styles.dateText}>Submitted: {item.submittedDate}</Text>
        {item.status === "graded" && (
          <Text style={styles.marksText}>Marks: {item.marks}/100</Text>
        )}
      </View>

      {item.attachments && item.attachments.length > 0 && (
        <View style={styles.attachmentsContainer}>
          <Text style={styles.attachmentsLabel}>Attachments: </Text>
          <Text style={styles.attachmentsText}>
            {item.attachments.join(", ")}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Submitted Assignments</Text>
        <Text style={styles.headerSubtitle}>
          {assignments.filter((a) => a.status === "pending").length} pending •{" "}
          {assignments.filter((a) => a.status === "graded").length} graded
        </Text>
      </View>

      <FlatList
        data={assignments}
        renderItem={renderAssignmentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedAssignment && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      {selectedAssignment.title}
                    </Text>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.studentInfoContainer}>
                    <Text style={styles.studentInfoLabel}>Student:</Text>
                    <Text style={styles.studentInfoValue}>
                      {selectedAssignment.studentName}
                    </Text>
                  </View>

                  <View style={styles.studentInfoContainer}>
                    <Text style={styles.studentInfoLabel}>Submitted:</Text>
                    <Text style={styles.studentInfoValue}>
                      {selectedAssignment.submittedDate}
                    </Text>
                  </View>

                  <View style={styles.contentContainer}>
                    <Text style={styles.contentLabel}>Assignment Content:</Text>
                    <Text style={styles.contentText}>
                      {selectedAssignment.content}
                    </Text>
                  </View>

                  {selectedAssignment.attachments && (
                    <View style={styles.attachmentsDetailContainer}>
                      <Text style={styles.attachmentsDetailLabel}>
                        Attachments:
                      </Text>
                      {selectedAssignment.attachments.map(
                        (attachment, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.attachmentItem}
                            activeOpacity={0.7}
                          >
                            <Text style={styles.attachmentItemText}>
                              {attachment}
                            </Text>
                          </TouchableOpacity>
                        )
                      )}
                    </View>
                  )}

                  <View style={styles.gradingContainer}>
                    <Text style={styles.gradingTitle}>Assignment Grading</Text>

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Marks (out of 100):</Text>
                      <TextInput
                        style={styles.marksInput}
                        value={marks}
                        onChangeText={setMarks}
                        keyboardType="numeric"
                        placeholder="Enter marks"
                        maxLength={3}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Feedback:</Text>
                      <TextInput
                        style={styles.feedbackInput}
                        value={feedback}
                        onChangeText={setFeedback}
                        placeholder="Enter feedback for student"
                        multiline
                        numberOfLines={4}
                      />
                    </View>

                    {errorMessage ? (
                      <Text style={styles.errorText}>{errorMessage}</Text>
                    ) : null}

                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={submitGrade}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.submitButtonText}>Submit Grade</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
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
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#212529",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  assignmentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  assignmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: "#fff3cd",
  },
  gradedBadge: {
    backgroundColor: "#d1e7dd",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 12,
  },
  assignmentFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#6c757d",
  },
  marksText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#198754",
  },
  attachmentsContainer: {
    flexDirection: "row",
    marginTop: 8,
    flexWrap: "wrap",
  },
  attachmentsLabel: {
    fontSize: 14,
    color: "#495057",
    fontWeight: "500",
  },
  attachmentsText: {
    fontSize: 14,
    color: "#0d6efd",
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212529",
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#212529",
    lineHeight: 24,
  },
  studentInfoContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  studentInfoLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#495057",
    width: 100,
  },
  studentInfoValue: {
    fontSize: 15,
    color: "#212529",
    flex: 1,
  },
  contentContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  contentLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
  },
  contentText: {
    fontSize: 15,
    color: "#212529",
    lineHeight: 22,
  },
  attachmentsDetailContainer: {
    marginBottom: 20,
  },
  attachmentsDetailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
  },
  attachmentItem: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  attachmentItemText: {
    fontSize: 14,
    color: "#0d6efd",
  },
  gradingContainer: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  gradingTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
  },
  marksInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  feedbackInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 100,
  },
  errorText: {
    color: "#dc3545",
    fontSize: 14,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#0d6efd",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AssignmentReviewScreen;
