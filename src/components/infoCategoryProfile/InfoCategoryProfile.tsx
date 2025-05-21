import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { InfoCategoryProps } from "../../types";
import { updateProfileCategoryDB } from "../../dataBase/services/updateFunctions";
import { toast } from "react-toastify";
import { InfoCategory } from "../infoCategory/InfoCategory";
import "./InfoCategory.css";

export const EventCategory = (props: InfoCategoryProps) => {
  const { reference } = props;
  //const [isEditable, setIsEditable] = useState<boolean>(false);
  //const [categoryValue, setCategoryValue] = useState<string>(info ?? "");
  const { loggedProfile, updateAuthContext } = useContext(AuthContext);

  const updateProfileInfo = async (inputData: string) => {
    //setCategoryValue(inputData);
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
    toast(`${reference.title} updated!`);
  };

  return (
    <>
      <InfoCategory {...props} updateFunction={updateProfileInfo} />
    </>
  );
};
