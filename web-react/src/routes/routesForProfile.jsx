import ForumGroup from "../components/forumsPage/ForumGroupPage";
import MemberList from "../components/memberPage/MemberListPage";
import { MyProfile } from "components/profilePage/MyProfile";

const routes = [
  {
    path: "/account/:accountId",
    name: "Account",
    icon: "fa-solid fa-house",
    component: <MyProfile />,
    layout: ""
  },
  {
    path: "/account/:accountId/my-comments",
    name: "My Comment",
    icon: "fa-solid fa-list fa-xl",
    component: <ForumGroup />,
    layout: ""
  },
  {
    path: "/account/:accountId/my-post",
    name: "My Post",
    icon: "fa-regular fa-newspaper",
    component: <MemberList />,
    layout: ""
  },


];


export default routes;