import {
    Roboto_400Regular,
    Roboto_700Bold,
    useFonts,
} from "@expo-google-fonts/roboto";
import { useRouter } from "expo-router";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

import { useState } from "react";

export default function Ajustes() {
  const [nombre, setNombre] = useState("");
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  const editarPerfil = () => {};
  const router = useRouter();
  return (
    <ScrollView style={{ height: "100%" }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: fontsLoaded ? "Roboto_700Bold" : undefined,
          marginBottom: 10,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        Ajustes
      </Text>
      <TextInput
        value={nombre}
        onChangeText={(text) => setNombre(text)}
        placeholder="Nombre de usuario"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          margin: 10,
        }}
      ></TextInput>
      <TouchableOpacity
        style={{
          margin: 10,
          backgroundColor: "#A4C3B2",
          padding: 10,
          borderRadius: 5,
        }}
        onPress={editarPerfil}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: fontsLoaded ? "Roboto_400Regular" : undefined,
            color: "#fff",
            textAlign: "center",
          }}
        >
          Editar Perfil
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
