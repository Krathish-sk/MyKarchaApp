import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useContext, useEffect } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { ExpensesContext } from "../../store/expense-context";
import { colors } from "../../constants/theme";
import ExpenseButton from "../../components/UI/ExpenseButton";
import CatItems from "../../components/Auth/CatItems";

export default function CategoriesScreen() {
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.mainContainer, { marginBottom: bottomTabBarHeight }]}>
      <CatItems />
      <ExpenseButton />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primaryDarkGreyHex,
    borderWidth: 1,
  },
});
