import { API_KEY, SUP_URL, LOGIN_URL } from "@env";
import axios from "axios";

export async function Auth(mode, email, password) {
  try {
    let response;
    if (mode === "login") {
      response = await axios.post(`${LOGIN_URL}key=${API_KEY}`, {
        email,
        password,
        returnSecureToken: true,
      });
    } else {
      response = await axios.post(`${SUP_URL}key=${API_KEY}`, {
        email,
        password,
        returnSecureToken: true,
      });
    }
    return response.data.idToken;
  } catch (error) {
    console.log(error);
  }
}
