import * as ImagePicker from "expo-image-picker";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import Input from "./input";
import { styles } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { UserProfile } from "./type";
import { User } from "@/context/context";

const EditProfileForm: React.FC<{
  profile: User;
  onSave: (profile: User) => void;
  onCancel: () => void;
}> = ({ profile, onSave, onCancel }) => {
  const [editedProfile, setEditedProfile] = useState<User>(profile);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setEditedProfile({
        ...editedProfile,
        profilePicture: result.assets[0].uri,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.editFormContainer}
    >
      <ScrollView>
        <TouchableOpacity
          style={styles.editAvatarContainer}
          onPress={pickImage}
        >
          <Image
            source={{ uri: editedProfile.profilePicture }}
            style={styles.editAvatar}
          />
          <View style={styles.editAvatarOverlay}>
            <MaterialIcons name="camera-alt" size={24} color="white" />
          </View>
        </TouchableOpacity>

        <Input
          label="First Name"
          value={editedProfile.firstName}
          onChangeText={(text) =>
            setEditedProfile({ ...editedProfile, firstName: text })
          }
        />
        <Input
          label="Last Name"
          value={editedProfile.lastName}
          onChangeText={(text) =>
            setEditedProfile({ ...editedProfile, lastName: text })
          }
        />
        <Input
          label="Email"
          value={editedProfile.email}
          onChangeText={(text) =>
            setEditedProfile({ ...editedProfile, email: text })
          }
          keyboardType="email-address"
          readOnly
        />
        <Input
          label="Phone"
          value={editedProfile.phoneNumber}
          onChangeText={(text) =>
            setEditedProfile({ ...editedProfile, phoneNumber: text })
          }
          keyboardType="phone-pad"
        />
        <Input
          label="Occupation"
          value={editedProfile.role}
          onChangeText={(text) =>
            setEditedProfile({ ...editedProfile, role: text })
          }
        />

        {/* <Input
          label="Address"
          value={editedProfile.address}
          onChangeText={(text) =>
            setEditedProfile({ ...editedProfile, address: text })
          }
          multiline
        /> */}

        <View style={styles.editButtonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={() => onSave(editedProfile)}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileForm;
