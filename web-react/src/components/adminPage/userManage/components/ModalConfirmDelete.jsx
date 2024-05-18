import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';


const ModalConfirmDeleteUser = (props) => {
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this user?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.toggle}>Delete</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalConfirmDeleteUser;