import { View, Text } from "react-native";
import React from "react";
import AuthContent from "../../components/UnAuth/AuthContent";

export default function Login() {
  return <AuthContent isLogin={true} />;
}
