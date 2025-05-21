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

  // const handleEditType = () => {
  //   if (editable === "string") {
  //     return (
  //       <Input
  //         name={reference.dbCategory}
  //         className={` ${
  //           // Pasa la clase al componente Input
  //           categoryValue.length === 0 || categoryValue.length > 20
  //             ? "input--error"
  //             : ""
  //         }`}
  //         editable="string"
  //         value={categoryValue}
  //         onChange={(e) => setCategoryValue(e.target.value)}
  //       />
  //     );
  //   } else if (selectData !== undefined) {
  //     return (
  //       <Input
  //         name={reference.dbCategory}
  //         className={` ${
  //           // Pasa la clase al componente Input
  //           categoryValue.length === 0 || categoryValue.length > 20
  //             ? "input--error"
  //             : ""
  //         }`}
  //         value={categoryValue}
  //         editable="select"
  //         selectData={selectData}
  //         onChange={(e) => setCategoryValue(e.target.value)}
  //       />
  //     );
  //   }
  // };
  // console.log(typeof categoryValue, categoryValue);
  return (
    <>
      <InfoCategory {...props} updateFunction={updateProfileInfo} />
    </>
  );
};
