import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Linking,
} from "react-native";
import  Icon  from "react-native-vector-icons/FontAwesome";

interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
  fileUrl?: string; // Optional file URL for downloading
}

const notices: Notice[] = [
  {
    id: "1",
    title: "Exam Schedule Update",
    description:
      "Final exams are postponed by a week. Check the website for updated schedules.",
    date: "Feb 20, 2025",
    fileUrl: "https://example.com/exam-schedule.pdf", // Example file URL
  },
  {
    id: "2",
    title: "Holiday Announcement",
    description:
      "School remains closed on March 1st due to a national holiday.",
    date: "Feb 15, 2025",
  },
  {
    id: "3",
    title: "New Course Available",
    description: "Enrollments open for the new AI course. Seats are limited!",
    date: "Feb 10, 2025",
  },
];

const NoticeCard: React.FC<{ notice: Notice; onPress: () => void }> = ({
  notice,
  onPress,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.title}>{notice.title}</Text>
    <Text style={styles.description}>{notice.description}</Text>
    <Text style={styles.date}>{notice.date}</Text>
  </TouchableOpacity>
);

const NoticePage: React.FC = () => {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const handleDownload = (fileUrl: string) => {
    Linking.openURL(fileUrl).catch((err) =>
      console.error("Error opening file", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notices</Text>
      <FlatList
        data={notices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoticeCard notice={item} onPress={() => setSelectedNotice(item)} />
        )}
      />

      {/* Modal for Notice Details */}
      <Modal visible={!!selectedNotice} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedNotice && (
              <>
                <Text style={styles.modalTitle}>{selectedNotice.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedNotice.description}
                </Text>
                <Text style={styles.modalDate}>{selectedNotice.date}</Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedNotice(null)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                {/* Conditional rendering of Download File Button */}
                {selectedNotice.fileUrl && (
                  <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={() =>
                      handleDownload(selectedNotice.fileUrl as string)
                    }
                  >
                    <Icon name="download" size={15} color="#FFF" />
                  </TouchableOpacity>
                )}

              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#1F2937",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "right",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDate: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  downloadButton: {
    backgroundColor: "#10B981",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  downloadButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NoticePage;
