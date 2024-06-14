import { useState } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { createAxios } from "../../../services/createInstance";

//Service
import { createTag } from "../../../services/tagService/tagService";
import { loginSuccess } from "../../../redux/authSlice";

//Color Picker
import { ChromePicker } from "react-color";

//Icon
import SelectIcon from "../../IconComponents/IconComponents";

const ModalAddNewTags = (props) => {
	const { show, handleClose, handleUpdateAddNewTags } = props;

	ModalAddNewTags.propTypes = {
		show: PropTypes.bool.isRequired,
		handleClose: PropTypes.func.isRequired,
		handleUpdateAddNewTags: PropTypes.func.isRequired,
	};

	const [label, setLabel] = useState("");
	const [icon, setIcon] = useState("");
	const [color, setColor] = useState("#ffffff");

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.login?.currentUser);
	let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

	const addNewTag = {
		label: label,
		icon: icon,
		color: color,
	};

	const handleSaveTag = async () => {
		let res = await createTag(addNewTag, currentUser?.accessToken, axiosJWT);
		if (res && +res.data?.status === 201) {
			handleClose();
			setLabel("");
			setIcon(null);
			setColor("#ffffff");
			handleUpdateAddNewTags({
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

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			size="md"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.label>Add New Tag</Modal.label>
			</Modal.Header>

			{/* <Modal.Body>
				<div className="form-group mb-3">
					<label className="form-label" htmlFor="label">
						label
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
			</Modal.Body> */}

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={() => handleSaveTag()}>
					Add new
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalAddNewTags;
