import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "./footer";

export default function Home() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
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
            width: "80%",
            padding: 0,
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
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(164, 195, 178, 0.8)",
              padding: 10,

              borderRadius: 10,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 14, fontFamily: "Roboto_400Regular" }}>
              <Text>{"\n"} </Text>
              Bienvenido a AgroAppi, tu compañero digital para el cuidado de tus
              cultivos. Encontrarás información detallada sobre las enfermedades
              que afectan a tus plantas, así como recomendaciones de productos
              para combatirlas. Explora nuestra sección de enfermedades para
              identificar los problemas que puedan estar afectando a tus
              cultivos y descubre las mejores soluciones para mantenerlos
              saludables y productivos.
            </Text>
            <View style={{ padding: 10, alignItems: "flex-start" }}>
              <Text style={{ fontSize: 20, fontFamily: "Roboto_700Bold" }}>
                Información de contacto:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Roboto_400Regular",
                  textAlign: "left",
                }}
              >
                {"\n"}
                email: info@agroappi.com.ar {"\n"}
                Te: +54 9 11 4479-0260 {"\n"}
                Contacto: Mónica Barreiro {"\n"}
              </Text>
              <Text>Nombre</Text>

              <TextInput
                style={{
                  backgroundColor: "white",
                  padding: 8,
                  borderRadius: 5,
                  width: "100%",
                  marginBottom: 10,
                }}
                placeholder="Nombre..."
                value={nombre}
                onChangeText={setNombre}
              ></TextInput>

              <Text>email</Text>

              <TextInput
                style={{
                  backgroundColor: "white",
                  padding: 8,
                  borderRadius: 5,
                  width: "100%",
                  marginBottom: 10,
                }}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              ></TextInput>

              <Text>Teléfono</Text>

              <TextInput
                style={{
                  backgroundColor: "white",
                  padding: 8,
                  borderRadius: 5,
                  width: "100%",
                  marginBottom: 10,
                }}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
              ></TextInput>

              <Text>Mensaje</Text>

              <TextInput
                style={{
                  backgroundColor: "white",
                  padding: 8,
                  borderRadius: 5,
                  width: "100%",
                  marginBottom: 10,
                }}
                placeholder="Mensaje"
                value={mensaje}
                onChangeText={setMensaje}
              ></TextInput>
              <TouchableOpacity
                onPress={(e) =>
                  Linking.openURL(
                    `mailto: barreiro.monica@gmail.com? subject:${nombre} & body=${mensaje + telefono}`,
                  )
                }
              >
                <View
                  style={{
                    backgroundColor: "#084006",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Enviar formulario
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text>
          {" "}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
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
