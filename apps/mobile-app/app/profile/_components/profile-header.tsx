import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./style";

// Types
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  address: string;
  birthDate: string;
  avatar: string;
  occupation: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

const ProfileHeader: React.FC<{
  profile: UserProfile;
  onEditPress: () => void;
}> = ({ profile, onEditPress }) => (
  <LinearGradient
    colors={["#4c669f", "#3b5998", "#192f6a"]}
    style={styles.headerContainer}
  >
    <View style={styles.headerContent}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: profile.avatar || "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.name}>
        {profile.firstName} {profile.lastName}
      </Text>
      <Text style={styles.occupation}>{profile.occupation}</Text>
      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <MaterialIcons name="edit" size={20} color="white" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);


export default ProfileHeader;   