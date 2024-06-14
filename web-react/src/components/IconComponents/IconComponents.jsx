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

import { Dropdown } from "react-bootstrap";

import PropTypes from "prop-types";

const SelectIcon = (props) => {
	const { handleSelectIcon, icon } = props;

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

	return (
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
	);
};

SelectIcon.propTypes = {
	handleSelectIcon: PropTypes.func.isRequired,
	icon: PropTypes.string.isRequired,
};

export default SelectIcon;
