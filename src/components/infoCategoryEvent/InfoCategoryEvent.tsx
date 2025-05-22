import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { InfoCategoryProps } from "../../types";
import { updateEventCategoryDB } from "../../dataBase/services/updateFunctions";
import { toast } from "react-toastify";
import { InfoCategory } from "../infoCategory/InfoCategory";
import "./InfoCategory.css";

export const InfoCategoryEvent = (props: InfoCategoryProps) => {
  const { reference } = props;
  //const [isEditable, setIsEditable] = useState<boolean>(false);
  //const [categoryValue, setCategoryValue] = useState<string>(info ?? "");
  const { loggedProfile, updateAuthContext } = useContext(AuthContext);

  if (loggedProfile === null) return;

  const updateEventInfo = async (inputData: string) => {
    //setCategoryValue(inputData);
    if (reference.dbCategory === "places") {
      const dataToNumber = Number(inputData);
      await updateEventCategoryDB(
        loggedProfile.id,
        reference.dbCategory,
        dataToNumber
      );
    } else {
      await updateEventCategoryDB(
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
      <InfoCategory {...props} updateFunction={updateEventInfo} />
    </>
  );
};
