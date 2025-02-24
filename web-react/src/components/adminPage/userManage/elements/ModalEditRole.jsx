import {
  Button, Modal
} from 'react-bootstrap';
import {
  Form, FormGroup, Label, Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { ROLES } from "../../../../constants/index";
import { useState } from 'react';

const convertRoleToArray = (role) => {
  const roles = [];
  switch (role) {
    case ROLES.ADMIN:
      roles.push("admin", "mod", "user");
      break;
    case ROLES.MOD:
      roles.push("mod", "user");
      break;
    default:
      roles.push("user");
      break;
  }
  return roles;
}


const ModalEditRole = (props) => {

  const { show, handleClose, handleUpdateRole, user } = props;

  const [roles, setRoles] = useState(user.roles);
  const [role, setRole] = useState(null);

  const handleEditRole = async () => {
    const roles = convertRoleToArray(role);
    console.log(`Roles`, roles);
    await handleUpdateRole(user.id, roles);
    setRoles(user.roles);
  }


  return (
    <Modal show={show} onHide={handleClose}
      backdrop="static"
      size="md"
      keyboard={false}>

      <Modal.Header closeButton>
        <Modal.Title className='text-primary'><i className="fa-solid fa-pen-to-square"></i> Edit role of {user?.username}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <FormGroup>
            Username: {user.username}
          </FormGroup>
          <FormGroup>
            Email: {user.email}
          </FormGroup>
          <FormGroup>
            <Label for="roles">Account Status:</Label>
            <Input type="select" name="roles" id="roles"
              onChange={(e) => setRole(e.target.value)}
              value={role}>
              <option value={ROLES.ADMIN}>ADMIN</option>
              <option value={ROLES.MOD}>MOD</option>
              <option value={ROLES.USER}>USER</option>
            </Input>
          </FormGroup>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleEditRole}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalEditRole.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdateRole: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default ModalEditRole;