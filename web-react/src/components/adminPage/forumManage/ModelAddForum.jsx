import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { createAxios } from "../../../services/createInstance";

//Service
import { addForum } from "../../../services/forumService/ForumService";
import { loginSuccess } from "../../../redux/authSlice";

//Color Picker
import ColorComponents from "../../colorComponents/ColorComponents";
//Icon
import SelectIcon from "../../IconComponents/IconComponents";

const ModelAddForum = (props) => {
	const { show, handleClose, handleUpdateForum, idForumGroup } = props;

	ModelAddForum.propTypes = {
		show: PropTypes.bool.isRequired,
		handleClose: PropTypes.func.isRequired,
		handleUpdateForum: PropTypes.func.isRequired,
		idForumGroup: PropTypes.number.isRequired,
	};

	const [title, setTitle] = useState("");
	const [icon, setIcon] = useState("");
	const [color, setColor] = useState("#ffffff");
	const [description, setDescription] = useState("");

	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.login?.currentUser);
	let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

	const addForumObject = {
		idForumGroup: idForumGroup,
		title: title,
		icon: icon,
		color: color,
		description: description,
	};

	const handleSaveForum = async () => {
		let res = await addForum(
			addForumObject,
			currentUser?.accessToken,
			axiosJWT
		);
		if (res && +res.data?.status === 201) {
			handleClose();
			setTitle("");
			setIcon(null);
			setColor("#ffffff");
			setDescription("");
			handleUpdateForum({
				id: res.data.data.id,
				description: description,
				title: title,
				icon: icon,
				color: color,
			});
			toast.success(res.data.message);
		} else {
			toast.error("Error when creating Forum");
		}
	};

	const handleSelectIcon = (iconValue) => {
		setIcon(iconValue);
	};

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			size="md"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Add New Forum</Modal.Title>
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
					<label className="form-label" htmlFor="description">
						Description
					</label>
					<textarea
						className="form-control"
						id="description"
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						placeholder="Enter Description"
					/>
				</div>
				<SelectIcon handleSelectIcon={handleSelectIcon} icon={icon} />
				<ColorComponents setColor={setColor} color={color} />
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={() => handleSaveForum()}>
					Add new
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModelAddForum;
