import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

//Service
import { logOutSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../services/createInstance";
import { updateForum } from "../../../services/forumService/ForumService";
import { getAllForumGroup } from "../../../services/forumService/ForumGroupService";

//Color Picker
import ColorComponents from "../../colorComponents/ColorComponents";

//Icon
import SelectIcon from "../../IconComponents/IconComponents";

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
				<SelectIcon handleSelectIcon={handleSelectIcon} icon={icon} />
				<ColorComponents setColor={setColor} color={color} />
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
