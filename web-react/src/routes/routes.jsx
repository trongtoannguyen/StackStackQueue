import RegisterForm from "../components/authPage/RegisterForm";
import Home from "../components/homePage/Home";
import ForumGroup from "../components/forumsPage/ForumGroup";
import MemberList from "../components/memberPage/MemberListPage";

const routes = [
	{
		path: "/home",
		name: "home",
		icon: "fa-solid fa-house",
		component: <Home />,
		layout: "",
	},
	{
		path: "/forumGroup",
		name: "forums",
		icon: "fa-solid fa-list fa-xl",
		component: <ForumGroup />,
		layout: "",
	},
	{
		path: "/members",
		name: "members",
		icon: "fa-solid fa-users",
		component: <MemberList />,
		layout: "",
	},
	{
		path: "/my-post",
		name: "your post",
		icon: "fa-regular fa-newspaper",
		component: <MemberList />,
		layout: "",
	},
	{
		path: "/viewed-post",
		name: "viewed post",
		icon: "fa-solid fa-clock-rotate-left",
		component: <MemberList />,
		layout: "",
	},
	{
		path: "/liked-post",
		name: "liked post",
		icon: "fa-regular fa-thumbs-up",
		component: <RegisterForm />,
		layout: "",
	},
	{
		path: "/subscription",
		name: "subscription",
		icon: "fa-solid fa-user-plus",
		component: <RegisterForm />,
		layout: "",
	},
	{
		path: "/feedback",
		name: "feedback",
		icon: "fa-regular fa-flag",
		component: <RegisterForm />,
		layout: "",
	},
];

export default routes;
