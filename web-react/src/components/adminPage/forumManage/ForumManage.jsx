import { useState, useEffect } from "react";
import _ from "lodash";

//Service
import { getAllForumGroup } from "../../../services/forum/ForumGroup";
import { getAllForum } from "../../../services/forum/Forum";

//Modal
import ModelAddForumGroup from "./ModelAddForumGroup";
import ModelUpdateForumGroup from "./ModelUpdateForumGroup";
import ModelUpdateForum from "./ModelUpdateForum";
import ModelUpdateActiveForum from "./ModelUpdateActiveForum";
import ModelDeleteForumGroup from "./ModelDeleteForumGroup";
import ModelAddForum from "./ModelAddForum";

//Css
import "./ForumManage.scss";
import { Container, Col, Row, Card, ListGroup, Badge } from "react-bootstrap";

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
const ForumManage = () => {
	const [forumGroup, setForumGroup] = useState([]);
	const [forum, setForum] = useState([]);

	const [showModelNewForumGroup, setShowModelNewForumGroup] = useState(false);

	const [dataEditForumGroup, setDataEditForumGroup] = useState({});
	const [showModelUpdateForumGroup, setShowModelUpdateForumGroup] =
		useState(false);

	const [dataDeleteForumGroup, setDataDeleteForumGroup] = useState({});
	const [showModelDeleteForumGroup, setShowModelDeleteForumGroup] =
		useState(false);

	const [showModelAddForum, setShowModelAddForum] = useState(false);
	const [idForumGroup, setIdForumGroup] = useState(0);

	const [showModelUpdateForum, setShowModelUpdateForum] = useState(false);
	const [dataUpdateForum, setDataUpdateForum] = useState({});
	const [forumIsActive, setForumIsActive] = useState(true);

	const [showModelUpdateActiveForum, setShowModelUpdateActiveForum] =
		useState(false);

	const handleClose = () => {
		setShowModelNewForumGroup(false);
		setShowModelUpdateForumGroup(false);
		setShowModelDeleteForumGroup(false);
		setShowModelAddForum(false);
		setShowModelUpdateForum(false);
		setShowModelUpdateActiveForum(false);
	};

	const handleUpdateTable = (listForumGroup) => {
		setForumGroup([listForumGroup, ...forumGroup]);
	};

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

	const handleEditForumGroup = (listForumGroup) => {
		setDataEditForumGroup(listForumGroup);
		setShowModelUpdateForumGroup(true);
	};

	const handleUpdateForumGroup = (listForumGroup) => {
		let cloneListForumGroup = _.cloneDeep(forumGroup);
		let index = cloneListForumGroup.findIndex(
			(forumGroup) => forumGroup.id === listForumGroup.id
		);
		cloneListForumGroup[index] = listForumGroup;
		setForumGroup(cloneListForumGroup);
	};

	const handleDeleteForumGroup = (listForumGroup) => {
		setDataDeleteForumGroup(listForumGroup);
		setShowModelDeleteForumGroup(true);
	};

	const handleConfirmDeleteForumGroup = (listForumGroup) => {
		let cloneListForumGroup = _.cloneDeep(forumGroup);
		cloneListForumGroup = cloneListForumGroup.filter(
			(item) => item.id !== listForumGroup.id
		);
		setForumGroup(cloneListForumGroup);
	};

	const handleUpdateForum = (listForum) => {
		setForum([listForum, ...forum]);
		listForums();
	};

	const handleAddForum = (idForumGroup) => {
		setIdForumGroup(idForumGroup);
		setShowModelAddForum(true);
	};

	const handleEditForumFromModel = (forum, isActive) => {
		setShowModelUpdateForum(true);
		setDataUpdateForum(forum);
		setForumIsActive(isActive);
	};

	const handleUpdateForumFromModel = (listForum) => {
		let cloneListForum = _.cloneDeep(forum);
		let index = cloneListForum.findIndex((forum) => forum.id === listForum.id);
		cloneListForum[index] = listForum;
		setForum(cloneListForum);
		listForums();
	};

	const handleEditActionForumFromModel = (forum, isActive) => {
		setShowModelUpdateActiveForum(true);
		setDataUpdateForum(forum);
		setForumIsActive(isActive);
	};

	useEffect(() => {
		listForumGroup();
		listForums();
	}, []);

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

	return (
		<div className="content">
			<Container>
				<Row className="col-12">
					<Col xs={12} lg={9} className="forum-list">
						<Row className="mb-3 col-12">
							<Col xs={12} lg={9}>
								<button
									className="btn btn-success"
									onClick={() => setShowModelNewForumGroup(true)}
								>
									<i className="fa-solid fa-up-long"></i>
								</button>
								<button
									className="btn btn-success"
									onClick={() => setShowModelNewForumGroup(true)}
								>
									<i className="fa-solid fa-down-long"></i>
								</button>
							</Col>
							<Col xs={12} lg={3}>
								<button
									className="btn btn-success"
									onClick={() => setShowModelNewForumGroup(true)}
								>
									<i className="fa-solid fa-plus"></i> Forum Group
								</button>
							</Col>
						</Row>
						{forumGroup?.map((forumGroup, index) => {
							return (
								<Card key={(forumGroup.id, index)}>
									<Card.Header style={{ backgroundColor: "rgb(75, 104, 219)" }}>
										<Card.Title className="d-flex">
											{renderIcon(forumGroup.icon)}
											<h4>{forumGroup.title}</h4>
											<button onClick={() => handleEditForumGroup(forumGroup)}>
												<i className="fa-solid fa-pencil"></i>
											</button>
											<button
												onClick={() => handleDeleteForumGroup(forumGroup)}
											>
												<i className="fa-solid fa-trash-can"></i>
											</button>
										</Card.Title>

										<button
											className="btn btn-success"
											onClick={() => handleAddForum(forumGroup.id)}
										>
											<i className="fa-solid fa-plus"></i> Forum
										</button>
									</Card.Header>
									<Card.Body>
										<ListGroup as="ol" numbered>
											{forum?.map((forum) => {
												if (forum.idForumGroup == forumGroup.id) {
													if (forum.active == false) {
														return (
															<Row key={forum.id}>
																<Col>
																	<ListGroup.Item
																		as="li"
																		className="d-flex justify-content-between align-items-start"
																	>
																		<div className="my-2">
																			{renderIcon(forum.icon)}
																		</div>
																		<div className="ms-2 me-auto">
																			<div className="fw-bold">
																				{forum.title}
																			</div>
																			{forum.description}
																		</div>
																		<div className="btn-forum">
																			<input
																				type="checkbox"
																				onChange={() =>
																					handleEditActionForumFromModel(
																						forum,
																						true
																					)
																				}
																			/>
																			<button
																				onClick={() =>
																					handleEditForumFromModel(
																						forum,
																						forum.active
																					)
																				}
																			>
																				<i className="fa-solid fa-pen-to-square"></i>
																			</button>
																		</div>
																	</ListGroup.Item>
																</Col>
															</Row>
														);
													}
													if (forum.active == true) {
														return (
															<Row key={forum.id}>
																<Col>
																	<ListGroup.Item
																		as="li"
																		className="d-flex justify-content-between align-items-start"
																	>
																		<div className="my-2">
																			{renderIcon(forum.icon)}
																		</div>
																		<div className="ms-2 me-auto">
																			<div className="fw-bold">
																				{forum.title}
																			</div>
																			{forum.description}
																		</div>
																		<div className="btn-forum">
																			<input
																				checked
																				type="checkbox"
																				onChange={() =>
																					handleEditActionForumFromModel(
																						forum,
																						false
																					)
																				}
																			/>
																			<button
																				onClick={() =>
																					handleEditForumFromModel(
																						forum,
																						forum.active
																					)
																				}
																			>
																				<i className="fa-solid fa-pen-to-square"></i>
																			</button>
																		</div>
																	</ListGroup.Item>
																</Col>
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

					<Col xs={12} lg={3}>
						<Card>
							<Card.Header>
								<Card.Title as="h5">Forum Info</Card.Title>
							</Card.Header>
							<Card.Body>
								<ListGroup as="ol" numbered>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-between align-items-start"
									>
										<div className="ms-2 me-auto">
											<div className="fw-bold">Subheading</div>
											Cras justo odio
										</div>
										<Badge bg="primary" pill>
											14
										</Badge>
									</ListGroup.Item>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-between align-items-start"
									>
										<div className="ms-2 me-auto">
											<div className="fw-bold">Subheading</div>
											Cras justo odio
										</div>
										<Badge bg="primary" pill>
											14
										</Badge>
									</ListGroup.Item>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-between align-items-start"
									>
										<div className="ms-2 me-auto">
											<div className="fw-bold">Subheading</div>
											Cras justo odio
										</div>
										<Badge bg="primary" pill>
											14
										</Badge>
									</ListGroup.Item>
								</ListGroup>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
			<ModelAddForumGroup
				show={showModelNewForumGroup}
				handleClose={handleClose}
				handleUpdateTable={handleUpdateTable}
			/>
			<ModelUpdateForumGroup
				dataEditForumGroup={dataEditForumGroup}
				show={showModelUpdateForumGroup}
				handleClose={handleClose}
				handleUpdateForumGroup={handleUpdateForumGroup}
			/>
			<ModelDeleteForumGroup
				dataDeleteForumGroup={dataDeleteForumGroup}
				show={showModelDeleteForumGroup}
				handleClose={handleClose}
				handleConfirmDeleteForumGroup={handleConfirmDeleteForumGroup}
			/>
			<ModelAddForum
				show={showModelAddForum}
				handleClose={handleClose}
				handleUpdateForum={handleUpdateForum}
				idForumGroup={idForumGroup}
			/>
			<ModelUpdateForum
				dataUpdateForum={dataUpdateForum}
				show={showModelUpdateForum}
				forumIsActive={forumIsActive}
				handleClose={handleClose}
				handleUpdateForumFromModel={handleUpdateForumFromModel}
			/>
			<ModelUpdateActiveForum
				dataUpdateForum={dataUpdateForum}
				show={showModelUpdateActiveForum}
				forumIsActive={forumIsActive}
				handleClose={handleClose}
				handleUpdateForumFromModel={handleUpdateForumFromModel}
			/>
		</div>
	);
};

export default ForumManage;
