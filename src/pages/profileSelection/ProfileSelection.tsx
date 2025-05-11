import { ProfileCard } from "../../components/profileCard/ProfileCard";
import { Button } from "../../components/button/Button";
import "./ProfileSelection.css";
import { useEffect, useState } from "react";
import { db } from "../../dataBase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ProfileData } from "../../types";

export const ProfileSelection = () => {
  const [profiles, setProfiles] = useState<ProfileData>();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const userId = currentUser ? currentUser.uid : null; // Obtener el ID del usuario

  useEffect(() => {
    if (!userId) {
      console.log("No user is logged in.");
      return;
    }

    const fetchProfiles = async () => {
      // Paso 1: Buscar al usuario logueado en la colección de usuarios
      const usersCol = collection(db, "users");
      const userQuery = query(usersCol, where("id", "==", userId)); // Buscamos el usuario por su ID
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        console.error("User not found");
        return;
      }

      const userDoc = userSnapshot.docs[0];
      const profilesIds = userDoc.data().profiles; // Array de profileIds

      // Paso 2: Buscar los perfiles que corresponden a este usuario
      const profilesCol = collection(db, "profiles");
      const profilesQuery = query(profilesCol, where("id", "in", profilesIds)); // Consulta de perfiles usando los profileIds
      const profilesSnapshot = await getDocs(profilesQuery);

      const profilesList = profilesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        eventId: doc.id, // Asegurándonos de pasar el ID del perfil para usarlo en ProfileCard
      }));
      console.log(profilesList);
      setProfiles(profilesList); // Actualizamos el estado con los perfiles encontrados
    };

    fetchProfiles();
  }, [userId]); // Dependencia del userId para que se ejecute cuando haya un usuario logueado

  return (
    <div className="profile-selection">
      <Button className="primary" children={"Add dog"} size={"large"} />

      <div className="profiles-container">
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            eventId={profile.eventId} // Pasamos el eventId a cada ProfileCard
          />
        ))}
      </div>
    </div>
  );
};
