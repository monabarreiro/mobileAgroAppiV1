import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import Footer from "./footer";

export default function Historial() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  const router = useRouter();
  let historialArray1: { url: string; fecha: string; nombre: string }[] = [
    { url: "Historial Vacío", fecha: " ", nombre: "Historial Vacío" },
  ];
  const [historialArray, setHistorialArray] = React.useState(historialArray1); // Estado para forzar la re-renderización
  const [searchTerm, setSearchTerm] = React.useState("");
  const iniciarHistorial = async () => {
    try {
      let historial = await AsyncStorage.getItem("historial");
      if (historial) {
        const parsedHistorial: {
          url: string;
          fecha: string;
          nombre: string;
        }[] = JSON.parse(historial);
        console.log("Historial completo:", parsedHistorial);

        if (parsedHistorial) {
          const slicedHistorial = parsedHistorial.slice(
            Math.max(parsedHistorial.length - 5, 0),
          );
          console.log("Últimos 5 elementos del historial:", slicedHistorial);
          setHistorialArray(slicedHistorial);
          AsyncStorage.setItem("historial", JSON.stringify(slicedHistorial));
        }
      }
    } catch (error) {
      console.log("Error al iniciar el historial:", error);
    }
  };
  const pushHistorialArray = async (url: string, titulo: string) => {
    setHistorialArray((prev) => {
      const updated = [
        ...prev,
        { url, nombre: titulo, fecha: new Date().toISOString() },
      ];

      AsyncStorage.setItem("historial", JSON.stringify(updated));
      return updated;
    });
  };

  const generarTextoHistorial = (url: string) => {
    let texto = url.split(" - ");
    texto[0] = texto[0].trim(); // cultivoId
    texto[1] = texto[1].trim(); // enfermedadId

    return `/listadoEnfermedades?cultivoId=${encodeURIComponent(texto[0])}&enfermedadId=${encodeURIComponent(texto[1])}`;
  };

  React.useEffect(() => {
    iniciarHistorial();
    console.log("Historial iniciado:", historialArray);
  }, []);

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
            onPress={() => router.push(generarTextoHistorial(item.url) as any)}
          >
            <Text>
              {item.nombre} - {item.fecha}
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
