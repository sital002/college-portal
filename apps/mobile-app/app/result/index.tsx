import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Result {
  id: string;
  studentName: string;
  year: string;
  rollNumber: string;
  percentage: string;
  marksheet: {
    subject: string;
    marks: number;
    fullMarks: number;
    passMarks: number;
  }[];
}

const results: Result[] = [
  {
    id: "1",
    studentName: "John Doe",
    rollNumber: "A-101",
    year: "2023",
    percentage: "85%",
    marksheet: [
      { subject: "Math", marks: 90, fullMarks: 100, passMarks: 40 },
      { subject: "Science", marks: 85, fullMarks: 100, passMarks: 40 },
      { subject: "English", marks: 80, fullMarks: 100, passMarks: 40 },
      { subject: "Math", marks: 90, fullMarks: 100, passMarks: 40 },
      { subject: "Science", marks: 85, fullMarks: 100, passMarks: 40 },
      { subject: "English", marks: 80, fullMarks: 100, passMarks: 40 },
      { subject: "Math", marks: 90, fullMarks: 100, passMarks: 40 },
      { subject: "Science", marks: 85, fullMarks: 100, passMarks: 40 },
      { subject: "English", marks: 80, fullMarks: 100, passMarks: 40 },
      { subject: "Math", marks: 90, fullMarks: 100, passMarks: 40 },
      { subject: "Science", marks: 85, fullMarks: 100, passMarks: 40 },
      { subject: "English", marks: 80, fullMarks: 100, passMarks: 40 },
    ],
  },
  {
    id: "2",
    studentName: "Jane Smith",
    rollNumber: "A-102",
    year: "2024",
    percentage: "92%",
    marksheet: [
      { subject: "Math", marks: 95, fullMarks: 100, passMarks: 40 },
      { subject: "Science", marks: 90, fullMarks: 100, passMarks: 40 },
      { subject: "English", marks: 88, fullMarks: 100, passMarks: 40 },
    ],
  },
];

const ResultPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2023");
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);

  const filteredResults = results.filter(
    (result) => result.year === selectedYear
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Results</Text>

      {/* Year Selector */}
      <Picker
        selectedValue={selectedYear}
        onValueChange={(itemValue) => setSelectedYear(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="2023" value="2023" />
        <Picker.Item label="2024" value="2024" />
      </Picker>

      {/* Results List */}
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedResult(item)}
          >
            <Text style={styles.title}>{item.studentName}</Text>
            <Text style={styles.year}>Year: {item.year}</Text>
            <Text style={styles.percentage}>Percentage: {item.percentage}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Marksheet Modal */}
      <Modal visible={!!selectedResult} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedResult && (
              <>
                {/* School Header */}
                <Text style={styles.schoolName}>XYZ International School</Text>
                <Text style={styles.schoolAddress}>Kathmandu, Nepal</Text>
                <Text style={styles.markSheetHeader}>
                  Annual Exam Marksheet
                </Text>

                {/* Student Info */}
                <View style={styles.studentInfo}>
                  <Text style={styles.infoText}>
                    Name: {selectedResult.studentName}
                  </Text>
                  <Text style={styles.infoText}>
                    Roll No: {selectedResult.rollNumber}
                  </Text>
                  <Text style={styles.infoText}>
                    Year: {selectedResult.year}
                  </Text>
                </View>

                {/* Marksheet Table */}
                <View style={styles.table}>
                  <View style={styles.tableRowHeader}>
                    <Text style={[styles.tableCell, styles.boldText]}>
                      Subject
                    </Text>
                    <Text style={[styles.tableCell, styles.boldText]}>
                      Full Marks
                    </Text>
                    <Text style={[styles.tableCell, styles.boldText]}>
                      Pass Marks
                    </Text>
                    <Text style={[styles.tableCell, styles.boldText]}>
                      Obtained
                    </Text>
                  </View>

                  {selectedResult.marksheet.map((subject, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.tableCell}>{subject.subject}</Text>
                      <Text style={styles.tableCell}>{subject.fullMarks}</Text>
                      <Text style={styles.tableCell}>{subject.passMarks}</Text>
                      <Text
                        style={[
                          styles.tableCell,
                          subject.marks < subject.passMarks
                            ? styles.failText
                            : styles.passText,
                        ]}
                      >
                        {subject.marks}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Close Button */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedResult(null)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#1F2937",
  },
  picker: { backgroundColor: "#FFF", marginBottom: 16, borderRadius: 8 },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "600", color: "#374151" },
  year: { fontSize: 14, color: "#6B7280" },
  percentage: { fontSize: 14, fontWeight: "bold", color: "#10B981" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  schoolName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    textAlign: "center",
  },
  schoolAddress: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 10,
  },
  markSheetHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 10,
  },

  studentInfo: { width: "100%", marginBottom: 10 },
  infoText: { fontSize: 16, color: "#374151", marginBottom: 5 },

  table: {
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 8,
  },
  tableCell: { flex: 1, textAlign: "center", fontSize: 16, color: "#374151" },
  boldText: { fontWeight: "bold" },
  passText: { color: "#10B981", fontWeight: "bold" },
  failText: { color: "#EF4444", fontWeight: "bold" },

  closeButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default ResultPage;
