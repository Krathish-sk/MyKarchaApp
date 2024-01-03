import { StatusBar, View, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Labrada_400Regular,
  Labrada_500Medium,
  Labrada_600SemiBold,
  Labrada_700Bold,
  Labrada_800ExtraBold,
} from "@expo-google-fonts/labrada";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors } from "./constants/theme";

import UnAuthenticatedScreens from "./navigations/UnAuthenticatedScreens";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AuthenticatedScreens from "./navigations/AuthenticatedScreens";

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
