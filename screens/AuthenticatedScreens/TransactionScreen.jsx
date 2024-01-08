import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import CatItems from "../../components/Auth/CatItems";
import ExpenseButton from "../../components/UI/ExpenseButton";
import { colors } from "../../constants/theme";
import { ExpensesContext } from "../../store/expense-context";
import { getAllTransactions } from "../../utils/transactions";
import AddTransactionScreen from "./AddTransactionScreen";

export default function TransactionScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const expenseCtx = useContext(ExpensesContext);

  function addExpenseHandler() {
    setIsModalVisible((prev) => !prev);
  }

  useEffect(() => {
    async function fetchAllTransactions() {
      const response = await getAllTransactions();
      for (let i = 0; i < response.length; i++) {
        expenseCtx.addCatListItem(response[i]);
      }
    }
    fetchAllTransactions();
  }, []);

  return (
    <View style={[styles.mainContainer, { marginBottom: bottomTabBarHeight }]}>
      <View style={styles.content}>
        {/* Graph */}
        <View style={{ height: 100 }}>
          <Text style={{ color: "white" }}>Graph Content</Text>
        </View>
        {/* Transactions */}
        <CatItems item={expenseCtx.catListItems} />
      </View>
      <ExpenseButton onPress={addExpenseHandler} />
      <KeyboardAvoidingView behavior="position">
        <Modal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          animationType="slide"
          transparent={true}
        >
          <AddTransactionScreen closeModal={() => setIsModalVisible(false)} />
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primaryDarkGreyHex,
  },
  content: {
    flex: 1,
    justifyContent: "space-around",
  },
});
