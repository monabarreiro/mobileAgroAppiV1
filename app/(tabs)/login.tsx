import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";



export default function Login() {
  const[email,setEmail]= React.useState("");
  const[password,setPassword]= React.useState("");
  const[error,setError]= React.useState("");
  const router = useRouter();


  const auth = getAuth();
  const handleLogin=async(e:any)=>{
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth,email,password);
      router.push("/SeleccionarCultivos");

    }catch(error){
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  };

  return(
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error&&<p>{error}</p>}
    </div>
  );
}
