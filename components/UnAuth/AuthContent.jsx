import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";

import FlatButton from "../UI/FlatButton";
import Form from "./Form";
import { colors } from "../../constants/theme";

export default function AuthContent({ isLogin }) {
  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.mainContainer}>
          <View style={styles.formContainer}>
            <Form isLogin={isLogin} />
          </View>
          <View style={styles.buttonContainer}>
            <FlatButton
              message={
                isLogin ? "Dont have an Account?" : "Already have an Account?"
              }
              buttonMessage={isLogin ? "Sign Up" : "Log In"}
              isLogin={isLogin}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 2,
    marginTop: 50,
    marginHorizontal: 30,
    backgroundColor: colors.primaryBlack,
    shadowColor: "black",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    borderRadius: 8,
  },
  formContainer: { width: "100%" },
  buttonContainer: {
    marginBottom: 15,
  },
});
