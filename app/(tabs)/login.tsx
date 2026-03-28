import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { auth } from "./firebaseNetlify";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  type params = {
    id?: string | string[];
  };
  const { id } = useLocalSearchParams<params>();

  const handleLoginDb = async (e: any) => {
    e.preventDefault();
    try {
      const db = getFirestore();
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError("Usuario no encontrado");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      if (userData.password !== password) {
        setError("Contraseña incorrecta");
        return;
      }
      alert("Login exitoso");
      console.log("Usuario autenticado con email y password:", email, password);
      // Guardar en Localhost la sesion del usuario
      router.push("/SeleccionarCultivos");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(String(error));
    }
  };
  useEffect(() => {
    console.log("id" + id);
    const safeId = Array.isArray(id) ? id[0] : id;

    if (safeId) {
      setEmail(safeId);
    }
  }, [id]);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "137817998022-1rbjodco8a20407kp8nbd1g74ebmnaft.apps.googleusercontent.com",
    iosClientId:
      "137817998022-m7bvtv92p9qc7l86nmt261c30m8misbo.apps.googleusercontent.com",
    webClientId:
      "137817998022-qbcp5bo1jjsv24e147u51bgj0l0dti3e.apps.googleusercontent.com",
  });

  //const auth = getAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/SeleccionarCultivos");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(String(error));
    }
  };
  const recuperarContrasena = () => {
    sendPasswordResetEmail(auth, email);
    alert("Correo de recuperación de contraseña enviado.");
  };
  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.authentication?.idToken;

      if (!idToken) return;

      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(auth, credential)
        .then(() => {
          router.push("/SeleccionarCultivos");
        })
        .catch((err) => setError(err.message));

      router.push("/SeleccionarCultivos");
    }
  }, [response]);

  return (
    <ImageBackground
      source={require("./img/fondo_trigo.png")}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <View style={{}}>
        <View
          style={{
            backgroundColor: "#A4C3B2",
            padding: 10,
            borderRadius: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#121812",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 30,
            }}
          >
            Iniciar Sesión
          </Text>
          <View
            style={{
              flexDirection: "column",
              gap: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{
                padding: 10,
                borderRadius: 5,

                width: "80%",
              }}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              style={{
                padding: 10,
                borderRadius: 5,

                width: "80%",
              }}
            />
            <TouchableOpacity
              style={{
                marginTop: 20,
                padding: 10,
                backgroundColor: "#27352F",
                borderRadius: 5,
              }}
              onPress={(e) => handleLogin(e)}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Login</Text>
            </TouchableOpacity>
          </View>
          {/* 
          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: "#27352F",
              borderRadius: 5,
            }}
            onPress={() => promptAsync()}
            disabled={!request}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              Login con Google
            </Text>
          </TouchableOpacity>
*/}
          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: "#27352F",
              borderRadius: 5,
            }}
            onPress={() => recuperarContrasena()}
            disabled={!request}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              Recuperar Contraseña
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: "#27352F",
              borderRadius: 5,
            }}
            onPress={() => router.push("/register")}
            disabled={!request}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              Si no estás registrado, haz click aquí para registrarte
            </Text>
          </TouchableOpacity>
          {error && (
            <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
