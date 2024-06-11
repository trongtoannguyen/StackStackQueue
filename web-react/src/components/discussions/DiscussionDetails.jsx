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
import { getDiscussionById } from "../../services/forum/Discussion";
import { createComment } from "../../services/forum/Comment";
import { upVote, downVote } from "../../services/voteService/voteService";
import { getFirstCommentByDiscussionId, getAllCommentByDiscussionId } from "../../services/forum/discussionService";
import { fetchImage } from "../../services/userService/UserService";
import { registerBookmark } from "../../services/bookmarkService/bookmarkService";
//Modal
import DiscussionInfo from "./DiscussionInfo";
import Avatar from "../avatar/Avatar";
import "./stylecomment.scss";
import Pagination from "../pagination/Pagination";
//util
import { formatLongDate } from "../../utils/FormatDateTimeHelper";



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

	const [titleFG, setTitleFG] = useState({});
	const [titleForum, setTitleForum] = useState({});
	const [titleDisc, setTitleDisc] = useState({});

	const [firstComment, setFirstComment] = useState({});
	const [listComment, setListComment] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [orderBy, setOrderBy] = useState('createdAt');
	const [sortBy, setSortBy] = useState('ASC');


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
			}
		}
	};

	const fetchFirstCommentData = async () => {
		let res = await getFirstCommentByDiscussionId(discussionId);
		if (+res.status === 200 && res?.data) {
			setFirstComment(res.data?.commentInfo);
			setTitleFG({
				id: res.data.forumGroupId,
				title: res.data.forumGroupTitle
			});

			setTitleForum({
				id: res.data.forumId,
				title: res.data.forumTitle
			});

			setTitleDisc({
				id: res.data.discussionId,
				title: res.data.discussionTitle
			})
		} else {
			console.log(`Error`, res?.message);
		}
	}

	const fetchAllCommentData = async () => {
		if (discussionId === null || discussionId <= 0) {
			return;
		}
		let pageData = {
			page: page,
			size: pageSize,
			orderBy: orderBy,
			sort: sortBy,
			discussionId
		}
		let res = await getAllCommentByDiscussionId(pageData);
		console.log(`alll`,JSON.stringify(res?.data));
		if (res?.data?.length > 0) {
			setListComment(res.data);
			setPageSize(res.pageSize);
			setTotalPages(res.totalPages);
		} else {
			console.log("error", res?.message);
		}
	}

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



	const isBookmarkOfCurrentUser = (comment) => {
		if (!comment) {
			return false;
		}
		const listBookmark = comment?.bookmarks;
		if (listBookmark === null) {
			return false;
		}
		const _name = currentUser?.username;
		const result = listBookmark?.some(item => item?.bookmarkBy === _name);
		return result;
	}

	const urlAvatarUser = (author) => {
		if (author?.imageUrl) {
			return author.imageUrl;
		}
		if (author?.avatar) {
			return fetchImage(author.avatar);
		}
		return "";
	}

	const handlePageClick = (event) => {
		setPage(+event.selected + 1);
		return true;
	}

	const handleUpVote = async (commentId) => {
		const vote = {
			commentId: commentId,
			voteName: currentUser.username,
			voteId: 1,
		};
		let res = await upVote(vote, currentUser?.accessToken, axiosJWT);
		if (res && +res.data.status === 200) {
			toast.success(res.data.message);
			fetchFirstCommentData();
			fetchAllCommentData();
		} else if (+res?.data?.status === 400) {
			toast.success(res?.data?.message);
		} else {
			toast.error("Error when voting");
		}
	}

	const handleDownVote = async (commentId) => {
		const vote = {
			commentId: commentId,
			voteName: currentUser.username,
			voteId: -1,
		};
		let res = await downVote(vote, currentUser?.accessToken, axiosJWT);
		if (res && +res.data.status === 200) {
			toast.success(res.data.message);
			fetchFirstCommentData();
			fetchAllCommentData();
		} else {
			toast.error("Error bookmark");
		}
	}


	const handleBookmark = async (comment) => {
		if (comment === null || comment?.commentId < 0) {
			return;
		}
		const bookmarkData = {
			commentId: comment?.commentId,
			bookmarkBy: currentUser.username,
			bookmarked: isBookmarkOfCurrentUser(comment)
		}
		let res = await registerBookmark(bookmarkData, currentUser?.accessToken, axiosJWT);
		console.log(`bookmark`,JSON.stringify(res));
		if (res && +res.data.status === 200) {
			toast.success(res.data.message);
			fetchFirstCommentData();
			fetchAllCommentData();
		} else {
			toast.error("Error when bookmark");
		}


	}

	const breadcrumbs = [
		{ id: 1, name: `${titleFG.title}`, link: `/forumGroup` },
		{ id: 2, name: `${titleForum.title}`, link: `/forum/${titleForum.id}` },
		{ id: 3, name: `${titleDisc.title}`, link: `/discussion/${discussionId}` }
	];

	const commentCard = (comment) => {
		return (
			<Row>
				<div className="col-1 vote-container">
					<button className="vote fa-solid fa-caret-up" onClick={() => handleUpVote(comment?.commentId)}></button>
					<button className="vote-count px-2 rounded-circle">{comment?.totalVotes ?? 0}</button>
					<button className="vote fa-solid fa-caret-down" onClick={() => handleDownVote(comment?.commentId)}></button>

					{!comment?.firstComment &&
						<button className="fa-solid fa-check text-success mb-3"></button>
					}

					<button
						className={isBookmarkOfCurrentUser(comment) ? "fa-solid fa-bookmark bookmark-checked" : "fa-regular fa-bookmark"}
						onClick={() => handleBookmark(comment)}
					></button>
				</div>
				<div className="col-11">
					<div className="card-header d-flex justify-content-between">
						{comment?.author &&
							<>
								<span className="ml-0 me-auto">
									<Avatar src={urlAvatarUser(comment?.author)} username={"@" + comment?.author?.username} height={36} width={36} />
									<small>
										post at:{comment?.createdAt && formatLongDate(comment?.createdAt)}
										<button className="fa-solid fa-user-plus"></button>
										<br />
										<i className="fa-solid fa-star" alt="reputation"></i>{comment?.author?.reputation}
										- <i className="fa-solid fa-pen"></i> {comment?.author?.totalDiscussions}
									</small>
								</span>

								{currentUser.username === comment?.author?.username && (
									<small className="ml-auto me-0 d-inline-block">
										<button className="mx-2 fa-solid fa-edit fa-2x"></button>
										<button className="mx-2 fa-solid fa-xmark fa-2x"></button>
									</small>
								)}
							</>
						}
					</div>
					<hr />
					<div className="card-body">
						<div
							className="contentByDiscussion"
							dangerouslySetInnerHTML={{ __html: comment?.content }}
						></div>
						{comment?.tags?.map((tag) => (
							<span key={tag.id}>
								<button className="btn btn-sm mx-2">{tag?.label}</button>
							</span>
						))}
					</div>
					<hr />
					<div className="card-footer d-flex justify-content-between">
						<span>
							<button><i className="fa-solid fa-reply"></i>Reply</button>
						</span>
						<span>
							<button><i className="fa-regular fa-flag"></i>Report</button>
						</span>

						<span>
							<small>Edit at: {comment?.updatedAt && formatLongDate(comment?.updatedAt)}</small>
						</span>
					</div>
				</div>
			</Row>
		);
	}

	useEffect(() => {
		fetchFirstCommentData();
		fetchAllCommentData();
	}, [discussionId]);

	return (
		<section className="discussion-details content mb-3">
			<Col>
				<BannerTop bannerName={firstComment?.title} breadcrumbs={breadcrumbs} />
			</Col>

			<Col className="mx-auto row">
				<Row>
					<Col className="mb-3 col-12 col-md-8 col-lg-9">
						{/* first comment */}
						{firstComment &&
							<section className="card mb-3 p-3">
								{commentCard(firstComment)}
							</section>
						}
						{/* first comment */}

						{/* list comment */}
						<section>
							<Pagination
								handlePageClick={handlePageClick}
								pageSize={+pageSize}
								totalPages={+totalPages}
							/>
							{
								listComment?.map((item) => (
									item && !item.firstComment &&
									<section className="card mb-3 p-3" key={item.commentId}>
										{commentCard(item)}
									</section>
								))
							}

						</section>
						{/* list comment */}

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
