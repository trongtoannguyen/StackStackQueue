import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

//Service
import { getDiscussionById } from "../../../services/forumService/DiscussionService";
import { createAxios } from "../../../services/createInstance";
import { getAllTags } from "../../../services/tagService/tagService";
import { loginSuccess } from "../../../redux/authSlice";

//Utils
import { formatDate } from "../../../utils/FormatDateTimeHelper";

//Modal
import ModalUpdateDiscussion from "./ModalUpdateDiscussion";

const TagsManage = () => {
	//Discussion
	const { discussionId } = useParams();

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.login?.currentUser);
	let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

	const [discussion, setDiscussion] = useState({});
	const [action, setAction] = useState("");
	const [dataUpdateDiscussion, setDataUpdateDiscussion] = useState(false);
	const [isShowUpdateDiscussion, setIsShowUpdateDiscussion] = useState(false);

	const discussionById = async () => {
		let res = await getDiscussionById(discussionId);
		if (res && res.data) {
			setDiscussion(res.data);
		}
	};

	console.log(discussion);

	const handleUpdateDataDiscussion = (data, action) => {
		setDataUpdateDiscussion(data);
		setAction(action);
		setIsShowUpdateDiscussion(true);
	};

	const handleEditDiscussion = (data) => {
		let cloneDiscussion = _.cloneDeep(data);
		cloneDiscussion = data;
		setDiscussion(cloneDiscussion);
	};

	//All Tags
	const [listTags, setListTags] = useState([]);
	const getAllTagsData = async () => {
		const res = await getAllTags(
			1,
			5,
			"id",
			"ASC",
			"",
			currentUser?.accessToken,
			axiosJWT
		);
		if (res && +res.status === 201) {
			setListTags(res.data.data);
			toast.success(res?.data?.message);
		} else {
			toast.error(res?.data?.message);
		}
	};

	useEffect(() => {
		discussionById();
		getAllTagsData();
	}, [discussionId]);
	return (
		<div className="container mt-4 ">
			<p>
				Started by <strong>{discussion?.createdBy}</strong> -{" "}
				{formatDate(discussion?.createdAt)}
			</p>
			<p>
				In forum <strong>{discussion?.forum?.title}</strong>{" "}
				<Button variant="link" size="sm"></Button> Move to new Forum
			</p>
			<div className="d-flex justify-content-center align-content-between">
				<div className="mb-3 d-flex">
					<div style={{ color: discussion?.closed ? "green" : "red" }}>
						This discussion is{" "}
						<span>{discussion?.closed ? "OPEN" : "CLOSED"}</span>
					</div>
					<button
						type="checkbox"
						label="This discussion is OPEN"
						onClick={() =>
							handleUpdateDataDiscussion(!discussion?.closed, "closed")
						}
					>
						<span
							style={{
								border: "1px solid black",
								borderRadius: "5px",
								padding: "5px",
							}}
						>
							{" "}
							<i className="fa-regular fa-circle-xmark"></i> Click to{" "}
							{discussion?.closed ? "CLOSED" : "OPEN"}
						</span>
					</button>
				</div>
				<div className="mb-3 px-5">
					<label>
						Mark as{" "}
						<strong>
							{discussion?.important ? "Important" : "Not Important"}
						</strong>
					</label>
					<button
						type="checkbox"
						onClick={() =>
							handleUpdateDataDiscussion(!discussion.important, "important")
						}
					>
						<span
							style={{
								border: "1px solid black",
								borderRadius: "5px",
								padding: "5px",
							}}
						>
							{" "}
							<i className="fa-solid fa-x"></i>{" "}
							{discussion.important ? "No" : "Yes"}
						</span>
					</button>
				</div>
				<button
					onClick={() => handleUpdateDataDiscussion(discussion, "delete")}
					style={{
						background: "red",
						color: "white",
						padding: "5px",
						borderRadius: "5px",
					}}
				>
					<i className="fa-solid fa-triangle-exclamation"></i> Delete this
					Discussion ?
				</button>
			</div>
			<div className="mb-3">
				<label>Tags</label>
				<button
					onClick={() => {}}
					className="mt-2"
					style={{
						background: "green",
						color: "white",
						padding: "5px",
						borderRadius: "5px",
					}}
				>
					<i className="fa-solid fa-check"></i> Apply
				</button>
			</div>
			<hr />
			<p>
				There are {discussion?.stat?.commentCount} comments in this discussion.
				This discussion has been viewed 1 times
			</p>
			<ModalUpdateDiscussion
				show={isShowUpdateDiscussion}
				handleClose={() => setIsShowUpdateDiscussion(false)}
				dataUpdateDiscussion={dataUpdateDiscussion}
				action={action}
				dataDiscussion={discussion}
				handleEditDiscussion={handleEditDiscussion}
			/>
		</div>
	);
};

export default TagsManage;
