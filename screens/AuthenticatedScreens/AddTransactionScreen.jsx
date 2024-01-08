import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

import { colors } from "../../constants/theme";
import DateModal from "../../components/UI/DateModal";
import Button from "../../components/UI/Button";
import { ExpensesContext } from "../../store/expense-context";
import { addTransaction } from "../../utils/transactions";

const names = [
  { label: "Groceries", value: "Groceries" },
  { label: "Food", value: "Food" },
  { label: "Entertainment", value: "Entertainment" },
];

export default function AddTransactionScreen({ closeModal }) {
  const expenseCtx = useContext(ExpensesContext);
  const [userTransacData, setUserTransacData] = useState({
    catName: "",
    amount: "",
    date: new Date().toLocaleDateString(),
    desc: "",
  });
  const [isFocus, setIsFocus] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  async function submitPressHandler() {
    if (userTransacData.amount === "" || userTransacData.desc === "") {
      Alert.alert("Validation Error", "Please enter all input fields");
      return;
    } else {
      const res = await addTransaction(userTransacData);
      expenseCtx.addCatListItem({
        amount: userTransacData.amount,
        date: userTransacData.date,
        desc: userTransacData.desc,
        catName: userTransacData.catName,
      });
      closeModal();
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <Text style={styles.headingText}>New Transaction</Text>
        <View style={styles.formContainer}>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={names}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select Catagory" : "..."}
            value={userTransacData.catName}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setUserTransacData({
                catName: item.value,
                amount: userTransacData.amount,
                date: userTransacData.date,
                desc: userTransacData.desc,
              });
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? "black" : colors.primaryHeadingText}
                name="Safety"
                size={20}
              />
            )}
          />
          <TextInput
            placeholder="Enter the amount"
            style={styles.amountInput}
            value={userTransacData.amount}
            inputMode="numeric"
            onChangeText={(text) => {
              setUserTransacData({
                amount: text,
                catName: userTransacData.catName,
                date: userTransacData.date,
                desc: userTransacData.desc,
              });
            }}
            placeholderTextColor={colors.primaryWhiteHex}
          />
          <TextInput
            placeholder="Enter the description"
            style={styles.amountInput}
            value={userTransacData.desc}
            onChangeText={(text) => {
              setUserTransacData({
                desc: text,
                catName: userTransacData.catName,
                date: userTransacData.date,
                amount: userTransacData.amount,
              });
            }}
            placeholderTextColor={colors.primaryWhiteHex}
          />
          <TouchableOpacity
            onPress={() => {
              setIsDateOpen(true);
            }}
          >
            <TextInput
              value={userTransacData.date}
              keyboardType="ascii-capable"
              editable={false}
              style={styles.amountInput}
            />
          </TouchableOpacity>
          <Modal
            visible={isDateOpen}
            animationType="fade"
            onRequestClose={() => {
              setIsDateOpen(false);
            }}
            transparent={true}
          >
            <DateModal
              closeDatePickerHandler={() => {
                setIsDateOpen(false);
              }}
              confirmDate={(item) => {
                // setUserTransacData({ date: item });
              }}
            />
          </Modal>
        </View>
        <View style={styles.submitButtonContainer}>
          <Button
            text={"Submit"}
            bgcolor={colors.primary}
            color={colors.primaryWhiteHex}
            onPress={submitPressHandler}
          />
          <AntDesign
            name="closecircle"
            color={colors.primary}
            size={26}
            onPress={closeModal}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 200,
    backgroundColor: colors.secondaryBlack,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  subContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  formContainer: {
    width: "100%",
    backgroundColor: colors.primaryLightGreyHex,
    borderRadius: 8,
    alignItems: "center",
    gap: 4,
    padding: 20,
  },
  headingText: {
    fontFamily: "semiBold",
    fontSize: 24,
    margin: 18,
    color: colors.primaryWhiteHex,
  },
  dropdown: {
    width: 200,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.primaryLightGreyHex,
    borderColor: colors.primaryHeadingText,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.primaryWhiteHex,
  },
  selectedTextStyle: {
    fontFamily: "medium",
    fontSize: 16,
    color: colors.primaryHeadingText,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  amountInput: {
    width: 200,
    fontSize: 16,
    fontFamily: "medium",
    color: colors.primaryHeadingText,
    borderWidth: 0.5,
    padding: 8,
    paddingLeft: 15,
    marginTop: 10,
    borderColor: colors.primaryHeadingText,
    borderRadius: 8,
  },
  submitButtonContainer: {
    width: "100%",
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
