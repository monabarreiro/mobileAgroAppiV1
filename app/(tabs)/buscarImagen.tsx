import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { useRoute } from "@react-navigation/native";
import { Image, ImageBackground } from "expo-image";
import * as ImageManipulator from "expo-image-manipulator";
import * as imagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native"; // Modulos necesarios

export default function BuscarImagen() {
  const router = useRouter();
  const [image, setImage] = React.useState<string | null>(null);
  // Función para seleccionar una imagen de la galería
  const [apiKey, setApiKey] = React.useState(
    "AIzaSyB72DREydt7R2WdYu6jGjLXUJZvTjYI-zg",
  );
  const [labels, setLabels] = React.useState<string[]>([]);
  const [posiblesEnfermedades, setPosiblesEnfermedades] = React.useState<
    number[]
  >([]);
  const [textoPosiblesEnfermedades, setTextoPosiblesEnfermedades] =
    React.useState<string[]>([]);
  const [enfermedadDetectada, setEnfermedadDetectada] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [diccionarioMaiz, setdiccionarioMaiz] = React.useState<string[][]>([
    ["White patches", "Pantoea ananatis"], // 1.- Mancha blanca
    ["Pathology", "Plant pathology"], // 2.- Roya del maiz
    ["Estrès hídric"], // 3. estres hídrico
    ["Plant diseases", "Blight"], //4.- Tizon del maiz
    ["Corn smut", "Smut"], // 5.- Carbón comun del maiz
    ["Río Cuarto"], // 6.- Mal de Rio Cuarto
  ]); //np
  const [diccionarioLimon, setdiccionarioLimon] = React.useState<string[][]>([
    ["Acari", "Mite"], // Limon Enfermedaad  1. Acaro de las Yemas  Limon 1
    ["Xanthomonas citri ", "Citrus canker"], // 2. Cancrosis
    ["Chlorosis"], //3 Clorosis
    ["Mealybug ", "Lepidoptera"], //4 Cochinilla Minador de los Citricos
    ["Diaphorina citri", "Citrus greening disease"], //5  HLB
    ["anthracnose"], // 6 Antracnosis
  ]); //
  const [diccionarioSoja, setdiccionarioSoja] = React.useState<string[][]>([
    ["Sclerotinia sclerotiorum", "Sclerotinia", "Sclerotium"], // 1.Esclerotinia.
    ["Cercospora kikuchii", "Cercospora"], //2. Tizon purpura o Morado de la hoja
    ["Diaporthe faseolorum var. sojae", "Diaporthe phaseolorum"], // 3.tizon del tallo y vaina
    ["Colletotrichum gloeosporioides", "Colletotrichum truncatum"], // 4. Antracnosis
    ["Cercospora sojina", "Frogeye leaf spot"], // 5. Mancha ojo de rana //
    ["Septoria glycines", "Septoria"], // 6. Mancha marron en soja .    Soja 2
  ]); //
  const [diccionarioTrigo, setdiccionarioTrigo] = React.useState<string[][]>([
    ["Loose smut of barley", ""], // 1.Carbon volador Ejemplo de enfermedad 2 Trigo 3
    ["Pyrenophora tritici-repentis", ""], // 2.Mancha amarilla
    ["Fusarium wilt ", "Fusarium oxysporum", "Fusarium"], // 3. Fusariosis
    ["Puccinia graminis", "Plant pathology Trigo"], // 4. Roya del tallo
    ["Stem rust", ""], // 5. Carbon cubierto o caries
    ["Mosaic virus ", "Soil-borne wheat mosaic virus"], // 6. Mosaico estriaado
  ]); //
  const [diccionarioUva, setdiccionarioUva] = React.useState<string[][]>([
    ["Oidium Uva", "powdery mildew Uva"], //1 Oidio de la vid
    ["Esca Uva", ""], // 2.Yesca
    ["Botritis Uva", "Botrytis"], // 3.Botritis // cambiar
    ["Black rot Uva", ""], // 4. Black rot
    ["Filoxera Uva", ""], // 5. Filoxera
    ["Mildiu Uva", ""], // 6.Mildiu
  ]); //
  const [diccionarioCebada, setdiccionarioCebada] = React.useState<string[][]>([
    ["Stem rust Cebada", "Puccinia hordei Cebada"], //1Roya amarilla o anaranjada
    ["Blumeria graminis Cebada"], // 2 oidio
    [
      "Ramularia collo-cygni Cebada",
      "Plant pathology Cebada",
      "Ramularia Cebada",
    ], // 3 Ramularia
    ["Helminthosporium Cebada", "Pyrenophora teres Cebada"], // 4 Helmintosporiosis
    ["Septoria", "Zymoseptoria tritici"], // 5 Septoria
    ["Rhynchosporium secalis Cebada", ""], // 6 Rincosporiosis
  ]); //
  let listaDiccionarios: string[][][] = [
    diccionarioMaiz,
    diccionarioLimon,
    diccionarioSoja,
    diccionarioTrigo,
    diccionarioUva,
    diccionarioCebada,
  ];
  let numeroCultivo: number = 0; // Maiz por defecto

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const route = useRoute();
  let { cultivoId } = route.params as { cultivoId: any | "" };
  async function generarEnlaceEnfermedad() {
    console.log("Posibles enfermedades encontradas: ", posiblesEnfermedades);
    posiblesEnfermedades.forEach((index) => {
      console.log("Generando enlace para enfermedad con índice: ", index);
      setTextoPosiblesEnfermedades((prev) => [
        ...prev,
        "/listadoEnfermedades?cultivoId=maiz&enfermedadId=" + index.toString(),
      ]);
      setPosiblesEnfermedades((prev) => [...prev, index]);
    });
  }
  if (cultivoId.toLowerCase() === "maíz") {
    numeroCultivo = 0;
  } else if (
    cultivoId.toLowerCase() === "citricos" ||
    cultivoId.toLowerCase() === "limón"
  ) {
    numeroCultivo = 1;
    cultivoId = "limón";
  } else if (cultivoId.toLowerCase() === "soja") {
    numeroCultivo = 2;
  } else if (cultivoId.toLowerCase() === "trigo") {
    numeroCultivo = 3;
  } else if (cultivoId.toLowerCase() === "uva") {
    numeroCultivo = 4;
  } else if (cultivoId.toLowerCase() === "cebada") {
    numeroCultivo = 5;
  }

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
  async function cloudVisionFetch(imageUri: string) {
    setLoading(true);
    const base64 = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 800 } }], // Redimensionar la imagen para reducir el tamaño
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true },
    ).then((result) => result.base64);

    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requests: [
              {
                image: { content: base64 },
                features: [{ type: "WEB_DETECTION", maxResults: 5 }],
              },
            ],
          }),
        },
      );

      const data = await response.json();
      const labelAnnotations =
        data.responses?.[0]?.webDetection?.webEntities || [];
      setLabels(labelAnnotations.map((l: any) => l.description)); // es lo que genera Google Vision
      labelAnnotations.map((l: any) => {
        // Buscar en el diccionario si la etiqueta coincide con alguna enfermedad conocida
        setEnfermedadDetectada(true);
        for (let i = 0; i < listaDiccionarios[numeroCultivo].length; i++) {
          listaDiccionarios[numeroCultivo][i].forEach((enfermedad) => {
            if (
              removeAccents(l.description.toLowerCase()).includes(
                removeAccents(enfermedad.toLowerCase()),
              )
            ) {
              setTextoPosiblesEnfermedades([
                "/listadoEnfermedades?cultivoId=" +
                  cultivoId +
                  "&enfermedadId=" +
                  i.toString(),
              ]);

              return; // Salir del bucle una vez que se encuentra una coincidencia}
            }
          });
        }
      });

      // if (textoPosiblesEnfermedades.length === 0) {
      // alert("No pudimos encontrar enfermedades con esa imagen. \nPor favor, inténtalo de nuevo con otra imagen o dirígete al listado de enfermedades.");
      // }
      setLoading(false);
    } catch (e) {
      console.error(e);
      alert("Error al analizar la imagen. Por favor, inténtalo de nuevo.");
      setEnfermedadDetectada(true);
      setLoading(false);
    }
  }

  function textoAGoogle(texto: string) {
    const url = `https://www.google.com/search?q=${encodeURIComponent(texto)}`;
    Linking.openURL(url);
  }
  async function openCamara() {
    let result = await imagePicker.requestCameraPermissionsAsync();

    if (result.granted) {
      let cameraResult = await imagePicker.launchCameraAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!cameraResult.canceled) {
        setImage(cameraResult.assets[0].uri);

        await cloudVisionFetch(cameraResult.assets[0].uri);
      }
    }
  }
  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await imagePicker.requestMediaLibraryPermissionsAsync();

    if (result.granted) {
      let pickerResult = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.canceled) {
        setImage(pickerResult.assets[0].uri);

        await cloudVisionFetch(pickerResult.assets[0].uri);
      }
    }
  }

  return (
    <ImageBackground
      source={require("./img/sojaregada.jpg")}
      style={{ flex: 1, padding: 10 }}
      resizeMode="cover"
    >
      <View>
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 10,
            textAlign: "center",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={() => router.push("/SeleccionarCultivos")}>
            <Image
              style={{ width: 50, height: 50, marginBottom: 10 }}
              source={require("./img/volver.png")}
            />
          </TouchableOpacity>

          <View>
            <Text
              style={{
                fontFamily: "Roboto_700Bold",
                color: "black",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              Subir imagen del Cultivo: {cultivoId.toUpperCase()}
            </Text>
            <Image
              source={require("./img/sacarFoto.png")}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                marginBottom: 10,
                justifyContent: "center",
              }}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#27352F",
                padding: 10,
                borderRadius: 20,
                width: "80%",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                margin: 15,
                shadowRadius: 4,
              }}
              onPress={openCamara}
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
                Tomá una foto con la cámara
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#27352F",
                padding: 10,
                borderRadius: 20,
                width: "80%",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
              }}
              onPress={pickImage}
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
                Subí tu imagen desde galería
              </Text>
            </TouchableOpacity>
          </View>

          {loading && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <Image
                source={require("./img/logo_agroAppi.png")}
                style={{ width: 100, height: 100, alignSelf: "center" }}
              />

              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                {" "}
                Analizando imagen, por favor espera...
              </Text>
            </View>
          )}
          {labels.map((label, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => textoAGoogle(label + " " + cultivoId)}
            >
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}

          {textoPosiblesEnfermedades.map((enlace, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                router.push(textoPosiblesEnfermedades[index] as any)
              }
            >
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 20,
                  color: "blue",
                  textDecorationLine: "underline",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                Solución posible (Presiona aquí)
              </Text>
            </TouchableOpacity>
          ))}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#F6FFF8",
                padding: 10,
                borderRadius: 20,
                width: "80%",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
              }}
              onPress={() =>
                router.push(
                  `/listadoEnfermedades?cultivoId=${encodeURIComponent(cultivoId)}`,
                )
              }
            >
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 20,
                  color: "#27352F",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Ir al listado de enfermedades
              </Text>
            </TouchableOpacity>
          </View>

          {enfermedadDetectada === true &&
            textoPosiblesEnfermedades.length === 0 && (
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 20,
                  color: "red",
                }}
              >
                No se detectaron enfermedades conocidas para {cultivoId}.
                Intente con otra imagen o vaya al listado de enfermedades.
              </Text>
            )}
        </div>
      </View>
    </ImageBackground>
  );
}
