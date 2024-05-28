import { useState, useEffect } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { updateForumGroup } from "../../../services/ForumService";
import { logOutSuccess } from "../../../redux/authSlice";
import { ChromePicker } from "react-color";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createAxios } from "../../../services/createInstance";
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

const ModelUpdateForumGroup = (props) => {
	const { show, handleClose, handleUpdateForumGroup, dataEditForumGroup } =
		props;

	ModelUpdateForumGroup.propTypes = {
		show: PropTypes.bool.isRequired,
		handleClose: PropTypes.func.isRequired,
		handleUpdateForumGroup: PropTypes.func.isRequired,
		dataEditForumGroup: PropTypes.object.isRequired,
	};

	const [title, setTitle] = useState("");
	const [icon, setIcon] = useState("");
	const [color, setColor] = useState("#ffffff");

	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.login?.currentUser);
	let axiosJWT = createAxios(currentUser, dispatch, logOutSuccess);

	const updateForumGroupObject = {
		id: dataEditForumGroup.id,
		createdAt: dataEditForumGroup.createdAt,
		createdBy: dataEditForumGroup.createdBy,
		title: title,
		icon: icon,
		color: color,
		sortOrder: dataEditForumGroup.sortOrder,
	};

	// console.log(dataEditForumGroup);

	const handleSaveForumGroup = async () => {
		let res = await updateForumGroup(
			dataEditForumGroup.id,
			updateForumGroupObject,
			currentUser?.accessToken,
			axiosJWT
		);

		if (res && +res.data?.status === 200) {
			handleClose();
			handleUpdateForumGroup({
				id: dataEditForumGroup.id,
				title: title,
				icon: icon,
				color: color,
			});
			toast.success(res.data.message);
		} else {
			toast.error("Error when updating Forum Group");
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
		if (show) {
			setTitle(dataEditForumGroup.title);
			setIcon(dataEditForumGroup.icon);
			setColor(dataEditForumGroup.color);
		}
	}, [dataEditForumGroup, show]);
	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			size="lg"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Update Forum Group</Modal.Title>
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
					<label className="form-label" htmlFor="icon">
						Icon
					</label>
					<Dropdown onSelect={handleSelectIcon}>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							{icon ? renderIcon(icon) : "Select an Icon"}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{iconOptions.map((opt) => (
								<Dropdown.Item key={opt.value} eventKey={opt.value}>
									{opt.label}
									{opt.icon}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="form-group mb-3">
					<label className="form-label" htmlFor="title">
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
				<Button variant="primary" onClick={() => handleSaveForumGroup()}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModelUpdateForumGroup;
