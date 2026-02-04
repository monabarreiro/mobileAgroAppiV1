import {
    Roboto_400Regular,
    Roboto_700Bold,
    useFonts,
} from "@expo-google-fonts/roboto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import Footer from "./footer";

export default function Historial() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  const router = useRouter();
  let historialArray1: { url: string; fecha: string }[] = [
    { url: "Historial Vacío", fecha: " " },
  ];
  const [historialArray, setHistorialArray] = React.useState(historialArray1); // Estado para forzar la re-renderización
  const [searchTerm, setSearchTerm] = React.useState("");
  const iniciarHistorial = async () => {
    try {
      const historial = await AsyncStorage.getItem("historial");
      setHistorialArray(historial ? JSON.parse(historial) : []); // Actualiza el estado para re-renderizar)
    } catch (error) {
      console.log("Error al iniciar el historial:", error);
    }
  };

  React.useEffect(() => {
    iniciarHistorial();
    console.log("Historial iniciado:", historialArray);
  }, []);

  const guardarHistorial = async (url: string) => {
    try {
      const historial = await AsyncStorage.getItem("historial");

      // setHistorialArray(historial ? JSON.parse(historial) : []); // Actualiza el estado para re-renderizar)
      pushHistorialArray(url);
      console.log("Historial actualizado:", historialArray);
    } catch (error) {
      console.log("Error al guardar el historial:", error);
    }
  };
  const pushHistorialArray = async (url: string) => {
    setHistorialArray((prev) => {
      const updated = [...prev, { url, fecha: new Date().toISOString() }];

      AsyncStorage.setItem("historial", JSON.stringify(updated));
      return updated;
    });
  };
  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          margin: 20,
          fontFamily: "Roboto_700Bold",
        }}
      >
        Historial de enfermedades
      </Text>

      <TextInput
        placeholder="Guardar en Historial..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 6,
          padding: 10,
          margin: 20,
        }}
        onSubmitEditing={() => {
          guardarHistorial(searchTerm);

          setSearchTerm("");
        }}
      />

      <ScrollView
        contentContainerStyle={{
          margin: 20,
          maxHeight: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {historialArray.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.url as any)}
          >
            <Text>
              {item.url} - {item.fecha}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </ScrollView>
  );
}
