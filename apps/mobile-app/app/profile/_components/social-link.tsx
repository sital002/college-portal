import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { UserProfile } from "./type";

const SocialLinks: React.FC<{ links: UserProfile["socialLinks"] }> = ({
  links,
}) => (
  <View style={styles.socialContainer}>
    <Text style={styles.socialTitle}>Social Links</Text>
    <View style={styles.socialLinks}>
      {Object.entries(links).map(([platform, url]) => (
        <TouchableOpacity key={platform} style={styles.socialButton}>
          <MaterialIcons
            name={platform.toLowerCase() as any}
            size={24}
            color="#4c669f"
          />
          <Text style={styles.socialButtonText}>{platform}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);


export default SocialLinks;