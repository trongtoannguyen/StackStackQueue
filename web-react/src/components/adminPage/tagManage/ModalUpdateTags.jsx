import { useState, useEffect } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { createAxios } from "../../../services/createInstance";

//Service
import { updateTag } from "../../../services/tagService/tagService";
import { loginSuccess } from "../../../redux/authSlice";

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

const ModalUpdateTags = (props) => {
	const { show, handleClose, handleUpdateEditTags, dataEditTag } = props;

	ModalUpdateTags.propTypes = {
		show: PropTypes.bool.isRequired,
		handleClose: PropTypes.func.isRequired,
		handleUpdateEditTags: PropTypes.func.isRequired,
		dataEditTag: PropTypes.object.isRequired,
	};

	const [label, setLabel] = useState("");
	const [icon, setIcon] = useState("");
	const [color, setColor] = useState("#ffffff");

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.login?.currentUser);
	let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

	const addNewTag = {
		...dataEditTag,
		label: label,
		icon: icon,
		color: color,
	};
	const handleSaveTag = async () => {
		let res = await updateTag(addNewTag, currentUser?.accessToken, axiosJWT);
		console.log(res);
		if (res && +res.data?.status === 200) {
			handleClose();
			setLabel("");
			setIcon(null);
			setColor("#ffffff");
			handleUpdateEditTags({
				...dataEditTag,
				id: res.data.data.id,
				label: label,
				icon: icon,
				color: color,
			});
			toast.success(res.data.message);
		} else {
			toast.error("Error when creating Forum");
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
		if (dataEditTag) {
			setLabel(dataEditTag?.label);
			setIcon(dataEditTag?.icon);
			setColor(dataEditTag?.color);
		}
	}, [dataEditTag]);

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			size="md"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Update Tag</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div className="form-group mb-3">
					<label className="form-label" htmlFor="label">
						Label
					</label>
					<input
						className="form-control"
						id="label"
						type="text"
						value={label}
						onChange={(event) => setLabel(event.target.value)}
						placeholder="Enter label"
					/>
				</div>
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
					<label className="form-label" htmlFor="label">
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
				<Button variant="primary" onClick={() => handleSaveTag()}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalUpdateTags;
