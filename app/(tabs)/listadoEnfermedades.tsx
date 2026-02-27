import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Footer from "./footer";

export default function ListadoEnfermedades() {
  const [enfermedades, setEnfermedades] = useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [descripcionEnf, setDescripcionEnf] = useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [mostrarEnf, setMostrarEnf] = useState<boolean[]>([]);

  const [mostrarQuimicas, setMostrarQuimicas] = useState<boolean[]>([]);
  const [mostrarBiologicas, setMostrarBiologicas] = useState<boolean[]>([]);

  let historialArray1: { url: string; fecha: string; nombre: string }[] = [
    { url: "Historial Vacío", fecha: " ", nombre: "Historial Vacío" },
  ];
  const [historialArray, setHistorialArray] = React.useState(historialArray1); // Est

  const router = useRouter();
  //const auth = getAuth();
  const route = useRoute();
  const { cultivoId } = route.params as { cultivoId: string | null };
  const { enfermedadId } = route.params as { enfermedadId: string | null };
  const { quimicaId } = route.params as { quimicaId: string | null };
  const { biologicaId } = route.params as { biologicaId: string | null };

  const imagen = {
    trigo: require("./img/trigo_solo.png"),
    maiz: require("./img/maiz_solo.png"),
    soja: require("./img/soja_solo.png"),
    cebada: require("./img/cebada_solo.png"),
    uva: require("./img/uva_solo.png"),
    limon: require("./img/limon_solo.png"),
  };

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
  const textoImagen = cultivoId
    ? imagen[removeAccents(cultivoId).toLowerCase() as keyof typeof imagen]
    : null;
  const mostrarUno = (index: number) => {
    setMostrarEnf((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  const mostrarSolucionesQuimicas = (index: number) => {
    setMostrarQuimicas((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  const mostrarSolucionesBiologicas = (index: number) => {
    setMostrarBiologicas((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  const refreshCultivos = () => {
    router.push("/listadoCultivos");
  };
  useFocusEffect(
    useCallback(() => {
      const fetchEnfermedades = async () => {
        try {
          // Guardar y validar cultivoId antes de usarlo para evitar pasar null a removeAccents
          if (!cultivoId) {
            console.warn("No cultivoId provided, skipping fetchEnfermedades");
            setEnfermedades([]);
            setMostrarEnf([]);
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
          setMostrarEnf(
            enfermedadesList.map((_, index) => index === Number(enfermedadId)),
          ); // Mostrar solo la enfermedad seleccionada
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
        setMostrarEnf([]);
      };
    }, [cultivoId]),
  );

  let styleExtra = { backgroundColor: "#f4ea53ff" };

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

  const guardarHistorial = async (url: string, titulo: string) => {
    try {
      const historial = await AsyncStorage.getItem("historial");

      // setHistorialArray(historial ? JSON.parse(historial) : []); // Actualiza el estado para re-renderizar)
      pushHistorialArray(url, titulo);
      console.log("Historial actualizado:", historialArray);
    } catch (error) {
      console.log("Error al guardar el historial:", error);
    }
  };
  const pushHistorialArray = async (url: string, titulo: string) => {
    try {
      const historial = await AsyncStorage.getItem("historial");

      let parsed = historial ? JSON.parse(historial) : [];

      // eliminar el falso historial vacío si existe
      parsed = parsed.filter((item: any) => item.url !== "Historial Vacío");

      const updated = [
        ...parsed,
        {
          url,
          nombre: titulo,
          fecha: new Date().toISOString(),
        },
      ];

      await AsyncStorage.setItem("historial", JSON.stringify(updated));

      setHistorialArray(updated);
    } catch (error) {
      console.log("Error guardando historial:", error);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,

        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ marginTop: 30, marginLeft: 30, alignSelf: "flex-start" }}
        onPress={() => router.push(`/(tabs)/SeleccionarCultivos`)}
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
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          marginTop: 10,
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold", textAlign: "center" }}>
          Listado de Enfermedades
        </Text>

        <Image
          source={textoImagen}
          style={{ width: 200, height: 200, borderRadius: 20 }}
        />
        <Text style={{ fontSize: 32, fontWeight: "bold", textAlign: "center" }}>
          {cultivoId}
        </Text>
        {enfermedades.map((enfermedad, index) => (
          <TouchableOpacity
            key={enfermedad.id}
            style={{
              backgroundColor:
                enfermedadId === String(index)
                  ? styleExtra.backgroundColor
                  : "#b6eab8ff",
              padding: 10,
              borderRadius: 5,
              width: "80%",
              alignItems: "center",
            }}
            onPress={() => {
              guardarHistorial(
                `${cultivoId} - ${index} `,
                ` ${enfermedad.Titulo} `,
              );
              router.push(
                `/(tabs)/enfermedadDetectada?cultivoId=${encodeURIComponent(cultivoId || "")}&enfermedadId=${index}`,
              );
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {enfermedad.Titulo}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => refreshCultivos()}
          style={{
            backgroundColor: "#507866",
            padding: 10,
            borderRadius: 10,
            width: "80%",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            Volver a la lista de cultivos
          </Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
          {"\n"}
          {"\n"}
        </Text>
        <Footer />
      </View>
    </ScrollView>
  );
}
