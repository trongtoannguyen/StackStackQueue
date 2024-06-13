import { useState, useEffect } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

//Service
import { logOutSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../services/createInstance";
import { updateForum } from "../../../services/forumService/ForumService";
import { getAllForumGroup } from "../../../services/forumService/ForumGroupService";

//Color Picker
import { ChromePicker } from "react-color";

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

const ModelUpdateForum = (props) => {
	const {
		show,
		handleClose,
		dataUpdateForum,
		forumIsActive,
		handleUpdateForumFromModel,
	} = props;

	ModelUpdateForum.propTypes = {
		show: PropTypes.bool.isRequired,
		handleClose: PropTypes.func.isRequired,
		dataUpdateForum: PropTypes.object.isRequired,
		forumIsActive: PropTypes.bool.isRequired,
		handleUpdateForumFromModel: PropTypes.func.isRequired,
	};

	const [forumGroup, setForumGroup] = useState([]);
	const [updateForumByGroupId, setUpdateForumByGroupId] = useState("");
	const [titleForumGroup, setTitleForumGroup] = useState("");

	const handleSelectForumTitle = (event) => {
		const selectedTitle = event.target.value;
		setTitleForumGroup(selectedTitle);
		const selectedForum = forumGroup.find((f) => f.title === selectedTitle);
		if (selectedForum) {
			setUpdateForumByGroupId(selectedForum.id);
		}
	};

	const listForums = async () => {
		let res = await getAllForumGroup();
		if (res && res.data) {
			setForumGroup(res.data);
		}
	};

	const [title, setTitle] = useState(dataUpdateForum?.title || "");
	const [icon, setIcon] = useState(dataUpdateForum?.icon || "");
	const [color, setColor] = useState(dataUpdateForum?.color || "#ffffff");
	const [isActive, setIsActive] = useState(forumIsActive || true);
	const [description, setDescription] = useState(
		dataUpdateForum?.description || ""
	);

	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.login?.currentUser);
	let axiosJWT = createAxios(currentUser, dispatch, logOutSuccess);

	const updateForumObject = {
		...dataUpdateForum,
		title: title,
		icon: icon,
		color: color,
		description: description,
		active: forumIsActive,
	};

	const handleSaveForum = async () => {
		let res = await updateForum(
			dataUpdateForum.id,
			updateForumByGroupId,
			updateForumObject,
			currentUser?.accessToken,
			axiosJWT
		);

		if (res && +res.data?.status === 200) {
			handleClose();
			handleUpdateForumFromModel({
				id: dataUpdateForum.id,
				title: title,
				icon: icon,
				color: color,
				description: description,
				active: isActive,
			});
			toast.success(res.data.message);
		} else {
			toast.error("Error when updating Forum");
		}
	};

	const iconOptions = [
		{ value: "FaBeer", label: "Beer", icon: <FaBeer /> },
		{ value: "FaCoffee", label: "Coffee", icon: <FaCoffee /> },
		{ value: "FaApple", label: "Apple", icon: <FaApple /> },
		{ value: "FaAndroid", label: "Android", icon: <FaAndroid /> },
		{ value: "FaHome", label: "Home", icon: <FaHome /> },
		{ value: "FaUser", label: "User", icon: <FaUser /> },
		{ value: "FaEnvelope", label: "Envelope", icon: <FaEnvelope /> },
		{ value: "FaBell", label: "Bell", icon: <FaBell /> },
		{ value: "FaHeart", label: "Heart", icon: <FaHeart /> },
		{ value: "FaStar", label: "Star", icon: <FaStar /> },
		{ value: "FaComment", label: "Comment", icon: <FaComment /> },
		{ value: "FaThumbsUp", label: "Thumbs Up", icon: <FaThumbsUp /> },
		{ value: "FaThumbsDown", label: "Thumbs Down", icon: <FaThumbsDown /> },
		{ value: "FaCheck", label: "Check", icon: <FaCheck /> },
		{ value: "FaTimes", label: "Times", icon: <FaTimes /> },
		{ value: "FaSearch", label: "Search", icon: <FaSearch /> },
		{ value: "FaCog", label: "Cog", icon: <FaCog /> },
		{ value: "FaTrash", label: "Trash", icon: <FaTrash /> },
		{ value: "FaEdit", label: "Edit", icon: <FaEdit /> },
		{ value: "FaSave", label: "Save", icon: <FaSave /> },
	];

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

	const handleSelectIcon = (iconValue) => {
		setIcon(iconValue);
	};

	useEffect(() => {
		if (show && dataUpdateForum) {
			setTitle(dataUpdateForum.title || "");
			setIcon(dataUpdateForum.icon || "");
			setColor(dataUpdateForum.color || "#ffffff");
			setDescription(dataUpdateForum.description || "");
			setIsActive(forumIsActive);
			setTitleForumGroup(dataUpdateForum.forumGroup?.title || "");
			setUpdateForumByGroupId(dataUpdateForum.forumGroup?.id || 0);
		}
		listForums();
	}, [dataUpdateForum, forumIsActive, show]);

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			size="md"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Update Forum</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div className="form-group mb-3">
					<label className="form-label" htmlFor="forumGroupTitle">
						Select Forum Group
					</label>
					<select
						className="form-control mb-3"
						id="forumGroupTitle"
						value={titleForumGroup}
						onChange={handleSelectForumTitle}
					>
						{forumGroup.map((item) => (
							<option key={item.id} value={item.title}>
								{item.title}
							</option>
						))}
					</select>
				</div>
				<div className="form-group mb-3">
					<label className="form-label" htmlFor="title">
						Title
					</label>
					<input
						className="form-control mb-3"
						id="title"
						type="text"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="Enter Title"
					/>
				</div>
				<label className="form-label mb-3" htmlFor="description">
					Description
				</label>
				<textarea
					className="form-control mb-3"
					id="description"
					value={description}
					onChange={(event) => setDescription(event.target.value)}
					placeholder="Enter Description"
				/>
				<div className="form-group mb-3">
					<label className="form-label" htmlFor="icon">
						Icon
					</label>
					<Dropdown onSelect={handleSelectIcon}>
						<Dropdown.Toggle
							variant="success"
							id="dropdown-basic"
							style={{ width: "50%" }}
						>
							{icon ? renderIcon(icon) : "Select an Icon"}
						</Dropdown.Toggle>

						<Dropdown.Menu
							style={{
								maxHeight: "200px",
								overflow: "auto",
								marginLeft: "20px",
								width: "50%",
							}}
						>
							{iconOptions.map((opt) => (
								<Dropdown.Item
									className="d-flex align-items-center justify-content-between px-3"
									key={opt.value}
									eventKey={opt.value}
								>
									{opt.label}
									{opt.icon}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="form-group mb-3">
					<label className="form-label" htmlFor="color">
						Color
					</label>
					<ChromePicker
						color={color}
						onChangeComplete={(color) => setColor(color.hex)}
					/>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handleSaveForum}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModelUpdateForum;
