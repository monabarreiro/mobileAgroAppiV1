import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ProductoSeleccionado() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const product = params.product ? JSON.parse(params.product as string) : null;

  const handleLinking = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("No se puede abrir la URL:", url);
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity
        style={{ marginTop: 20, marginLeft: 20 }}
        onPress={() =>
          router.push(
            `/(tabs)/listadoProductos?cultivoId=${encodeURIComponent(
              product.cultivoId || "",
            )}&enfermedadId=${encodeURIComponent(product.enfermedadId)}`,
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
        ></Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
        Producto Seleccionado
      </Text>

      <View style={{ marginBottom: 20, alignItems: "center" }}>
        <Image
          source={{
            uri: product?.imagen,
          }}
          style={{ width: 200, height: 200, marginTop: 20, marginBottom: 20 }}
        />
        <View
          style={{
            backgroundColor: "#A4C3B2",
            padding: 10,
            borderRadius: 20,
            width: "70%",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            margin: 15,
            shadowRadius: 4,
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          >
            {product?.quimica}
          </Text>
          <Text style={{ fontSize: 16, marginTop: 10 }}>
            {product?.primDescripcion}
          </Text>
          <Text style={{ fontSize: 16, marginTop: 10 }}>
            {product?.segDescripcion}
          </Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
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
                justifyContent: "center",
              }}
              onPress={() => handleLinking("https://www.mercadolibre.com.ar/")} //PONER LINK A LENS AI AQUÍ
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Comprar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
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
                justifyContent: "center",
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
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
