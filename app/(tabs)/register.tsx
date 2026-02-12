import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "./firebaseNetlify";

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Llene todos los campos");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("Registro exitoso");
      router.push("/login");
    } catch (error) {
      setError("Registro fallado, vuelva a intentarlo" + error);
    }
  };
  const crearUsuarioDb = async () => {
    try {
      console.log("Creando usuario en la base de datos con email:", email);

      if (password.length < 5) {
        alert("la contraseña debe superar los 6 caracteres");
        return;
      }
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        alert("por favor ingrese un email válido");
        return;
      }
      const ref = collection(getFirestore(), "usuarios");
      await addDoc(ref, {
        email,
        password,
      });
      console.log(
        "Usuario creado en la base de datos con email y password:",
        email,
        password,
      );

      alert("Registro exitoso");
      router.push("/login");
    } catch (error) {
      console.error("Error al crear el usuario en la base de datos:", error);
    }
  };

  return (
    <ImageBackground
      source={require("./img/campo2.jpeg")}
      style={styles.imageBackground}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          marginTop: 50,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Register</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            width: "60%",
          }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            width: "60%",
          }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Register" onPress={crearUsuarioDb} />
        <TouchableOpacity
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "#27352F",
            borderRadius: 5,
          }}
          onPress={() => router.push("/login")}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            si ya estas registrado, haz click aqui para iniciar sesion
          </Text>
        </TouchableOpacity>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});
