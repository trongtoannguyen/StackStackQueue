import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { Row } from 'reactstrap';


const ModalEditProfile = (props) => {
  const { show, handleClose, handleUpdateInfo, user } = props;

  ModalEditProfile.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleUpdateInfo: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };
  const [username, setUsername] = useState(user?.username);
  const [name, setName] = useState(user?.name);
  const [address, setAddress] = useState(user?.address);
  const [phone, setPhone] = useState(user?.phone);
  const [email, setEmail] = useState(user?.email);


  const handleEditProfile = () => {
    let a = 0;
    if (a === 0) {
      handleClose();
      handleUpdateInfo({});
      toast.success('Your profile was created successfully');
    } else {
      toast.error('Error when update information');
    }
  }


  return (
    <Modal show={show} onHide={handleClose}
      backdrop="static"
      size="lg"
      keyboard={false}>

      <Modal.Header closeButton>
        <Modal.Title>Edit information</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <div className="form-group mb-3 col-md-6">
            <label className="form-label" htmlFor="title">Username</label>
            <input className="form-control" id="name"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter new user name" />
          </div>
          <div className="form-group mb-3 col-md-6">
            <label className="form-label" htmlFor="title">Full name</label>
            <input className="form-control" id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter new full name" />
          </div>
        </Row>
        <Row>
          <div className="form-group mb-3 col-md-6">
            <label className="form-label" htmlFor="title">Email</label>
            <input className="form-control" id="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter new email" />
          </div>
          <div className="form-group mb-3 col-md-6">
            <label className="form-label" htmlFor="title">Phone number</label>
            <input className="form-control" id="phone"
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter phone number" />
          </div>
        </Row>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="title">Address</label>
          <input className="form-control" id="name"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Enter new address" />
        </div>


      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className='ml-0 me-auto'>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleEditProfile()} className='ml-auto me-0'>
          Save change
        </Button>
      </Modal.Footer>

    </Modal>
  );

}

export default ModalEditProfile;