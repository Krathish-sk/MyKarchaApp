import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { fontsize } from "../../constants/theme";

export default function Button({ color, onPress, text, bgcolor }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bgcolor,
        borderRadius: 8,
        width: 100,
        padding: 5,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "medium",
          fontSize: fontsize.size_20,
          color: color,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
