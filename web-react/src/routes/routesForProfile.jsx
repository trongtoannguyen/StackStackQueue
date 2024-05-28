import ForumGroup from "../components/forumsPage/ForumGroupPage";
import MemberList from "../components/memberPage/MemberListPage";

const routes = [
  {
    path: "/account/:accountId",
    name: "Account",
    icon: "fa-solid fa-house",
    component: <ForumGroup />,
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