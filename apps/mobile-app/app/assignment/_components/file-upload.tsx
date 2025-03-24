import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./style";
import { DocumentPickerAsset } from "expo-document-picker";

interface FileUploadProps {
  selectedFile?: DocumentPickerAsset;
  onFilePick: () => void;
  onFileRemove: () => void;
  loading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  selectedFile,
  onFilePick,
  onFileRemove,
  loading,
}) => {
  const isImage = selectedFile?.mimeType?.startsWith("image/");

  return (
    <View style={styles.uploadSection}>
      <Text style={styles.label}>Assignment File</Text>
      {!selectedFile ? (
        <TouchableOpacity
          style={[styles.uploadContainer, ]}
          onPress={onFilePick}
          disabled={loading}
        >
          <MaterialIcons name="cloud-upload" size={32} color="#6B7280" />
          <Text style={styles.uploadText}>Upload Assignment File</Text>
          {loading && (
            <ActivityIndicator style={styles.loader} color="#4F46E5" />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.filePreview}>
          {isImage && selectedFile.uri && (
            <Image
              source={{ uri: selectedFile.uri }}
              style={styles.previewImage}
            />
          )}
          <View style={styles.fileInfo}>
            <Text style={styles.fileName} numberOfLines={1}>
              {selectedFile.name || "Selected file"}
            </Text>
            <TouchableOpacity
              onPress={onFileRemove}
              style={styles.removeButton}
            >
              <MaterialIcons name="close" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default FileUpload;
