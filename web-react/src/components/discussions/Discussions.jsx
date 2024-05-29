import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import BannerTop from "../bannerTop/BannerTop";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LastCommentInfo from "../lastCommentInfo/lastCommentInfo";
import _ from "lodash";

//Model
import ForumInfo from "../forumsPage/ForumInfo";
import ModalAddDiscussion from "./ModalAddDiscussion";
import ModalUpdateDiscussion from "./ModelUpdateDiscussion";

//Services
import { getForumById } from "../../services/forum/Forum";
import { getAllDiscussion } from "../../services/forum/Discussion";

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

	const currentUser = useSelector((state) => state.auth.login?.currentUser);

	const handlePageClick = (event) => {
		console.log(event);
	};

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
	const listDiscussionsByForum = async () => {
		try {
			let res = await getAllDiscussion(); // Ensure this service filters by forumId
			if (res && res.data) {
				const filteredDiscussions = res.data.filter(
					(discussion) => discussion.forum.id === parseInt(forumId)
				);
				setListDiscussions(filteredDiscussions);
			}
		} catch (error) {
			console.error("Error fetching discussions:", error);
		}
	};

	const handleUpdateAddDiscussion = (discussion) => {
		setListDiscussions([discussion, ...listDiscussions]);
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

	useEffect(() => {
		if (listDiscussions.length === 0) listDiscussionsByForum();
		// listDiscussionsByForum();
		listForums();
	}, []);
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Intl.DateTimeFormat("en-US", options).format(
			new Date(dateString)
		);
	};

	return (
		<section className="discussion-container content mb-3">
			<Col>
				<BannerTop bannerName={forum.title} breadcrumbs={[forum]} />
			</Col>
			<Col className="mx-auto row">
				<Row>
					<Col md="8" lg="9">
						<Card>
							<div className="pagination pagination-top">
								<ReactPaginate
									breakLabel="..."
									nextLabel="next >"
									onPageChange={handlePageClick}
									pageRangeDisplayed={5}
									pageCount={15}
									previousLabel="< previous"
									pageClassName="page-item"
									pageLinkClassName="page-link"
									previousClassName="page-item"
									previousLinkClassName="page-link"
									nextClassName="page-item"
									nextLinkClassName="page-link"
									breakClassName="page-item"
									breakLinkClassName="page-link"
									containerClassName="pagination"
									activeClassName="active"
								/>
							</div>
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
										console.log(item);
										return (
											<tr key={item.id} className="m-2">
												<td>
													<h4>
														<Link to={`/discussion/${item.id}`}>
															{item.title}
														</Link>
														{item.createdBy === currentUser.username && (
															<button
																onClick={() => handleEditDiscussion(item)}
															>
																<i className="fa-solid fa-pencil"></i>
															</button>
														)}
													</h4>
													<span>{item.createdBy} </span>
													<span>{formatDate(item.createdAt)}</span>
													<span>{item.tags}</span>
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
								<ReactPaginate
									breakLabel="..."
									nextLabel="next >"
									onPageChange={handlePageClick}
									pageRangeDisplayed={5}
									pageCount={15}
									previousLabel="< previous"
									pageClassName="page-item"
									pageLinkClassName="page-link"
									previousClassName="page-item"
									previousLinkClassName="page-link"
									nextClassName="page-item"
									nextLinkClassName="page-link"
									breakClassName="page-item"
									breakLinkClassName="page-link"
									containerClassName="pagination"
									activeClassName="active"
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
						<Card>
							<ForumInfo />
						</Card>
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
