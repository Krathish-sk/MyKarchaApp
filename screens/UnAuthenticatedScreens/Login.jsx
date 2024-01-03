import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import Form from "../../components/UnAuth/Form";
import { colors } from "../../constants/theme";
import FlatButton from "../../components/UI/FlatButton";

export default function Login() {
  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.mainContainer}>
          <View style={styles.formContainer}>
            <Form isLogin={false} />
          </View>
          <View style={styles.buttonContainer}>
            <FlatButton
              message={"Dont have an Account?"}
              buttonMessage="Sign Up"
              isLogin={true}
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
