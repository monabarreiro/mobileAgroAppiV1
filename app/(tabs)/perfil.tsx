import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { useRouter } from "expo-router";
import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Footer from "./footer";

export default function Perfil() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  const router = useRouter();
  React.useEffect(() => {
    const test = async () => {
      await AsyncStorage.setItem("testKey", "funciona");
      const value = await AsyncStorage.getItem("testKey");
      console.log("TEST VALUE:", value);
    };

    test();
  }, []);
  return (
    <ScrollView style={{ height: "100%" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: fontsLoaded ? "Roboto_700Bold" : undefined,
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          Perfil
        </Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={require("./img/perfil.png")}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: fontsLoaded ? "Roboto_700Bold" : undefined,
          }}
        >
          Nombre
        </Text>
        <Text>
          {"\n"}
          {"\n"}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fontsLoaded ? "Roboto_400Regular" : undefined,
          }}
        ></Text>
        <TouchableOpacity
          style={{
            margin: 10,
            backgroundColor: "#A4C3B2",
            padding: 10,
            borderRadius: 5,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontFamily: fontsLoaded ? "Roboto_700Bold" : undefined,
            }}
          >
            Información Personal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            margin: 10,
            backgroundColor: "#A4C3B2",
            padding: 10,
            borderRadius: 5,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontFamily: fontsLoaded ? "Roboto_700Bold" : undefined,
            }}
          >
            Notificaciones
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            margin: 10,
            backgroundColor: "#A4C3B2",
            padding: 10,
            borderRadius: 5,
            width: "80%",
            alignItems: "center",
          }}
          onPress={() => {
            router.push("/historial");
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontFamily: fontsLoaded ? "Roboto_700Bold" : undefined,
            }}
          >
            Historial de Enfermedades
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            margin: 10,
            backgroundColor: "#A4C3B2",
            padding: 10,
            borderRadius: 5,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontFamily: fontsLoaded ? "Roboto_700Bold" : undefined,
            }}
          >
            Guardados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            margin: 10,
            backgroundColor: "#A4C3B2",
            padding: 10,
            borderRadius: 5,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontFamily: fontsLoaded ? "Roboto_700Bold" : undefined,
            }}
          >
            Ajustes
          </Text>
        </TouchableOpacity>
        <Text>
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
      </View>

      <Footer />
    </ScrollView>
  );
}
