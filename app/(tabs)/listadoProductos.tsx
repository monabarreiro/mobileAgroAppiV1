import * as Linking from "expo-linking";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ListadoProductos() {
  const [enfermedades, setEnfermedades] = useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [descripcionEnf, setDescripcionEnf] = useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [titulo, setTitulo] = useState<string[]>([]);
  const [primDescripcion, setPrimDescripcion] = useState<string[]>([]);
  const [segDescripcion, setSegDescripcion] = useState<string[]>([]);
  const [imagenProducto, setImagenProducto] = useState<string[]>([]);

  const { cultivoId } = useLocalSearchParams<{ cultivoId: string }>();

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
  const [producto, setProducto] = useState<
    {
      titulo: string;
      descripcion: string;
      imagen: string;
    }[]
  >([
    {
      titulo: "Producto",
      descripcion: "Descripción",
      imagen:
        "https://monabarreiroimagenesagroappi.netlify.app/imagenes/maxentis.jpg",
    },
    {
      titulo: "Producto",
      descripcion: "Descripción",
      imagen:
        "https://monabarreiroimagenesagroappi.netlify.app/imagenes/maxentis.jpg",
    },
    {
      titulo: "Producto",
      descripcion: "Descripción",
      imagen:
        "https://monabarreiroimagenesagroappi.netlify.app/imagenes/maxentis.jpg",
    },
  ]);

  const auth = getAuth();

  const handleLinking = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("No se puede abrir la URL:", url);
    }
  };
  useFocusEffect(
    useCallback(() => {
      const fetchEnfermedades = async () => {
        try {
          // Guardar y validar cultivoId antes de usarlo para evitar pasar null a removeAccents
          if (!cultivoId) {
            console.warn("No cultivoId provided, skipping fetchEnfermedades");
            setEnfermedades([]);
            setTitulo([]);
            setPrimDescripcion([]);
            setSegDescripcion([]);
            setImagenProducto([]);

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
        } catch (error) {
          console.error("Error al obtener las enfermedades:", error);
        }
      };

      fetchEnfermedades();
      return () => {
        setEnfermedades([]);
      };
    }, [cultivoId]),
  );

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Productos Disponibles
      </Text>
      {enfermedades.map((producto, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            router.push({
              pathname: "/productoSeleccionado",
              params: { product: JSON.stringify(producto) },
            })
          }
        >
          <View
            style={{
              marginBottom: 20,
              backgroundColor: "#F6FFF8",
              padding: 10,
              borderRadius: 20,
              width: "80%",
              shadowColor: "#8a8585ff",
              shadowOffset: { width: 4, height: 4 },
              shadowOpacity: 0.3,
              margin: 15,
              shadowRadius: 4,
              flexDirection: "column",
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={{ uri: producto.imgQuimicas[index] }}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  resizeMode: "contain",
                }}
              />

              <View style={{ marginRight: 12, flex: 1 }}>
                <Text style={{ fontSize: 16, marginTop: 10, marginLeft: 30 }}>
                  {producto.primDescripcion[index]}
                </Text>
              </View>
              <br />
            </View>

            <Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>
              {producto.quimicas[index]}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={{
          backgroundColor: "rgba(228, 239, 216, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
          marginLeft: 20,
          marginRight: 20,
        }}
        onPress={() =>
          handleLinking("https://www.google.com/maps/search/agronomia/")
        } //PONER LINK A LENS AI AQUÍ
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            color: "black",
            textAlign: "center",
          }}
        >
          Búsquedas de Agronomías cercanas a tu campo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
