import { ProfileCard } from "../../components/profileCard/ProfileCard";
import { Button } from "../../components/button/Button";
import "./ProfileSelection.css";
import dogUser from "../../imgs/dogUser.jpg";

export const ProfileSelection = () => {
  return (
    <div className="profile-selection">
      <Button className="primary" children={"Add dog"} />

      <div className="profiles-container">
        <ProfileCard name={"Tom"} rating={3} events={3} img={dogUser} />
        <ProfileCard name={"Tom"} rating={3} events={3} img={dogUser} />
        <ProfileCard name={"Tom"} rating={3} events={3} img={dogUser} />
      </div>
    </div>
  );
};
