import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { styles } from "./style";
import { ClassSection } from "./type";

const ClassSelector: React.FC<{
  classes: ClassSection[];
  selectedClass: string;
  onSelect: (classId: string) => void;
}> = ({ classes, selectedClass, onSelect }) => (
  <View
    // horizontal
    // showsHorizontalScrollIndicator={false}
    style={styles.classSelector}
  >
    {classes.map((cls) => (
      <Pressable
        key={cls.id}
        style={[
          styles.classButton,
          selectedClass === cls.id && styles.selectedClassButton,
        ]}
        onPress={() => onSelect(cls.id)}
      >
        <Text
          style={[
            styles.classButtonText,
            selectedClass === cls.id && styles.selectedClassText,
          ]}
        >
          {cls.name}
        </Text>
      </Pressable>
    ))}
  </View>
);


export default ClassSelector;