import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BannerTop from "../bannerTop/BannerTop";
import { Col, Row, Card, ListGroup } from "react-bootstrap";

//Service
import { getAllForumGroup } from "../../services/forumService/ForumGroupService";
import { getAllForum } from "../../services/forumService/ForumService";

//Page
import ForumInfo from "./ForumInfo";
import LastCommentInfo from "../lastCommentInfo/lastCommentInfo";

//Icon
import {
	FaBeer,
	FaCoffee,
	FaApple,
	FaAndroid,
	FaHome,
	FaUser,
	FaEnvelope,
	FaBell,
	FaHeart,
	FaStar,
	FaComment,
	FaThumbsUp,
	FaThumbsDown,
	FaCheck,
	FaTimes,
	FaSearch,
	FaCog,
	FaTrash,
	FaEdit,
	FaSave,
} from "react-icons/fa";

const ForumGroup = () => {
	const bannerName = "Forums Index";
	const breadcrumbs = [{ id: 1, name: "Forums", link: "/forums" }];

	const [forumGroup, setForumGroup] = useState([]);
	const [forum, setForum] = useState([]);

	const listForumGroup = async () => {
		let res = await getAllForumGroup();
		if (res && res.data) {
			setForumGroup(res.data);
		}
	};

	const listForums = async () => {
		let res = await getAllForum();
		if (res && res.data) {
			setForum(res.data);
		}
	};

	const renderIcon = (iconName) => {
		switch (iconName) {
			case "FaBeer":
				return <FaBeer />;
			case "FaCoffee":
				return <FaCoffee />;
			case "FaApple":
				return <FaApple />;
			case "FaAndroid":
				return <FaAndroid />;
			case "FaHome":
				return <FaHome />;
			case "FaUser":
				return <FaUser />;
			case "FaEnvelope":
				return <FaEnvelope />;
			case "FaBell":
				return <FaBell />;
			case "FaHeart":
				return <FaHeart />;
			case "FaStar":
				return <FaStar />;
			case "FaComment":
				return <FaComment />;
			case "FaThumbsUp":
				return <FaThumbsUp />;
			case "FaThumbsDown":
				return <FaThumbsDown />;
			case "FaCheck":
				return <FaCheck />;
			case "FaTimes":
				return <FaTimes />;
			case "FaSearch":
				return <FaSearch />;
			case "FaCog":
				return <FaCog />;
			case "FaTrash":
				return <FaTrash />;
			case "FaEdit":
				return <FaEdit />;
			case "FaSave":
				return <FaSave />;
			default:
				return null;
		}
	};

	useEffect(() => {
		listForums();
		listForumGroup();
		console.log(forum);
	}, []);

	return (
		<section className="forums-container content">
			<Col md="12">
				<BannerTop bannerName={bannerName} breadcrumbs={breadcrumbs} />
			</Col>

			<Col md="12">
				<Row>
					<Col md={8}>
						<Col className="forum-list">
							{forumGroup?.map((forumGroup, index) => {
								return (
									<Card key={(forumGroup.id, index)}>
										<Card.Header
											style={{ backgroundColor: "rgb(75, 104, 219)" }}
										>
											<Card.Title className="d-flex">
												{renderIcon(forumGroup.icon)}
												<h4>{forumGroup.title}</h4>
											</Card.Title>
										</Card.Header>
										<Card.Body>
											<ListGroup as="ol" numbered>
												{forum?.map((forum) => {
													if (forum.idForumGroup == forumGroup.id) {
														if (forum.active == true) {
															return (
																<Row key={forum.id}>
																	<ListGroup.Item
																		as="li"
																		className="d-flex justify-content-between align-items-start"
																	>
																		<div className="col-12 col-md-6">
																			<div className="row col-12 d-flex">
																				<span className="col-2">
																					{renderIcon(forum.icon)}
																				</span>
																				<span className="col-9 fw-bold">
																					<Link
																						to={`/forum/${forum.id}`}
																						style={{
																							textDecoration: "none",
																							color: forum.color,
																						}}
																					>
																						{forum.title}
																					</Link>
																				</span>
																			</div>

																			<div className="col-12">
																				{forum.description}
																			</div>
																		</div>
																		<div className="col-6 col-md-2">
																			discussions:{" "}
																			{forum?.stat?.discussionCount} <br />
																			comments: {forum?.stat?.commentCount}
																		</div>
																		<div className="col-6 col-md-4">
																			{forum?.stat?.lastComment && (
																				<LastCommentInfo
																					comment={forum?.stat?.lastComment}
																				/>
																			)}
																		</div>
																	</ListGroup.Item>
																</Row>
															);
														}
													}
												})}
											</ListGroup>
										</Card.Body>
									</Card>
								);
							})}
						</Col>
					</Col>
					<Col md={4}>
						<ForumInfo />
					</Col>
				</Row>
			</Col>
		</section>
	);
};

export default ForumGroup;
