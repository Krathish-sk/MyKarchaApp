import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../constants/theme";
import Button from "./Button";

export default function DateModal({ closeDatePickerHandler, confirmDate }) {
  const currentDate = new Date().toJSON().slice(0, 10);
  //   const [date, setDate] = useState(currentDate);
  return (
    <TouchableOpacity
      style={styles.rootContainer}
      onPress={closeDatePickerHandler}
    >
      <View style={styles.mainContainer}>
        <View style={styles.dateContainer}>
          <DatePicker
            options={{
              backgroundColor: "#090C08",
              textHeaderColor: "#FFA25B",
              textDefaultColor: "#F6E7C1",
              selectedTextColor: "#fff",
              mainColor: "#F4722B",
              textSecondaryColor: "#D6C7A1",
              borderColor: "rgba(122, 146, 165, 0.1)",
            }}
            selected={currentDate}
            maximumDate={currentDate}
            onSelectedChange={(date) => {
              confirmDate(date);
            }}
            mode="calendar"
            style={styles.datePicker}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text={"Confirm"}
            color="white"
            bgcolor={colors.primaryBlackHex}
            onPress={closeDatePickerHandler}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  dateContainer: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 180,
  },
  datePicker: {
    borderRadius: 10,
    animation: "ease-in-out",
    width: 300,
    // height: 300,
  },
});
