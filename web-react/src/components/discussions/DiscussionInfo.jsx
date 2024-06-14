import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, ListGroup, Badge } from "react-bootstrap";

//Service
import { getDiscussionById } from "../../services/forumService/DiscussionService";
const DiscussionInfo = () => {
	const { discussionId } = useParams();

	const [discussion, setDiscussion] = useState({});
	const discussionById = async () => {
		let res = await getDiscussionById(discussionId);
		if (res && res.data) {
			setDiscussion(res.data);
		}
	};

	useEffect(() => {
		discussionById();
	}, [discussionId]);

	return (
		<Card>
			<Card.Header>
				<Card.Title as="h5">Discussion Info</Card.Title>
			</Card.Header>
			<Card.Body>
				<ListGroup as="ol" numbered>
					<ListGroup.Item
						as="li"
						className="d-flex justify-content-between align-items-start"
					>
						<div className="ms-2 me-auto">
							<div className="fw-bold">
								Started by: <span>{discussion?.createdBy}</span>
							</div>
						</div>
					</ListGroup.Item>
					<ListGroup.Item
						as="li"
						className="d-flex justify-content-between align-items-start"
					>
						<div className="ms-2 me-auto">
							<div className="fw-bold">
								Lasted by:{" "}
								<span>{discussion?.stat?.lastComment?.commenter}</span>
							</div>
						</div>
					</ListGroup.Item>
					{/* <ListGroup.Item
						as="li"
						className="d-flex justify-content-between align-items-start"
					>
						<div className="ms-2 me-auto">
							<div className="fw-bold">Discussion Tags</div>
						</div>
						<Badge bg="primary" pill>
							{forum.stat?.commentCount}
						</Badge>
					</ListGroup.Item> */}
					<ListGroup.Item
						as="li"
						className="d-flex justify-content-between align-items-start"
					>
						<div className="ms-2 me-auto">
							<div className="fw-bold">Comments</div>
						</div>
						<Badge bg="primary" pill>
							{discussion?.comments?.length}
						</Badge>
					</ListGroup.Item>
				</ListGroup>
			</Card.Body>
		</Card>
	);
};

export default DiscussionInfo;
