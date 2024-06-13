import { List } from "reactstrap";
import PropTypes from "prop-types";
import { formatDifferentUpToNow } from "../../utils/FormatDateTimeHelper";
import { useEffect } from "react";

const ForumInfo = (props) => {
	const { forum, listDiscussions } = props;

	useEffect(() => {}, [forum, listDiscussions]);

	return (
		<div className="p-3">
			<h4>
				<i className="fa-solid fa-circle-info"></i> <></>
				Forum Info
			</h4>
			<List>
				<li>
					Forms: <span>{forum?.title}</span>{" "}
				</li>
				<li>
					Discussions: <span>{listDiscussions?.length}</span>{" "}
				</li>
				<li>Discussion Tags: 1</li>
				<li>Comments: {forum.stat?.commentCount}</li>
				{forum.stat?.lastComment && (
					<li>
						Last Comment: {forum.stat?.lastComment.commenter} -{" "}
						{forum.stat?.lastComment.commentDate
							? formatDifferentUpToNow(forum.stat?.lastComment.commentDate)
							: ""}
					</li>
				)}
				<li>Members: 1</li>
				<li>Latest Member: admin - 5 days ago</li>
				<li>Logging on Members: 0</li>
				<li>Anonymous Users: 1</li>
				<li>Chat Rooms: 1</li>
			</List>
		</div>
	);
};

ForumInfo.propTypes = {
	forum: PropTypes.object.isRequired,
	listDiscussions: PropTypes.array.isRequired,
};

export default ForumInfo;
