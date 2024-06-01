import { Route, Routes } from "react-router-dom";
import NotFound from "../components/errorPage/NotFound";
import Home from "../components/homePage/Home";
import ForumGroup from "../components/forumsPage/ForumGroup";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import OAuth2RedirectHandler from "../components/auth/oauth2/OAuth2RedirectHandler";

import Discussion from "../components/discussions/Discussions";
import ViewDiscussion from "../components/discussions/ViewDiscussion";
import ListDiscussions from "../components/discussions/ListDiscussions";

import MemberList from "../components/memberPage/MemberListPage";
import MemberProfile from "../components/memberProfilePage/MemberProfilePage";

import Layout from "../layouts/Layout";
import ForgotPassword from "../components/auth/resetPassword/ForgotPassword";
import UpdatePassword from "../components/auth/resetPassword/UpdatePassword";
import Unauthorized from "../components/errorPage/Unauthorized";
import RequireAuth from "../components/auth/RequireAuth";
import TermsAndConditions from "../components/otherPage/TermsAndConditions";
import PrivacyPolicy from "../components/otherPage/PrivacyPolicy";
import RedirectHandlerAfterLogin from "../components/auth/RedirectHandlerAfterLogin";


const ROLES = {
	ADMIN: "ROLE_ADMIN",
	USER: "ROLE_USER",
	MOD: "ROLE_MOD",
};

function AppRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<LoginForm />} />
			<Route path="/register" element={<RegisterForm />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/reset-password" element={<UpdatePassword />} />

			<Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

			<Route path="/" element={<Layout route="routes1" />}>
				{/* public route */}
				<Route path="unauthorized" element={<Unauthorized />} />

				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/term" element={<TermsAndConditions />} />
				<Route path="/policy" element={<PrivacyPolicy />} />

				<Route path="/forumGroup" element={<ForumGroup />} />

				<Route path="/forum/:forumId" element={<Discussion />} />
				<Route path="/discussion/:discussionId" element={<ViewDiscussion />} />

				<Route path="/list-discussion" element={<ListDiscussions />} />

				<Route path="/members" element={<MemberList />} />

				<Route
					element={
						<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.MOD, ROLES.USER]} />
					}
				>
					<Route path="/redirect-to" element={<RedirectHandlerAfterLogin />} />
					<Route path="/member-profile/:username" element={<MemberProfile />} />

				</Route>

				{/* catch all */}
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default AppRoutes;
