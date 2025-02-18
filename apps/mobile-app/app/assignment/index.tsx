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
import { InputField } from "./_components/input-field";
import { FileUpload } from "./_components/file-upload";
import { ErrorMessage } from "./_components/error-message";
import { SubmitButton } from "./_components/submit-button";
import { styles } from "./_components/style";

interface FormData {
  chapterName: string;
  teacherName: string;
  lessonName: string;
  subject: string;
  grade: string;
  dueDate: string;
  description: string;
}

const AssignmentUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    chapterName: "",
    teacherName: "",
    lessonName: "",
    subject: "",
    grade: "",
    dueDate: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] =
    useState<ImagePicker.ImagePickerAsset>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
    const requiredFields: (keyof FormData)[] = [
      "chapterName",
      "teacherName",
      "lessonName",
      "subject",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    console.log({ ...formData, file: selectedFile });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Upload Assignment</Text>

          {Object.entries(formData).map(([field, value]) => (
            <InputField
              key={field}
              label={
                field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")
              }
              value={value}
              onChangeText={(text) =>
                handleInputChange(field as keyof FormData, text)
              }
              placeholder={`Enter ${field.toLowerCase().replace(/([A-Z])/g, " $1")}`}
              multiline={field === "description"}
            />
          ))}

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
