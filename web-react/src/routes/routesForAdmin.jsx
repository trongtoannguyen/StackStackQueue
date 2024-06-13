import DashBoard from "../components/adminPage/adminDashBoard/DashBoardPage";
import DiscussionManage from "../components/adminPage/discussionManage/DiscussionManage";
import ForumManage from "../components/adminPage/forumManage/ForumManage";
import TagsStat from "../components/adminPage/tagManage/TagsManage";
import TableUsers from "../components/adminPage/userManage/UsersListManagePage";
import DiscussionDetails from "../components/adminPage/discussionManage/DiscussionDetails";

import EmailOption from "../components/adminPage/emailOptionManage/EmailOptionPage";
import BadgeManage from "../components/adminPage/badgeManage/badgeManage";

const routes = [
	{
		path: "/dashboard",
		name: "dashboard",
		icon: "fa-solid fa-building-columns",
		component: <DashBoard />,
		layout: "/admin",
	},
	{
		path: "/users",
		name: "users manage",
		icon: "fa-solid fa-people-group",
		component: <TableUsers />,
		layout: "/admin",
	},
	{
		path: "/forums",
		name: "forums manage",
		icon: "fa-solid fa-users",
		component: <ForumManage />,
		layout: "/admin",
	},
	{
		path: "/discussions",
		name: "discussions manage",
		icon: "fa-solid fa-comments",
		component: <DiscussionManage />,
		layout: "/admin",
	},
	{
		path: "/comments",
		name: "comments manage",
		icon: "fa-solid fa-comment",
		component: <DiscussionDetails />,
		layout: "/admin",
	},
	{
		path: "/tags",
		name: "tags manage",
		icon: "fa-solid fa-tags",
		component: <TagsStat />,
		layout: "/admin",
	},
	{
		path: "/badges",
		name: "Badge manage",
		icon: "fa-solid fa-tags",
		component: <BadgeManage />,
		layout: "/admin",
	},
	{
		path: "/email-option",
		name: "Config email",
		icon: "fa-solid fa-envelope",
		component: <EmailOption />,
		layout: "/admin",
	},
];

export default routes;
