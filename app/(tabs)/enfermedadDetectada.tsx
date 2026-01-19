import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Footer from "./footer";

export default function EnfermedadDetectada() {
  const route = useRoute();
  const router = useRouter();
  const { cultivoId } = route.params as { cultivoId: string | null };
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  const navigation = useNavigation();
  const { enfermedadId } = route.params as { enfermedadId: string | null };
  const [enfermedades, setEnfermedades] = useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [descripcionEnf, setDescripcionEnf] = useState<
    { id: string; [key: string]: any }[]
  >([]);

  const [mostrarEnf, setMostrarEnf] = useState<number>(0);
  const { quimicaId } = route.params as { quimicaId: string | null };
  const { biologicaId } = route.params as { biologicaId: string | null };

  const [mostrarQuimicas, setMostrarQuimicas] = useState<boolean[]>([]);
  const [mostrarBiologicas, setMostrarBiologicas] = useState<boolean[]>([]);

  const removeAccents = (str: string): string => {
    const accents: { [key: string]: string } = {
      á: "a",
      é: "e",
      í: "i",
      ó: "o",
      ú: "u",
      Á: "A",
      É: "E",
      Í: "I",
      Ó: "O",
      Ú: "U",
      ñ: "n",
      Ñ: "N",
    };

    return str
      .split("")
      .map((char: string) => accents[char] || char)
      .join("");
  };

  useFocusEffect(
    useCallback(() => {
      const fetchEnfermedades = async () => {
        try {
          // Guardar y validar cultivoId antes de usarlo para evitar pasar null a removeAccents
          if (!cultivoId) {
            console.warn("No cultivoId provided, skipping fetchEnfermedades");
            setEnfermedades([]);
            setMostrarEnf(0);
            setMostrarQuimicas([]);
            setMostrarBiologicas([]);
            return;
          }

          const db = getFirestore();
          const cultivoKey = removeAccents(cultivoId).toLowerCase();
          const enfermedadesCollection = collection(
            db,
            "bd_enfermedades_" + cultivoKey,
          );
          const enfermedadesSnapshot = await getDocs(enfermedadesCollection);
          const enfermedadesList = enfermedadesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setEnfermedades(enfermedadesList);
          // initialize mostrar array: only the item matching enfermedadId (converted to number) will be true
          setMostrarEnf(Number(enfermedadId) || 0); // Mostrar solo la enfermedad seleccionada
          setMostrarQuimicas(
            enfermedadesList.map((_, index) => index === Number(quimicaId)),
          ); // Mostrar solo las quimicas de la enfermedad seleccionada
          setMostrarBiologicas(
            enfermedadesList.map((_, index) => index === Number(biologicaId)),
          ); // Mostrar solo las biologicas de la enfermedad seleccionada
        } catch (error) {
          console.error("Error al obtener las enfermedades:", error);
        }
      };

      fetchEnfermedades();
      return () => {
        setEnfermedades([]);
        setMostrarEnf(0);
      };
    }, [cultivoId]),
  );
  return (
    <View style={{ height: "100%" }}>
      <TouchableOpacity
        style={{ marginTop: 40, marginLeft: 20 }}
        onPress={() => router.push("/SeleccionarCultivos")}
      >
        <Image
          style={{ width: 50, height: 50, marginBottom: 10 }}
          source={require("./img/volver.png")}
        />
        <Text
          style={{
            fontFamily: "Roboto_400Regular",
            fontSize: 14,
            color: "black",
          }}
        ></Text>
      </TouchableOpacity>

      <br />
      <br />
      <Text
        style={{
          fontFamily: "Roboto_400Regular",
          fontSize: 24,
          fontWeight: "bold",
          marginLeft: 20,
        }}
      >
        Enfermedad Detectada{" "}
      </Text>
      <br />
      {enfermedades[mostrarEnf] && (
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "#CCE3DE",
            padding: 10,
            borderRadius: 10,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto_700Bold",
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              color: "#6B9080",
            }}
          >
            {enfermedades[mostrarEnf].Titulo}
          </Text>
          <br />

          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              marginLeft: 50,
              marginRight: 50,
            }}
          >
            {enfermedades[mostrarEnf].a}
          </Text>
          <Text style={{ fontFamily: "Roboto_400Regular" }}>
            {enfermedades[mostrarEnf].biologicas}
          </Text>
          <Text style={{ fontFamily: "Roboto_400Regular" }}>
            {enfermedades[mostrarEnf].quimicas}
          </Text>
        </View>
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <br />
        <br />

        <TouchableOpacity
          style={{
            backgroundColor: "#27352F",
            padding: 10,
            borderRadius: 20,
            width: "60%",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            margin: 15,
            shadowRadius: 4,
          }}
          onPress={() => router.push("/listadoProductos")}
        >
          <Text
            style={{
              color: "#F6FFF8",
              fontFamily: "Roboto_700Bold",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Ir a Listado de Productos
          </Text>
        </TouchableOpacity>
      </View>

      <br />
      <br />
      <br />

      {/* <TouchableOpacity
        style={{ marginTop: 40, marginLeft: 20 }}
        onPress={() =>
          router.push(
            `/listadoEnfermedades?cultivoId=${encodeURIComponent(cultivoId || "")}`,
          )
        }
      >
        <Image
          style={{ width: 50, height: 50, marginBottom: 10 }}
          source={require("./img/volver.png")}
        />
        <Text
          style={{
            fontFamily: "Roboto_400Regular",
            fontSize: 14,
            color: "black",
          }}
        >
          {"< Regresar a Listado de Enfermedades"}
        </Text>
      </TouchableOpacity>
      {/* Agregar más contenido aquí si es necesario */}

      <Footer />
    </View>
  );
}
