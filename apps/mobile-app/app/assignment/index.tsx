import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FileUpload } from "./_components/file-upload";
import { ErrorMessage } from "./_components/error-message";
import { SubmitButton } from "./_components/submit-button";
import { styles } from "./_components/style";
import { useUser } from "@/context/context";
import { useLocalSearchParams } from "expo-router";
import { submitAssignment } from "@repo/api";
import { getToken } from "@/config/token";
import * as DocumentPicker from "expo-document-picker";

const AssignmentUploadForm: React.FC = () => {
  const [selectedFile, setSelectedFile] =
      useState<DocumentPicker.DocumentPickerAsset>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  console.log("user", user);
  const { id,room } = useLocalSearchParams();
  console.log("id", room);

  const handleFilePick = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
        if (result.canceled || !result.assets) return;
  
        const file = result.assets[0];
        setSelectedFile(file);
      } catch (error) {
        console.error("Error picking document:", error);
      }
    };

  const handleSubmit = async () => {
    console.log("submitting", selectedFile);
    if (!selectedFile) {
      setError("Please upload a file before submitting");
      return;
    }
   
    const token = await getToken();
    if (!token) return;
    console.log("id", id);
    const submit = await submitAssignment(id as string, selectedFile, room as string,token);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Upload Assignment</Text>

          <FileUpload
            selectedFile={selectedFile}
            onFilePick={handleFilePick}
            onFileRemove={() => setSelectedFile(undefined)}
            loading={loading}
          />

          <ErrorMessage error={error} />

          <SubmitButton onPress={handleSubmit} title="Submit Assignment" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AssignmentUploadForm;
