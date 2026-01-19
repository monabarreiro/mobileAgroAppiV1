import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ListadoProductos() {
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

  const router = useRouter();

  const handleLinking = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("No se puede abrir la URL:", url);
    }
  };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Productos Disponibles
      </Text>
      {producto.map((producto, index) => (
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
                source={{ uri: producto.imagen }}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  resizeMode: "contain",
                }}
              />

              <View style={{ marginRight: 12, flex: 1 }}>
                <Text style={{ fontSize: 16, marginTop: 10, marginLeft: 30 }}>
                  {producto.descripcion}
                </Text>
              </View>
              <br />
            </View>

            <Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>
              {producto.titulo}
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
