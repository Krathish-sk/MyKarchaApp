import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors, fontsize } from "../../constants/theme";

export default function FlatButton({ message, buttonMessage, isLogin }) {
  const navigation = useNavigation();
  function handleNavigation() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={handleNavigation}>
        <Text style={styles.buttonMessage}>{buttonMessage}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  message: {
    fontSize: fontsize.size_12,
    color: colors.primaryWhiteHex,
    fontFamily: "regular",
  },
  buttonMessage: {
    color: colors.primary,
    fontFamily: "medium",
    fontSize: fontsize.size_14,
  },
});
