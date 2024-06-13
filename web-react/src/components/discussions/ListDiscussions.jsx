import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import BannerTop from "../bannerTop/BannerTop";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { debounce } from "lodash";

//Service
import { getPageDiscussion } from "../../services/forumService/DiscussionService";
import { getAllForum } from "../../services/forumService/ForumService";

//Paginate
import Pagination from "../pagination/Pagination";
//Modal
import LastCommentInfo from "../lastCommentInfo/lastCommentInfo";
// import ListTags from "./ListTags";

//Utils
import {
	formatDifferentUpToNow,
	formatDate,
} from "../../utils/FormatDateTimeHelper";

const ListDiscussions = () => {
	const bannerName = "List Discussions";
	const breadcrumbs = [
		{ id: 1, name: "List Discussions", link: "/list-discussion" },
	];

	//Pagination
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(5);
	const [totalPages, setTotalPages] = useState(0);
	const [orderBy, setOrderBy] = useState("id");
	const [sort, setSort] = useState("ASC");
	const [search, setSearch] = useState("");

	const handlePageClick = (event) => {
		setPage(event.selected + 1);
	};

	//Discussion
	const [discussionList, setDiscussionList] = useState([]);
	const listDiscussions = async () => {
		const res = await getPageDiscussion(
			page,
			size,
			orderBy,
			sort,
			search,
			forumId
		);
		console.log(res);
		if (res && res.data) {
			setDiscussionList(res.data);
			setTotalPages(res.totalPages);
		} else {
			setDiscussionList([]);
		}
	};

	//Forum
	const [forumList, setForumList] = useState([]);
	const listForums = async () => {
		const res = await getAllForum();
		if (res && res.data) {
			setForumList(res.data);
		} else {
			setForumList([]);
		}
	};

	//Filter
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [forumId, setForumId] = useState(null);

	const handleFilterDiscussionByForum = () => {
		setIsFilterVisible(!isFilterVisible);
	};

	const handleFilterDiscussionByForumChange = debounce((e) => {
		const keyId = e.target.value;
		if (keyId === "") {
			setForumId(null);
			listDiscussions();
		}
		console.log(`keyId`, keyId);
		setForumId(keyId);
	}, 500);

	useEffect(() => {
		listDiscussions();
		listForums();
	}, [page, size, orderBy, sort, search, forumId]);

	return (
		<article className="list-discussion-container content">
			<Col md="12">
				<BannerTop bannerName={bannerName} breadcrumbs={breadcrumbs} />
			</Col>

			<Row>
				<Col md="9">
					<div className="filter-item">
						{/* <span className="filter-name">Sort by: </span> */}
						{/* <div>
							<input
								type="radio"
								id="all"
								value="all"
								checked={selectedOption === "all"}
								onChange={handleOptionChange}
							/>
							<label htmlFor="all">All</label>
						</div>
						<div>
							<input
								type="radio"
								id="comment"
								value="comment"
								checked={selectedOption === "comment"}
								onChange={handleOptionChange}
							/>
							<label htmlFor="comment">Most Comments Discussions</label>
						</div>
						<div>
							<input
								type="radio"
								id="option3"
								value="option3"
								checked={selectedOption === "option3"}
								onChange={handleOptionChange}
							/>
							<label htmlFor="option3">Option 3</label>
						</div> */}
						<button
							className="btn btn-primary"
							onClick={handleFilterDiscussionByForum}
						>
							Filter by Forum
						</button>
						{isFilterVisible && (
							<select
								className="form-control"
								onChange={(e) => handleFilterDiscussionByForumChange(e)}
							>
								<option value="">Select Forum</option>
								{forumList.map((forum) => (
									<option key={forum.id} value={forum.id}>
										{forum.title}
									</option>
								))}
								{/* Add more options as needed */}
							</select>
						)}
					</div>
					<div className="filter-item d-flex">
						<select
							className="form-control"
							onChange={(e) => setSize(e.target.value)}
							value={size}
						>
							<option value="5">5</option>
							<option value="8">8</option>
							<option value="10">10</option>
						</select>
						<input
							type="text"
							className="form-control"
							placeholder="Search"
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<Table striped bordered hover size="sm">
						<thead>
							<tr>
								<th className="sort_header">
									Discussion Title
									<span>
										<i
											className="fa-solid fa-arrow-down-long"
											onClick={() => {
												setOrderBy("id");
												setSort("desc");
											}}
										></i>
										<i
											className="fa-solid fa-arrow-up-long"
											onClick={() => {
												setOrderBy("id");
												setSort("asc");
											}}
										></i>
									</span>
								</th>
								<th className="sort_header">
									Comments
									<span>
										<i
											className="fa-solid fa-arrow-down-long"
											onClick={() => {
												setOrderBy("stat.commentCount");
												setSort("desc");
											}}
										></i>
										<i
											className="fa-solid fa-arrow-up-long"
											onClick={() => {
												setOrderBy("stat.commentCount");
												setSort("asc");
											}}
										></i>
									</span>
								</th>
								<th className="sort_header">
									Started
									<span>
										<i
											className="fa-solid fa-arrow-down-long"
											onClick={() => {
												setOrderBy("createdAt");
												setSort("desc");
											}}
										></i>
										<i
											className="fa-solid fa-arrow-up-long"
											onClick={() => {
												setOrderBy("createdAt");
												setSort("asc");
											}}
										></i>
									</span>
								</th>
								<th>Last Comment</th>
							</tr>
						</thead>
						<tbody>
							{discussionList.map((discussion) => (
								<tr key={discussion.id}>
									<td>
										<Link
											to={`/discussion/${discussion.id}`}
											style={{ color: "blue", textDecoration: "none" }}
										>
											{" "}
											{discussion.title}
										</Link>
										<br />
										<span>
											Started by <b>{discussion.createdBy}</b> about{" "}
											{discussion.createdAt
												? formatDifferentUpToNow(discussion.createdAt)
												: ""}
										</span>
									</td>
									<td>{discussion.stat?.commentCount}</td>
									<td>{formatDate(discussion.createdAt)}</td>
									<td>
										<LastCommentInfo comment={discussion.stat.lastComment} />
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<div className="pagination pagination-end">
						<Pagination
							handlePageClick={handlePageClick}
							pageSize={size}
							totalPages={totalPages}
						/>
					</div>
				</Col>

				<Col md="3">
					<div className="card"> {/* <ListTags /> */}</div>
				</Col>
			</Row>
		</article>
	);
};

export default ListDiscussions;
