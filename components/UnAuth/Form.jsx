import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import React, { useContext, useState } from "react";

import Button from "../UI/Button";
import { colors } from "../../constants/theme";
import Input from "./Input";
import { Auth } from "../../utils/Auth";
import { AuthContext } from "../../store/auth-context";

export default function Form({ isLogin }) {
  const authCtx = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmEmail, setUserConfirmEmail] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");

  const [credInValid, setCredInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function updateUserInfo(inputType, userValue) {
    switch (inputType) {
      case "email":
        setUserEmail(userValue);
        break;
      case "password":
        setUserPassword(userValue);
        break;
      case "confirmEmail":
        setUserConfirmEmail(userValue);
        break;
      case "confirmPassword":
        setUserConfirmPassword(userValue);
    }
  }

  async function loginHandler() {
    setCredInvalid({
      email: false,
      confirmEmail: false,
      confirmPassword: false,
      password: false,
    });

    userEmail.trim();
    userPassword.trim();
    userConfirmEmail.trim();
    userConfirmPassword.trim();

    const emailIsValid = userEmail.includes("@");
    const passwordIsValid = userPassword.length > 6;
    const emailAreEqual = userEmail === userConfirmEmail;
    const passwordAreEqual = userPassword === userConfirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailAreEqual || !passwordAreEqual))
    ) {
      Alert.alert("Invalid input, Please check your credentials !!");
      setCredInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmEmail: !emailIsValid || !emailAreEqual,
        confirmPassword: !passwordIsValid || !passwordAreEqual,
      });
      return;
    }

    if (isLogin) {
      const token = await Auth("login", userEmail, userPassword);
      authCtx.authenticate(token);
    } else {
      const token = await Auth("signup", userEmail, userPassword);
      authCtx.authenticate(token);
    }
    <ActivityIndicator />;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.form}>
        <Input
          label="Email Address"
          updateValue={updateUserInfo.bind(this, "email")}
          value={userEmail}
          keyType="email-address"
          isInvalid={credInValid.email}
        />
        {!isLogin && (
          <Input
            isInvalid={credInValid.confirmEmail}
            keyType={"email-address"}
            label="Confirm Email Address"
            updateValue={updateUserInfo.bind(this, "confirmEmail")}
            value={userConfirmEmail}
          />
        )}
        <Input
          label="Password"
          updateValue={updateUserInfo.bind(this, "password")}
          value={userPassword}
          secure={true}
          isInvalid={credInValid.password}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            updateValue={updateUserInfo.bind(this, "confirmPassword")}
            value={userConfirmPassword}
            secure={true}
            isInvalid={credInValid.confirmPassword}
          />
        )}
      </View>
      {/* Submit Button */}
      <View style={styles.button}>
        <Button
          onPress={loginHandler}
          text={isLogin ? "Login" : "Sign Up"}
          bgcolor={colors.primary}
          color={colors.primaryBlackHex}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    padding: 10,
    justifyContent: "space-around",
  },
  form: {
    marginLeft: 25,
  },
  button: {
    alignSelf: "center",
    marginTop: 10,
  },
});
