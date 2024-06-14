import ForumInfo from "../forumsPage/ForumInfo";
import { Link } from "react-router-dom";
import BannerTop from "../bannerTop/BannerTop";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Row, Col } from "reactstrap";

//Services
import { getPageDiscussion } from "../../services/forumService/DiscussionService";

//Utils
import { formatDifferentUpToNow } from "../../utils/FormatDateTimeHelper";

const Home = () => {
	const bannerName = "Welcome to TechForum";
	const breadcrumbs = [];

	//List Discussions
	const [mostRecent, setMostRecent] = useState({});
	const [mostViews, setMostViews] = useState({});
	const [mostComments, setMostComments] = useState({});

	const fetchDiscussions = async (
		page,
		size,
		orderBy,
		sort,
		filter,
		callback
	) => {
		const res = await getPageDiscussion(
			page,
			size,
			orderBy,
			sort,
			filter,
			null
		);
		if (res && res.data) {
			callback(res.data);
		} else {
			callback([]);
		}
	};

	const getMostRecent = async () => {
		fetchDiscussions(1, 5, "createdAt", "DESC", "", (data) =>
			setMostRecent(data[0])
		);
	};

	const getMostViews = async () => {
		fetchDiscussions(1, 5, "stat.viewCount", "DESC", "", (data) =>
			setMostViews(data[0])
		);
	};

	const getMostComments = async () => {
		fetchDiscussions(1, 5, "stat.commentCount", "DESC", "", (data) =>
			setMostComments(data[0])
		);
	};

	useEffect(() => {
		getMostRecent();
		getMostViews();
		getMostComments();
		console.log(mostRecent);
		console.log(mostViews);
		console.log(mostComments);
	}, []);

	return (
		<section className="home-container content mb-3">
			<Col md="12">
				<BannerTop bannerName={bannerName} breadcrumbs={breadcrumbs} />
			</Col>
			<Col md="12">
				<Row>
					<Col md="8">
						<Card>
							<CardHeader>
								<h4 className="stat-name">
									<i className="fa-regular fa-clock"></i> Most Recent
									Discussions
								</h4>
							</CardHeader>
							<CardBody>
								<div className="stat-details">
									<strong>Welcome to {mostRecent?.forum?.title} </strong>
									<span>({mostRecent?.stat?.viewCount} views) </span>
									<span>Started By: </span>
									<strong>{mostRecent?.createdBy} </strong>
									<span>
										- {formatDifferentUpToNow(mostRecent?.createdAt)}{" "}
									</span>
									<a href="/tag?id=1000">
										<span className="button-tag btn btn-success">
											<i className="fa-solid fa-tag"></i>
											<></>
											Bulletin
										</span>
									</a>
								</div>
							</CardBody>
							<CardFooter>
								<Link
									to={{
										pathname: "/list-discussion",
										search: "?searchHome=mostRecent",
										state: { searchHome: "mostRecent" },
									}}
								>
									View more ...
								</Link>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<h4 className="stat-name">
									<i className="fa-regular fa-eye"></i> Most Views Discussions
								</h4>
							</CardHeader>
							<CardBody>
								<div className="stat-details">
									<strong>Welcome to {mostViews?.forum?.title} </strong>
									<span>({mostViews?.stat?.viewCount} views) </span>
									<span>Started By: </span>
									<strong>{mostViews?.createdBy} </strong>
									<span>- {formatDifferentUpToNow(mostViews?.createdAt)} </span>
									<a href="/tag?id=1000">
										<span className="button-tag btn btn-success">
											<i className="fa-solid fa-tag"></i>
											<></>
											Bulletin
										</span>
									</a>
								</div>
							</CardBody>
							<CardFooter>
								<Link
									to={{
										pathname: "/list-discussion",
										search: "?searchHome=mostViews",
										state: { searchHome: "mostViews" },
									}}
								>
									View more ...
								</Link>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<h4 className="stat-name">
									<i className="fa-regular fa-comments"></i> Most Comments
									Discussions
								</h4>
							</CardHeader>
							<CardBody>
								<div className="stat-details">
									<strong>Welcome to {mostComments?.forum?.title} </strong>
									<span>({mostComments?.stat?.viewCount} views) </span>
									<span>Started By: </span>
									<strong>{mostComments?.createdBy} </strong>
									<span>
										- {formatDifferentUpToNow(mostComments?.createdAt)}{" "}
									</span>
									<a href="/tag?id=1000">
										<span className="button-tag btn btn-success">
											<i className="fa-solid fa-tag"></i>
											<></>
											Bulletin
										</span>
									</a>
								</div>
							</CardBody>
							<CardFooter>
								<Link
									to={{
										pathname: "/list-discussion",
										search: "?searchHome=mostComments",
										state: { searchHome: "mostComments" },
									}}
								>
									View more ...
								</Link>
							</CardFooter>
						</Card>
					</Col>

					<Col md="4">
						<Card className="mx-auto text-center p-2">
							<b>
								<i className="fa-regular fa-clock"></i> Discussion Tags
							</b>
						</Card>
						<ForumInfo />
					</Col>
				</Row>
			</Col>
		</section>
	);
};

export default Home;
