import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import React from "react";
import { Button, Text, TextInput, View } from "react-native";
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
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
    </View>
  );
}
