import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons, MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet } from "react-native";

import { colors, fontsize } from "../constants/theme";
import {
  CategoriesScreen,
  TransactionScreen,
} from "../screens/AuthenticatedScreens";
import { AuthContext } from "../store/auth-context";
import ExpensesContextProvider from "../store/expense-context";

const BottomTabs = createBottomTabNavigator();

export default function AuthenticatedScreens() {
  const authCtx = useContext(AuthContext);
  return (
    <ExpensesContextProvider>
      <BottomTabs.Navigator
        initialRouteName="Transactions"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerTitleAlign: "center",
          headerTintColor: colors.primaryHeadingText,
          headerTitleStyle: { fontFamily: "bold", fontSize: fontsize.size_24 },
          headerStyle: { backgroundColor: colors.primaryBlack },
          tabBarShowLabel: false,
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color={colors.primary}
              onPress={() => authCtx.logout()}
            />
          ),
          tabBarStyle: styles.tabBar,
        }}
      >
        <BottomTabs.Screen
          name="Transactions"
          component={TransactionScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Octicons
                name="history"
                size={24}
                color={focused ? colors.primary : colors.secondaryLightGreyHex}
              />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Category"
          component={CategoriesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Octicons
                name="checklist"
                size={24}
                color={focused ? colors.primary : colors.secondaryLightGreyHex}
              />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </ExpensesContextProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 50,
    backgroundColor: colors.secondaryDarkGreyHex,
    opacity: 0.9,
    borderTopColor: "transparent",
    borderTopWidth: 0,
  },
});
