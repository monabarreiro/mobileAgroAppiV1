import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
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

  const router = useRouter();
  const auth = getAuth();
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

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        marginTop: 50,
      }}
    >
      <Text style={{ fontSize: 40, fontWeight: "bold", textAlign: "center" }}>
        Listado de Enfermedades
      </Text>

      <Image
        source={textoImagen}
        style={{ width: 200, height: 200, borderRadius: 20 }}
      />
      <Text style={{ fontSize: 40, fontWeight: "bold", textAlign: "center" }}>
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
          onPress={() =>
            router.push(
              `/(tabs)/enfermedadDetectada?cultivoId=${encodeURIComponent(cultivoId || "")}&enfermedadId=${index}`,
            )
          }
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {enfermedad.Titulo}
          </Text>
          {mostrarEnf[index] && (
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <Text style={{ fontSize: 16 }}>{enfermedad.a}</Text>

              <TouchableOpacity
                onPress={() => mostrarSolucionesQuimicas(index)}
                style={{ marginTop: 10 }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Soluciones Químicas
                </Text>
              </TouchableOpacity>

              {mostrarQuimicas[index] && (
                <View>
                  <Text style={{ fontSize: 16 }}>{enfermedad.quimicas} </Text>
                  {enfermedad.imgQuimicas &&
                    Array.isArray(enfermedad.imgQuimicas) &&
                    enfermedad.imgQuimicas.map(
                      (imgUrl: string, imgIndex: number) => (
                        <Image
                          key={imgIndex}
                          source={{ uri: imgUrl }}
                          style={{ width: 70, height: 50 }}
                        />
                      ),
                    )}
                </View>
              )}
              <TouchableOpacity
                onPress={() => mostrarSolucionesBiologicas(index)}
                style={{ marginTop: 10 }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Soluciones Biológicas
                </Text>
              </TouchableOpacity>
              {mostrarBiologicas[index] && (
                <View>
                  <Text style={{ fontSize: 16 }}>{enfermedad.biologicas} </Text>
                  {enfermedad.imgBiologicas &&
                    Array.isArray(enfermedad.imgBiologicas) &&
                    enfermedad.imgBiologicas.map(
                      (imgUrl: string, imgIndex: number) => (
                        <Image
                          key={imgIndex}
                          source={{ uri: imgUrl }}
                          style={{ width: 70, height: 50 }}
                        />
                      ),
                    )}
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={() => refreshCultivos()}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Volver a la lista de cultivos
        </Text>
      </TouchableOpacity>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </ScrollView>
  );
}
