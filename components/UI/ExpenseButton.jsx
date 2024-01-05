import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../constants/theme";

export default function ExpenseButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
      <Ionicons
        style={styles.addIcon}
        name="add-circle"
        size={50}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    bottom: 5,
    zIndex: 1,
    alignSelf: "center",
  },
});
