import { ScrollView, StyleSheet } from "react-native";
import { styles } from "./_components/style";
import EditProfileForm from "./_components/profile-update-form";
import ProfileInfo from "./_components/profile-info";
import SocialLinks from "./_components/social-link";
import ProfileHeader from "./_components/profile-header";
import { UserProfile } from "./_components/type";
import { useState } from "react";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: "1",
    firstName: "Ramlal",
    lastName: "Choudhary",
    email: "ramlalchod@gmail.com",
    phone: "+977987654321",
    bio: "I am top lover",
    address: "Bharatpur-9,Chitwan",
    birthDate: "1990-01-01",
    avatar:
      "https://th.bing.com/th/id/R.3bcbeff4ee0abb81ef150c9ea7e35730?rik=t3aMo1m4uUQi6g&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2010%2f05%2ffree-stock-photos-people_102217.jpg&ehk=vGjIrntn5QyP%2fIXY2Ei7Iiz4%2fy%2byXvP8I8j0XxemwjI%3d&risl=&pid=ImgRaw&r=0",
    occupation: "Student",
    socialLinks: {
      linkedin: "linkedin.com/johndoe",
      twitter: "twitter.com/johndoe",
      github: "github.com/johndoe",
    },
  });

  const handleSave = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container}>
      {!isEditing ? (
        <>
          <ProfileHeader
            profile={profile}
            onEditPress={() => setIsEditing(true)}
          />
          <ProfileInfo profile={profile} />
          <SocialLinks links={profile.socialLinks} />
        </>
      ) : (
        <EditProfileForm
          profile={profile}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </ScrollView>
  );
};

export default Profile;
