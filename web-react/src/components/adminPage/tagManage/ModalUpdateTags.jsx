import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { createAxios } from "../../../services/createInstance";

//Service
import { updateTag } from "../../../services/tagService/tagService";
import { loginSuccess } from "../../../redux/authSlice";

//Color Picker
import ColorComponents from "../../colorComponents/ColorComponents";

//Icon
import SelectIcon from "../../IconComponents/IconComponents";

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
				<SelectIcon handleSelectIcon={handleSelectIcon} icon={icon} />
				<ColorComponents setColor={setColor} color={color} />
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
