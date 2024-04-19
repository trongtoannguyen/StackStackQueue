import DashBoard from "../components/admin/adminDashBoard/DashBoard"
import DiscussionManage from "../components/admin/discussionManage/DiscussionManage";
import ForumManage from "../components/admin/forumManage/ForumManage";
import TagsStat from "../components/admin/tagManage/TagsStat";
import TableUsers from "../components/admin/userManage/TableUsers"
import UserProfile from "../components/admin/userManage/UserProfile";
import ViewDiscussion from "../components/discussions/ViewDiscussion";

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    icon: "fa-solid fa-building-columns",
    component: <DashBoard />,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "users",
    icon: "fa-solid fa-people-group",
    component: <TableUsers />,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "profile",
    icon: "fa-solid fa-user",
    component: <UserProfile />,
    layout: "/admin"
  },
  {
    path: "/forums",
    name: "forums",
    icon: "fa-solid fa-users",
    component: <ForumManage />,
    layout: "/admin"
  },
  {
    path: "/discussions",
    name: "discussions",
    icon: "fa-solid fa-comments",
    component: <DiscussionManage />,
    layout: "/admin"
  },
  {
    path: "/comments",
    name: "comments",
    icon: "fa-solid fa-comment",
    component: <ViewDiscussion />,
    layout: "/admin"
  },
  {
    path: "/tags",
    name: "tags",
    icon: "fa-solid fa-tags",
    component: <TagsStat />,
    layout: "/admin"
  }
];


export default routes;