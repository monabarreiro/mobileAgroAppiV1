import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';


export default function SeleccionarCultivos() {
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
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: "rgb(143,157,126)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
        }}
        onPress={() => router.push("/")}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
         Volver a pantalla Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(226, 172, 33, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
        }}
        onPress={() => handleLinking("https://huggingface.co/spaces/monabarreiro/maizMachine")}
      >
        <Text style={{ color: "lightorange", fontSize: 18 }}>
         MAIZ
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(211, 244, 170, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
        }}
        onPress={() => router.push("/")}
      >
        <Text style={{ color: "lightgreen", fontSize: 18 }}>
         TRIGO
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(139, 237, 19, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
        }}
        onPress={() => router.push("/")}
      >
        <Text style={{ color: "green", fontSize: 18 }}>
         SOJA
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(232, 227, 81, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
        }}
        onPress={() => router.push("/")}
      >
        <Text style={{ color: "yellow", fontSize: 18 }}>
         CEBADA
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(50, 87, 5, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
        }}
        onPress={() => router.push("/")}
      >
        <Text style={{ color: "green", fontSize: 18 }}>
         YERBA MATE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(102, 28, 231, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
        }}
        onPress={() => router.push("/")}
      >
        <Text style={{ color: "violet", fontSize: 18 }}>
        UVA
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(234, 223, 16, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
        }}
        onPress={() => router.push("/")}
      >
        <Text style={{ color: "yellow", fontSize: 18 }}>
        GIRASOL
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(236, 239, 12, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
        }}
        onPress={() => router.push("/")}
      >
        <Text style={{ color: "yellow", fontSize: 18 }}>
         CITRICOS
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(198, 106, 19, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
        }}
        onPress={() => router.push("/")}
      >
        <Text style={{ color: "orange", fontSize: 18 }}>
         MANI
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(228, 239, 216, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
        }}
        onPress={() => router.push("/")}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
        ARROZ
        </Text>
      </TouchableOpacity>
     
    </View>
  );
}