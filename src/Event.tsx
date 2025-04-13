import { useParams } from "react-router";

export const Event = () => {
  const params = useParams();
  console.log(params);
  return <div>Esto es Event</div>;
};
