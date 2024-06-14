import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import BannerTop from "../bannerTop/BannerTop";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LastCommentInfo from "../lastCommentInfo/lastCommentInfo";
import _ from "lodash";
import { useDispatch } from "react-redux";

//Model
import ForumInfo from "./ForumInfo";
import ModalAddDiscussion from "./ModalAddDiscussion";
import ModalUpdateDiscussion from "./ModelUpdateDiscussion";

//Services
import { getForumById } from "../../services/forumService/ForumService";
import { getPageDiscussion } from "../../services/forumService/DiscussionService";
import { updateViews } from "../../services/forumService/DiscussionService";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../services/createInstance";

//Util
import { formatDate } from "../../utils/FormatDateTimeHelper";

//Paginate
import Pagination from "../pagination/Pagination";

//Scss
import "./Discussion.scss";

import { Card, Row, Col } from "reactstrap";
const Discussion = () => {
	const { forumId } = useParams();

	const [forum, setForum] = useState({});
	const [listDiscussions, setListDiscussions] = useState([]);

	const [showModelAddDiscussion, setShowModelAddDiscussion] = useState(false);

	const [showModelUpdateDiscussion, setShowModelUpdateDiscussion] =
		useState(false);
	const [dataUpdateDiscussion, setDataUpdateDiscussion] = useState({});

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.login?.currentUser);
	let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

	const handleClose = () => {
		setShowModelAddDiscussion(false);
		setShowModelUpdateDiscussion(false);
	};

	const listForums = async () => {
		let res = await getForumById(forumId);
		if (res && res.data) {
			setForum(res.data);
		}
	};

	//Pagination
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const handlePageClick = (event) => {
		setPage(event.selected + 1);
	};

	const listDiscussionsByForum = async () => {
		const res = await getPageDiscussion(page, 5, "id", "ASC", "", forumId);
		if (res && res.data) {
			setListDiscussions(res.data);
			setTotalPages(res.totalPages);
		} else {
			setListDiscussions([]);
		}
	};

	const handleUpdateAddDiscussion = (discussion) => {
		setListDiscussions([discussion, ...listDiscussions]);
		listForums();
	};

	const handleEditDiscussion = (discussion) => {
		setDataUpdateDiscussion(discussion);
		setShowModelUpdateDiscussion(true);
	};

	const handleEditDiscussionFromModel = (lDiscussion) => {
		let cloneListDiscussions = _.cloneDeep(listDiscussions);
		let index = cloneListDiscussions.findIndex(
			(discussion) => discussion.id === lDiscussion.id
		);
		cloneListDiscussions[index] = lDiscussion;
		setListDiscussions(cloneListDiscussions);
		listDiscussionsByForum();
	};

	const handelUpdateView = async (id) => {
		console.log(id);
		try {
			let res = await updateViews(id, currentUser?.accessToken, axiosJWT);
			if (res && res.data) {
				listDiscussionsByForum();
			}
		} catch (error) {
			console.error("Error fetching discussions:", error);
		}
	};

	useEffect(() => {
		listDiscussionsByForum();
		listForums();
	}, []);

	return (
		<section className="discussion-container content mb-3">
			<Col>
				<BannerTop bannerName={forum.title} breadcrumbs={[forum]} />
			</Col>
			<Col className="mx-auto row">
				<Row>
					<Col md="8" lg="9">
						<Card>
							<Table striped responsive hover>
								<thead>
									<tr>
										<th>Discussion Title</th>
										<th>Replies</th>
										<th>Views</th>
										<th>Last Post</th>
									</tr>
								</thead>
								<tbody>
									{listDiscussions?.map((item) => {
										return (
											<tr key={item.id} className="m-2">
												<td>
													<h4>
														<Link
															onClick={() => handelUpdateView(item.id)}
															to={`/discussion/${item.id}`}
															className="text-decoration-none text-dark"
														>
															{item.title}
														</Link>
														{item.createdBy === currentUser?.username && (
															<button
																onClick={() => handleEditDiscussion(item)}
															>
																<i className="fa-solid fa-pencil"></i>
															</button>
														)}
													</h4>
													<span>{item.createdBy} </span>
													<span>{formatDate(item.createdAt)}</span>
													{/* <span>{item.tags}</span> */}
												</td>
												<td>{item.stat.commentCount}</td>
												<td>{item.stat.viewCount}</td>
												<td>
													<LastCommentInfo comment={item.stat.lastComment} />
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
							<div className="pagination pagination-end">
								<Pagination
									handlePageClick={handlePageClick}
									pageSize={5}
									totalPages={totalPages}
								/>
							</div>
						</Card>
					</Col>
					<Col md="4" lg="3">
						<Card>
							<button
								className="btn btn-success w-100 h-100 m-0"
								onClick={() => {
									setShowModelAddDiscussion(true);
								}}
							>
								<i className="fa-solid fa-circle-plus fa-xl"></i>{" "}
								<span>Open New Discussion</span>
							</button>
						</Card>
						<ForumInfo forum={forum} listDiscussions={listDiscussions} />
					</Col>
				</Row>
			</Col>

			<ModalAddDiscussion
				show={showModelAddDiscussion}
				handleClose={handleClose}
				forumId={forumId}
				handleUpdateAddDiscussion={handleUpdateAddDiscussion}
			/>
			<ModalUpdateDiscussion
				show={showModelUpdateDiscussion}
				handleClose={handleClose}
				dataUpdateDiscussion={dataUpdateDiscussion}
				handleEditDiscussionFromModel={handleEditDiscussionFromModel}
			/>
		</section>
	);
};

export default Discussion;
