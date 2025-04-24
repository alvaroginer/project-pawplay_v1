import { setDoc, doc } from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;

    // Crear un documento en la colección 'users' con el UID como ID
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      name: "Nombre del usuario",
      lastName: "Apellido del usuario",
      profiles: [],
    });
  })
  .catch((error) => {
    console.error(error.code, error.message);
  });

signInWithEmailAndPassword(auth, email : string, password: string)
  .then((userCredential: UserCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("Usuario autenticado:", user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error al iniciar sesión:", errorCode, errorMessage);
  });
