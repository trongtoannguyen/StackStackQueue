import NotFound from "../../errorPage/NotFound";

import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";

function ValidateUser() {
  let params = useParams();
  let userId = RegExp(/\d+/).exec(params?.id);

  if (!userId) {
    return <NotFound />
  }
  return <UserProfile id={params.userId} />
}

export default ValidateUser;