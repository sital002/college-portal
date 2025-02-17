import { Text, View } from "react-native";
import { styles } from "./style";
import InfoItem from "./info-item";
import { UserProfile } from "./type";

const ProfileInfo: React.FC<{ profile: UserProfile }> = ({ profile }) => (
  <View style={styles.infoContainer}>
    <InfoItem icon="email" label="Email" value={profile.email} />
    <InfoItem icon="phone" label="Phone" value={profile.phone} />
    <InfoItem icon="cake" label="Birthday" value={profile.birthDate} />
    <InfoItem icon="location-on" label="Address" value={profile.address} />
    <View style={styles.bioContainer}>
      <Text style={styles.bioLabel}>About Me</Text>
      <Text style={styles.bioText}>{profile.bio}</Text>
    </View>
  </View>
);


export default ProfileInfo;