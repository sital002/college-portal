import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  formContainer: {
    padding: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  uploadSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  uploadContainer: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  uploadText: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
  },
  loader: {
    marginTop: 8,
  },
  filePreview: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  previewImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#F3F4F6",
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F9FAFB",
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
  },
  removeButton: {
    padding: 4,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
