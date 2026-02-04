import {
    Roboto_400Regular,
    Roboto_700Bold,
    useFonts,
} from "@expo-google-fonts/roboto";
import React from "react";
import Footer from "./footer";

import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function Home() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: "#6B9080",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={require("./img/sojaregada.jpg")}
        style={styles.imageBackground}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Roboto_700Bold",
            }}
          ></Text>

          <Image
            style={{ width: 100, height: 100 }}
            source={require("./img/casita.png")}
          />
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(164, 195, 178, 0.8)",
              padding: 10,
              textAlign: "center",
              borderRadius: 10,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "Roboto_400Regular" }}>
              <br />
              <br />
              <br />
              Bienvenido a AgroAppi, tu compañero digital para el cuidado de tus
              cultivos. Aquí encontrarás información detallada sobre las
              enfermedades que afectan a tus plantas, así como recomendaciones
              de productos para combatirlas. Explora nuestra sección de
              enfermedades para identificar los problemas que puedan estar
              afectando a tus cultivos y descubre las mejores soluciones para
              mantenerlos saludables y productivos.
              <br />
              <br />
            </Text>
            <View style={{ padding: 10, alignItems: "flex-start" }}>
              <Text style={{ fontSize: 20, fontFamily: "Roboto_700Bold" }}>
                Información de contacto:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Roboto_400Regular",
                  textAlign: "left",
                }}
              >
                <br />
                email: info@agroappi.com.ar <br />
                Te: +54 9 11 4479-0260 <br />
                Contacto: Mónica Barreiro <br />
              </Text>
            </View>
          </div>
        </View>
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </ImageBackground>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,

    position: "absolute",
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});
