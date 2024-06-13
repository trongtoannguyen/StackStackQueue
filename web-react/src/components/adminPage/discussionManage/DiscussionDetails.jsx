import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

//Service
import { getDiscussionById } from "../../../services/forumService/DiscussionService";

//Utils
import { formatDate } from "../../../utils/FormatDateTimeHelper";

const TagsManage = () => {
	//Discussion
	const { discussionId } = useParams();

	const [discussion, setDiscussion] = useState({});
	console.log(discussion);

	const discussionById = async () => {
		let res = await getDiscussionById(discussionId);
		if (res && res.data) {
			setDiscussion(res.data);
		}
	};

	const [tags, setTags] = useState("");

	useEffect(() => {
		discussionById();
	}, [discussionId]);
	return (
		<div className="container mt-4">
			<p>
				Started by <strong>{discussion?.createdBy}</strong> -{" "}
				{formatDate(discussion?.createdAt)}
			</p>
			<p>
				In forum <strong>{discussion?.forum?.title}</strong>{" "}
				<Button variant="link" size="sm"></Button> Move to new Forum
			</p>
			<div>
				<div className="mb-3">
					<button
						type="checkbox"
						label="This discussion is OPEN"
						onClick={() => {}}
					/>
				</div>
				<div className="mb-3">
					<label>Mark as Important</label>
					<button type="checkbox" onClick={() => {}}></button>
				</div>
				<div className="mb-3">
					<label>Tags</label>
					<button
						type="text"
						placeholder="Enter tags"
						value={tags}
						onChange={() => {}}
					/>
					<Button variant="primary" onClick={() => {}} className="mt-2">
						Apply
					</Button>
				</div>
				<Button variant="danger" onClick={() => {}}>
					Delete this Discussion?
				</Button>
			</div>
			<hr />
			<p>
				There are 1 comments in this discussion. This discussion has been viewed
				1 times
			</p>
		</div>
	);
};

export default TagsManage;
