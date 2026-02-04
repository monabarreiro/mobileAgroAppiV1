import { useRouter } from "expo-router";

import { Image, TouchableOpacity, View } from "react-native";

export default function Footer() {
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: "#27352F",
        justifyContent: "space-around",
        flexDirection: "row",
        paddingVertical: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      {/* Aquí puedes agregar el contenido del footer */}
      <TouchableOpacity onPress={() => router.push("/home")}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require("./img/casita.png")} // Símbolo de home
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/SeleccionarCultivos")}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require("./img/camara.png")} //Buscar Imagen x cultivo // este boton hoy no funciona
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/perfil")}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require("./img/ajustes.png")} //Perfil + guardado + historial
        />
      </TouchableOpacity>
    </View>
  );
}
