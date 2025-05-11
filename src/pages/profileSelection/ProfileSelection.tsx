import { ProfileCard } from "../../components/profileCard/ProfileCard";
import "./ProfileSelection.css";
import { useEffect, useState } from "react";
import { db } from "../../dataBase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ProfileData } from "../../types";

// Componente principal que muestra los perfiles disponibles del usuario actual
export const ProfileSelection = () => {
  // Estado para guardar los perfiles encontrados
  const [profiles, setProfiles] = useState<ProfileData[]>([]);

  // Obtenemos el usuario actual desde Firebase Auth
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Si el usuario está logueado, obtenemos su UID
  const userId = currentUser ? currentUser.uid : null;

  // Efecto que se ejecuta una vez que tenemos el userId
  useEffect(() => {
    if (!userId) {
      // Si no hay usuario logueado, salimos del efecto
      console.log("No user is logged in.");
      return;
    }

    // Función asíncrona para obtener los perfiles del usuario logueado
    const fetchProfiles = async () => {
      // Paso 1: Buscar al usuario actual en la colección "users"
      const usersCol = collection(db, "users");
      const userQuery = query(usersCol, where("id", "==", userId)); // Comparamos por el campo "id" del documento
      const userSnapshot = await getDocs(userQuery); // Ejecutamos la consulta

      if (userSnapshot.empty) {
        // Si no se encuentra el usuario, mostramos un error
        console.error("User not found");
        return;
      }

      // Obtenemos el documento del usuario
      const userDoc = userSnapshot.docs[0];
      // Extraemos el array de IDs de perfiles asociados a ese usuario
      const profilesIds = userDoc.data().profiles;

      // Paso 2: Obtener los documentos de perfil que coincidan con esos IDs
      const profilesCol = collection(db, "profiles");
      const profilesQuery = query(profilesCol, where("id", "in", profilesIds));
      const profilesSnapshot = await getDocs(profilesQuery);

      // Convertimos los documentos obtenidos a objetos tipo ProfileData
      const profilesList: ProfileData[] = profilesSnapshot.docs.map((doc) => {
        const data = doc.data(); // Obtenemos los datos del documento
        return {
          ...data, // Copiamos todos los datos originales
          id: doc.id, // Aseguramos que el ID esté presente (en caso de que no esté incluido en los datos)
        } as ProfileData; // Especificamos que este objeto es del tipo ProfileData
      });

      console.log(profilesList); // Mostramos los perfiles por consola
      setProfiles(profilesList); // Guardamos los perfiles en el estado
    };

    // Llamamos a la función para obtener los perfiles
    fetchProfiles();
  }, [userId]); // Este efecto se ejecuta cuando cambia el userId

  // Render del componente
  return (
    <div className="profile-selection">
      <div className="profile-selection__info">
        <p className="profile-selection__title">Select a profile</p>
        <p className="profile-selection__text">
          Manage and select profiles for your dogs. Each one lets you join
          events, connect with others, and track their activity. Got a new dog?
          Just create a profile.
        </p>
      </div>
      <div className="profile-selection__profiles-container">
        {/* Mostramos una tarjeta por cada perfil del usuario */}
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            eventId={profile.id} // Renombrado para mayor claridad
          />
        ))}
      </div>
    </div>
  );
};
