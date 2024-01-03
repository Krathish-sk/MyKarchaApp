import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useFonts,
  Labrada_400Regular,
  Labrada_500Medium,
  Labrada_600SemiBold,
  Labrada_700Bold,
  Labrada_800ExtraBold,
} from "@expo-google-fonts/labrada";

import { colors, fontsize } from "./constants/theme";
import { Login, Signup } from "./screens/UnAuthenticatedScreens";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthenticatedScreens() {
  return <BottomTabs.Navigator></BottomTabs.Navigator>;
}

function UnAuthenticatedScreens() {
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
        options={{ title: "Sign up" }}
      />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <UnAuthenticatedScreens />
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: Labrada_400Regular,
    medium: Labrada_500Medium,
    semiBold: Labrada_600SemiBold,
    bold: Labrada_700Bold,
    extraBold: Labrada_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <>
        <StatusBar barStyle={"light-content"} />
        <View
          style={{ flex: 1, backgroundColor: colors.secondaryBlack }}
        ></View>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Navigation />
    </>
  );
}
