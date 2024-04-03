import { Route, Routes } from "react-router-dom";
import NotFound from "../components/errorPage/NotFound";
import Home from "../components/homePage/Home";
import ForumGroup from "../components/forumsPage/ForumGroup";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import Discussion from "../components/discussions/Discussions";
import MemberList from "../components/memberPage/MemberList";
import TableUsers from "../components/admin/userManage/TableUsers";
import Layout from "../components/layout/Layout";
import ViewDiscussion from "../components/discussions/ViewDiscussion";
import ListDiscussions from "../components/discussions/ListDiscussions";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/forums" element={<ForumGroup />} />

        <Route exact path="/forums/1" element={<Discussion />} />
        <Route exact path="/discussion/1" element={<ViewDiscussion />} />

        <Route exact path="/list-discussion" element={<ListDiscussions />} />


        <Route exact path="/members" element={<MemberList />} />

        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/register" element={<RegisterForm />} />

        <Route exact path="/users" element={<TableUsers />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;