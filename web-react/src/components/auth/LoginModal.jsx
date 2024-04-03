import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const LoginModal = (props) => {

  const { show, handleClose } = props;

  // Rest of the code...
  LoginModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  return (
    <Modal show={show} onHide={handleClose}
      backdrop="static"
      keyboard={false}>

      <Modal.Header closeButton>
        <Modal.Title>Add new user</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">
          Add new
        </Button>
      </Modal.Footer>

    </Modal>
  );
}

export default LoginModal;