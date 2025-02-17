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

const EditProfileForm: React.FC<{
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}> = ({ profile, onSave, onCancel }) => {
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setEditedProfile({ ...editedProfile, avatar: result.assets[0].uri });
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
            source={{ uri: editedProfile.avatar }}
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
        />
        <Input
          label="Phone"
          value={editedProfile.phone}
          onChangeText={(text) =>
            setEditedProfile({ ...editedProfile, phone: text })
          }
          keyboardType="phone-pad"
        />
        <Input
          label="Occupation"
          value={editedProfile.occupation}
          onChangeText={(text) =>
            setEditedProfile({ ...editedProfile, occupation: text })
          }
        />
        <Input
          label="Bio"
          value={editedProfile.bio}
          onChangeText={(text) =>
            setEditedProfile({ ...editedProfile, bio: text })
          }
          multiline
          numberOfLines={4}
        />
        <Input
          label="Address"
          value={editedProfile.address}
          onChangeText={(text) =>
            setEditedProfile({ ...editedProfile, address: text })
          }
          multiline
        />

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
