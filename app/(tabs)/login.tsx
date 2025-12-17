
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { useRouter } from "expo-router";
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "137817998022-m7bvtv92p9qc7l86nmt261c30m8misbo.apps.googleusercontent.com",
    webClientId: "137817998022-qbcp5bo1jjsv24e147u51bgj0l0dti3e.apps.googleusercontent.com",
   
    scopes: ["openid", "profile", "email"],
    responseType: "id_token",

    redirectUri: AuthSession.makeRedirectUri({
    scheme: "mobileagroappi",  
    }),
  });

  const auth = getAuth();

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 30 }}>Login</h1>

      <form
        onSubmit={handleLogin}
        style={{
          fontSize: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 10, width: 300, height: 30, borderRadius: 5 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 10, width: 300, height: 30, borderRadius: 5 }}
        />

        <button type="submit">Login</button>
      </form>

      <TouchableOpacity
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "#4285F4",
          borderRadius: 5,
        }}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Login with Google</Text>
      </TouchableOpacity>

      {error && <p>{error}</p>}
    </View>
  );
}  