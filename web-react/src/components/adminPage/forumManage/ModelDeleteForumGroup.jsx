import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

//Service
import { logOutSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../services/createInstance";
import { deleteForumGroup } from "../../../services/forum/ForumGroup";

const ModelDeleteForumGroup = (props) => {
	const {
		show,
		handleClose,
		handleConfirmDeleteForumGroup,
		dataDeleteForumGroup,
	} = props;

	ModelDeleteForumGroup.propTypes = {
		show: PropTypes.bool.isRequired,
		handleClose: PropTypes.func.isRequired,
		handleConfirmDeleteForumGroup: PropTypes.func.isRequired,
		dataDeleteForumGroup: PropTypes.object.isRequired,
	};

	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.login?.currentUser);
	let axiosJWT = createAxios(currentUser, dispatch, logOutSuccess);

	const handleSaveForumGroup = async () => {
		let res = await deleteForumGroup(
			dataDeleteForumGroup.id,
			currentUser?.accessToken,
			axiosJWT
		);

		if (res && +res.data?.status === 200) {
			handleClose();
			handleConfirmDeleteForumGroup(dataDeleteForumGroup);
			toast.success(res.data.message);
		} else if (+res.data?.status === 202) {
			toast.error(res.data.message);
		} else {
			toast.error("Error when deleting Forum Group");
		}
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
				<Modal.Title>Delete Forum Group</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div>
					<p>
						This action can not be undone! Do want to delete this forum group?
					</p>
					<b>Title: {dataDeleteForumGroup?.title}</b>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={() => handleSaveForumGroup()}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModelDeleteForumGroup;
