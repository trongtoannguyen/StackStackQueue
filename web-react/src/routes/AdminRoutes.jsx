import { Route, Routes } from "react-router-dom";
import NotFound from "../components/errorPage/NotFound";
import DashBoard from "../components/adminPage/adminDashBoard/DashBoard";
import AdminLayout from "../layouts/AdminLayout";
import TableUsers from "../components/adminPage/userManage/TableUsers";
import ForumManage from "../components/adminPage/forumManage/ForumManage";
import DiscussionManage from "../components/adminPage/discussionManage/DiscussionManage";

import '../assets/scss/paper-dashboard.scss?v=1.3.0';
import TagsStat from "../components/adminPage/tagManage/TagsStat";
import UserProfile from "../components/adminPage/userManage/UserProfile";
import RequireAuth from "../components/auth/RequireAuth";

const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
  MOD: 'ROLE_MOD'
}


function AdminRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<AdminLayout />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.MOD]} />}>
          <Route exact path="/" element={<DashBoard />} />
          <Route exact path="/dashboard" element={<DashBoard />} />

          <Route exact path="/forums" element={<ForumManage />} />
          <Route exact path="/discussions" element={<DiscussionManage />} />

          <Route exact path="/tags" element={<TagsStat />} />

          <Route exact path="/users" element={<TableUsers />} />
          <Route exact path="/user-page" element={<UserProfile />} />
        </Route>

        <Route exact path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes;