import { StatusBar, View, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors, fontsize } from "./constants/theme";
import {
  TransactionScreen,
  CategoriesScreen,
} from "./screens/AuthenticatedScreens";
import { Login, Signup } from "./screens/UnAuthenticatedScreens";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthenticatedScreens() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Transactions" component={TransactionScreen} />
      <BottomTabs.Screen name="Category" component={CategoriesScreen} />
    </BottomTabs.Navigator>
  );
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

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? (
        <AuthenticatedScreens />
      ) : (
        <UnAuthenticatedScreens />
      )}
    </NavigationContainer>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStoredToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsLoading(false);
    }
    fetchStoredToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Loading ...</Text>
      </View>
    );
  }
  return <Navigation />;
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
    <AuthContextProvider>
      <StatusBar barStyle={"light-content"} />
      <Root />
    </AuthContextProvider>
  );
}
