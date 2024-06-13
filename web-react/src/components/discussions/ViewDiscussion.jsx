import BannerTop from "../bannerTop/BannerTop";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Card, Row, Col, Button } from "reactstrap";

//Service
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../services/createInstance";
import { getDiscussionById } from "../../services/forumService/DiscussionService";
import { createComment } from "../../services/forumService/CommentService";
import { upVote, downVote } from "../../services/voteService/voteService";

//Modal
import DiscussionInfo from "./DiscussionInfo";
import Avatar from "../avatar/Avatar";
import "./stylecomment.scss";
const ViewDiscussion = () => {
	const { discussionId } = useParams();
	const [contentByDiscussion, setContentByDiscussion] = useState("");
	const [commentsByTitle, setCommentsByTitle] = useState([]);
	const [comments, setComments] = useState([]);
	const [discussion, setDiscussion] = useState({});

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.login?.currentUser);
	let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");

	const [isShowAddNewComment, setIsShowAddNewComment] = useState(false);

	const [isBookmark, setIsBookMark] = useState(false);

	const discussionById = async () => {
		let res = await getDiscussionById(discussionId);
		if (res && res.data) {
			setDiscussion(res.data);
			setComments(res.data.comments);
			const matchingComment = res.data.comments.find(
				(comment) => comment.title === res.data.title
			);
			if (matchingComment) {
				setCommentsByTitle([matchingComment]);
				setContentByDiscussion(matchingComment.content);
				setIsBookMark(isBookmarkOfCurrentUser()); //setBookmark state
			}
		}
	};

	const commentAdd = {
		title: title,
		content: content,
	};

	const handleAddNewComment = async () => {
		try {
			let res = await createComment(
				discussionId,
				commentAdd,
				currentUser?.accessToken,
				axiosJWT
			);
			if (res && +res.data?.status === 201) {
				setIsShowAddNewComment(false);
				setContent("");
				setTitle("");
				setComments([res.data.data, ...comments]);
				discussionById();
				toast.success(res.data.message);
			} else {
				toast.error("Error when creating Forum");
			}
		} catch (error) {
			console.error("Error:", error);
			toast.error("Error when creating Forum");
		}
	};

	useEffect(() => {
		discussionById();
	}, [discussionId]);

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Intl.DateTimeFormat("en-US", options).format(
			new Date(dateString)
		);
	};

	const toolbarOptions = [
		["bold", "italic", "underline", "strike"], // toggled buttons
		["blockquote", "code-block"],
		["link", "image", "video", "formula"],

		[{ header: 1 }, { header: 2 }], // custom button values
		[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
		[{ script: "sub" }, { script: "super" }], // superscript/subscript
		[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
		[{ direction: "rtl" }], // text direction

		[{ size: ["small", false, "large", "huge"] }], // custom dropdown
		[{ header: [1, 2, 3, 4, 5, 6, false] }],

		[{ color: [] }, { background: [] }], // dropdown with defaults from theme
		[{ font: [] }],
		[{ align: [] }],

		["clean"], // remove formatting button
	];

	const module = {
		toolbar: toolbarOptions,
	};

	const isBookmarkOfCurrentUser = () => {
		const listBookmark = commentsByTitle[0]?.bookmarks;
		listBookmark?.map((item) => {
			if (item?.bookmarkBy === currentUser?.username) {
				return true;
			}
		});
		return false;
	};

	const handleUpVote = async (commentId) => {
		//check this comment had vote by username

		//vote action
		const vote = {
			commentId: commentId,
			voteName: currentUser.username,
			voteId: 1,
		};
		let res = await upVote(vote, currentUser?.accessToken, axiosJWT);
		if (res && +res.data.status === 200) {
			toast.success(res.data.message);
		} else {
			toast.error("Error when voting");
		}
	};

	const handleDownVote = async (commentId) => {
		//check this comment had vote by username

		//vote action
		const vote = {
			commentId: commentId,
			voteName: currentUser.username,
			voteId: -1,
		};
		let res = await downVote(vote, currentUser?.accessToken, axiosJWT);
		if (res && +res.data.status === 200) {
			toast.success(res.data.message);
		} else {
			toast.error("Error when voting");
		}
	};

	return (
		<section className="discussion-details content mb-3">
			<Col>
				<BannerTop bannerName={discussion.title} breadcrumbs={[discussion]} />
			</Col>

			<Col className="mx-auto row">
				<Row>
					<Col className="mb-3 col-12 col-md-8 col-lg-9">
						<section className="card mb-3 p-3">
							<Row>
								<div className="col-1 vote-container">
									<button
										className="vote fa-solid fa-caret-up"
										onClick={() => handleUpVote(commentsByTitle[0]?.id)}
									></button>
									<button className="vote-count px-2 rounded-circle">
										100
									</button>
									<button
										className="vote fa-solid fa-caret-down"
										onClick={() => handleDownVote(commentsByTitle[0]?.id)}
									></button>

									<button className="fa-solid fa-check text-success mb-3"></button>
									{isBookmark ? (
										<button className="fa-solid fa-bookmark fa-2x"></button>
									) : (
										<button className="fa-regular fa-bookmark"></button>
									)}
								</div>
								<div className="col-11">
									<div className="card-header d-flex justify-content-between">
										{/* <strong>{commentsByTitle[0].createdBy}</strong> */}
										{commentsByTitle[0] && (
											<span className="ml-0 me-auto">
												<Avatar
													username={"@" + commentsByTitle[0]?.createdBy}
													height={50}
													width={50}
												/>
												<small>
													post at:{formatDate(commentsByTitle[0].createdAt)}
													<button className="fa-solid fa-user-plus"></button>
													<br />
													<i
														className="fa-solid fa-star"
														alt="reputation"
													></i>{" "}
													12 || <i className="fa-solid fa-pen"></i> 12
												</small>
											</span>
										)}

										{commentsByTitle[0] &&
											currentUser.username ===
												commentsByTitle[0]?.createdBy && (
												<small className="ml-auto me-0 d-inline-block">
													<button className="mx-2 fa-solid fa-edit fa-2x"></button>
													<button className="mx-2 fa-solid fa-xmark fa-2x"></button>
												</small>
											)}
									</div>
									<hr />
									<div className="card-body">
										<div
											className="contentByDiscussion"
											dangerouslySetInnerHTML={{ __html: contentByDiscussion }}
										></div>
										<span>
											<button className="btn btn-sm mx-2">Tag 1</button>
											<button className="btn btn-sm mx-2">Tag 2</button>
										</span>
									</div>
									<hr />
									<div className="card-footer d-flex justify-content-between">
										<span>
											<button>
												<i className="fa-solid fa-reply"></i>Reply
											</button>
										</span>
										<span>
											<button>
												<i className="fa-regular fa-flag"></i>Report
											</button>
										</span>

										<span>
											<small>
												Edit at:{" "}
												{commentsByTitle[0]?.updatedAt &&
													formatDate(commentsByTitle[0].updatedAt)}
											</small>
										</span>
									</div>
								</div>
							</Row>
						</section>
						{comments?.map((comments) => {
							if (comments.title !== discussion.title) {
								return (
									<>
										<section className="card mb-3 p-3" key={comments._id}>
											<div className="card-header">
												{comments.createdBy}
												<br />
												<div>{formatDate(comments.createdAt)}</div>
											</div>
											<div className="card-body">
												<div>{comments.title}</div>
												<div
													className="comments"
													dangerouslySetInnerHTML={{ __html: comments.content }}
												></div>
											</div>
											<div className="card-footer ">
												<span>
													<button>Reply</button>
													<button>Vote</button>
												</span>
												<span>
													<button>Like</button>
													<button>Dislike</button>
												</span>
											</div>
										</section>
									</>
								);
							}
						})}
						{isShowAddNewComment && (
							<section className="card mb-3 p-3">
								<div>
									<b>Add new Comment</b>
									<form>
										<div className="form-group mb-3">
											<label className="form-label" htmlFor="title">
												Title
											</label>
											<input
												className="form-control"
												id="title"
												type="text"
												value={title}
												onChange={(event) => setTitle(event.target.value)}
												placeholder="Enter Title"
											/>
										</div>

										<div className="form-group mb-3">
											<label htmlFor="content">Content</label>
											<ReactQuill
												theme="snow"
												modules={module}
												value={content}
												onChange={setContent}
												id="content"
												placeholder="Enter content here"
											/>
										</div>

										<div className="mb-3">
											<Button
												type="reset"
												className="btn btn-secondary w-25 mx-3"
												onClick={() => setIsShowAddNewComment(false)}
											>
												Cancel
											</Button>
											<Button
												className="btn btn-primary w-25"
												onClick={() => handleAddNewComment()}
											>
												Add new
											</Button>
										</div>
									</form>
								</div>
							</section>
						)}
					</Col>
					{/* right column */}
					<Col className="mb-3 col-12 col-md-4 col-lg-3">
						<Card className="card">
							<button
								className="btn btn-success w-100 h-100 m-0"
								onClick={() => setIsShowAddNewComment(true)}
							>
								<i className="fa-solid fa-circle-plus"></i>
								<></>
								Add New Comment
							</button>
						</Card>
						<Card className="card px-3 h-100">
							<DiscussionInfo />
						</Card>
					</Col>
				</Row>
			</Col>
		</section>
	);
};

export default ViewDiscussion;
