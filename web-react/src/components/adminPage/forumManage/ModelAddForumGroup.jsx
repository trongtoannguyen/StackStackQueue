import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { createAxios } from "../../../services/createInstance";

//Service
import { addForumGroup } from "../../../services/forumService/ForumGroupService";
import { logOutSuccess } from "../../../redux/authSlice";
import { getUserModerator } from "../../../services/userService/UserService";

//Color Picker
import ColorComponents from "../../colorComponents/ColorComponents";

//Icon
import SelectIcon from "../../IconComponents/IconComponents";

const ModelAddForumGroup = (props) => {
	const { show, handleClose, handleUpdateTable } = props;

	ModelAddForumGroup.propTypes = {
		show: PropTypes.bool.isRequired,
		handleClose: PropTypes.func.isRequired,
		handleUpdateTable: PropTypes.func.isRequired,
	};

	const [title, setTitle] = useState("");
	const [icon, setIcon] = useState("");
	const [color, setColor] = useState("#ffffff");
	const [roleName, setRoleName] = useState("");

	const [listModerator, setListModerator] = useState([]);

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.login?.currentUser);
	let axiosJWT = createAxios(currentUser, dispatch, logOutSuccess);

	const ListUserModerator = async () => {
		let res = await getUserModerator(currentUser?.accessToken, axiosJWT);
		if (res && +res.status === 200) {
			setListModerator(res.data);
		}
	};

	const addForumGroupObject = {
		title: title,
		icon: icon,
		color: color,
	};

	const handleSaveForumGroup = async () => {
		let res = await addForumGroup(
			addForumGroupObject,
			roleName,
			currentUser?.accessToken,
			axiosJWT
		);
		if (res && +res.data?.status === 201) {
			handleClose();
			setTitle("");
			setIcon(null);
			setColor("#ffffff");
			handleUpdateTable({
				id: res.data.data.id,
				title: title,
				icon: icon,
				color: color,
				manager: roleName,
			});
			toast.success(res.data.message);
		} else {
			toast.error("Error when creating Forum Group");
		}
	};

	const handleSelectIcon = (iconValue) => {
		setIcon(iconValue);
	};

	useEffect(() => {
		if (show) {
			ListUserModerator();
			setRoleName(listModerator[0]?.username || "");
		}
	}, [show, listModerator]);

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			size="md"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Add New Forum Group</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div className="form-group mb-3">
					<label className="form-label">Select Moderators</label>
					<select
						className="form-control mb-3"
						id="roleName"
						value={roleName}
						onChange={(event) => setRoleName(event.target.value)}
					>
						{listModerator.map((item) => (
							<option key={item.id} value={item.username}>
								{item.username}
							</option>
						))}
					</select>
				</div>
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
				<SelectIcon handleSelectIcon={handleSelectIcon} icon={icon} />
				<ColorComponents setColor={setColor} color={color} />
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={() => handleSaveForumGroup()}>
					Add new
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModelAddForumGroup;
