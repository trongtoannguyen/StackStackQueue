import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Service
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../services/createInstance";
import { createDiscussion } from "../../services/forumService/DiscussionService";

const ModalAddDiscussion = (props) => {
	const { show, handleClose, handleUpdateAddDiscussion } = props;
	const { forumId } = useParams();

	ModalAddDiscussion.propTypes = {
		show: PropTypes.bool.isRequired,
		handleClose: PropTypes.func.isRequired,
		handleUpdateAddDiscussion: PropTypes.func.isRequired,
	};

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const discussion = {
		title: title,
		closed: false,
		sticky: false,
		important: false,
	};

	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.login?.currentUser);
	let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

	const handleSaveDiscussion = async () => {
		try {
			let res = await createDiscussion(
				forumId,
				discussion,
				content,
				currentUser?.accessToken,
				axiosJWT
			);

			if (res && +res.data?.status === 201) {
				console.log(res.data);
				handleClose();
				setContent("");
				setTitle("");
				handleUpdateAddDiscussion({
					...discussion,
					createdBy: res.data.data.createdBy,
					id: res.data.data.id,
					content: content,
					forum: res.data.data.forum,
					stat: res.data.data.stat,
					createdAt: res.data.data.createdAt,
				});
				toast.success(res.data.message);
			} else {
				toast.error("Error when creating Forum");
			}
		} catch (error) {
			console.error("Error:", error);
			toast.error("Error when creating Forum");
		}
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

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			size="lg"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Add New Discussion</Modal.Title>
			</Modal.Header>

			<Modal.Body>
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
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={() => handleSaveDiscussion()}>
					Add new
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalAddDiscussion;
