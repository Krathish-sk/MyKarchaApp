import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { colors, fontsize } from "../../constants/theme";

export default function Input({
  label,
  updateValue,
  keyType,
  value,
  secure,
  isInvalid,
}) {
  return (
    <View style={styles.mainContainer}>
      <Text
        style={[
          styles.label,
          isInvalid ? { color: "red" } : { color: colors.primaryWhiteHex },
        ]}
      >
        {label}
      </Text>
      <TextInput
        style={styles.input}
        secureTextEntry={secure}
        value={value}
        keyboardType={keyType}
        onChangeText={updateValue}
        autoCapitalize={"none"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
  },
  label: {
    color: colors.primaryWhiteHex,
    fontFamily: "medium",
    fontSize: fontsize._18,
  },
  input: {
    width: "90%",
    padding: 10,
    backgroundColor: colors.primaryLightGreyHex,
    borderRadius: 8,
    color: colors.secondaryLightGreyHex,
    fontFamily: "medium",
    fontSize: fontsize.size_18,
  },
});
