import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { InfoCategoryProps } from "../../types";
import { updateProfileCategoryDB } from "../../dataBase/services/updateFunctions";
import { toast } from "react-toastify";
import { InfoCategory } from "../infoCategory/InfoCategory";
import "./InfoCategoryProfile.css";

export const InfoCategoryProfile = (props: InfoCategoryProps) => {
  const { reference } = props;
  const { loggedProfile, updateAuthContext } = useContext(AuthContext);

  const updateProfileInfo = async (inputData: string) => {
    if (!loggedProfile) return;

    if (reference.dbCategory === "age") {
      const dataToNumber = Number(inputData);
      await updateProfileCategoryDB(
        loggedProfile.id,
        reference.dbCategory,
        dataToNumber
      );
    } else {
      await updateProfileCategoryDB(
        loggedProfile.id,
        reference.dbCategory,
        inputData
      );
    }
    await updateAuthContext();
    toast.success(`${reference.title} updated!`);
  };

  return (
    <>
      <InfoCategory {...props} updateFunction={updateProfileInfo} />
    </>
  );
};
