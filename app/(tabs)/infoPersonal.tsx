import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { ScrollView, Text, View } from "react-native";
import { auth } from "./firebaseNetlify";
import Footer from "./footer";

export default function InfoPersonal() {
  const user = auth.currentUser;
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ScrollView
      style={{ flex: 1, padding: 20, height: "100%", marginBottom: 0 }}
    >
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
          flex: 1,
          justifyContent: "center",
          height: "100%",
          marginBottom: 0,
        }}
      >
        <Text style={{ fontFamily: "Roboto_700Bold", fontSize: 24 }}>
          Info Personal
        </Text>

        <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 16 }}>
          email: {user?.email}
        </Text>
      </View>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </ScrollView>
  );
}
