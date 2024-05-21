import { Route, Routes } from "react-router-dom";
import NotFound from "../components/errorPage/NotFound";
import Layout from "../layouts/Layout";
import DashBoard from "../components/adminPage/adminDashBoard/DashBoardPage";
import UsersListManage from "../components/adminPage/userManage/UsersListManagePage";
import ForumManage from "../components/adminPage/forumManage/ForumManage";
import DiscussionManage from "../components/adminPage/discussionManage/DiscussionManage";

import TagsStat from "../components/adminPage/tagManage/TagsStat";
import UserProfile from "../components/adminPage/userManage/UserProfile";
import RequireAuth from "../components/auth/RequireAuth";
import '../assets/scss/paper-dashboard.scss?v=1.3.0';

const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
  MOD: 'ROLE_MOD'
}


function AdminRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Layout route="routesAdmin" />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.MOD]} />}>
          <Route exact path="/" element={<DashBoard />} />
          <Route exact path="/dashboard" element={<DashBoard />} />

          <Route exact path="/forums" element={<ForumManage />} />
          <Route exact path="/discussions" element={<DiscussionManage />} />

          <Route exact path="/tags" element={<TagsStat />} />

          <Route exact path="/users" element={<UsersListManage />} />
          <Route exact path="/user-page" element={<UserProfile />} />
        </Route>

        <Route exact path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes;