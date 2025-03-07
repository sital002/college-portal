import { ScrollView, StyleSheet } from "react-native";
import { styles } from "./_components/style";
import EditProfileForm from "./_components/profile-update-form";
import ProfileInfo from "./_components/profile-info";
import SocialLinks from "./_components/social-link";
import ProfileHeader from "./_components/profile-header";
import { UserProfile } from "./_components/type";
import { useState } from "react";
import { User, useUser } from "@/context/context";
import { apiClient } from "@/config/api";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { user, setUser } = useUser();

  const handleSave = async (updatedProfile: User) => {
    try {
      const response = await apiClient.post<AxiosResponse>(
        "/user/update",
        updatedProfile
      );
      setUser(response.data.data);
      setIsEditing(false);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
        return;
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {!isEditing ? (
        <>
          <ProfileHeader
            profile={user as User}
            onEditPress={() => setIsEditing(true)}
          />
          <ProfileInfo profile={user as User} />
          {/* <SocialLinks links={profile.socialLinks} /> */}
        </>
      ) : (
        <EditProfileForm
          profile={user as User}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </ScrollView>
  );
};

export default Profile;
