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

const AssignmentUploadForm: React.FC = () => {
  const [selectedFile, setSelectedFile] =
    useState<ImagePicker.ImagePickerAsset>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilePick = async () => {
    try {
      setError(null);
      setLoading(true);

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access media library was denied");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedFile(result.assets[0]);
      }
    } catch (err) {
      setError("An error occurred while picking the file");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setError("Please upload a file before submitting");
      return;
    }

    console.log({ file: selectedFile });
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
