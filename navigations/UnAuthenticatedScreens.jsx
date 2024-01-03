import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { colors, fontsize } from "../constants/theme";
import { Login, Signup } from "../screens/UnAuthenticatedScreens";

const Stack = createNativeStackNavigator();

export default function UnAuthenticatedScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTintColor: colors.primaryWhiteHex,
        headerStyle: { backgroundColor: colors.primaryBlack },
        contentStyle: { backgroundColor: colors.secondaryDarkGreyHex },
        headerTitleAlign: "center",
        headerTitleStyle: { fontFamily: "bold", fontSize: fontsize.size_24 },
      }}
    >
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Sign - Up" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Log - In" }}
      />
    </Stack.Navigator>
  );
}
