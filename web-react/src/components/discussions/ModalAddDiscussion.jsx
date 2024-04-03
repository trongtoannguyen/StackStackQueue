import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


const ModalAddDiscussion = (props) => {
    const { show, handleClose, handleUpdateTable } = props;

    ModalAddDiscussion.propTypes = {
        show: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
        handleUpdateTable: PropTypes.func.isRequired,
    };

    const [title, setTitle] = useState("");


    const handleSaveDiscussion = () => {
        let a = 0;
        if (a === 0) {
            handleClose();
            handleUpdateTable({});
            toast.success('Discussion created successfully');
        } else {
            toast.error('Error when creating discussion');
        }
    }


    return (
        <Modal show={show} onHide={handleClose}
            backdrop="static"
            keyboard={false}>

            <Modal.Header closeButton>
                <Modal.Title>Open New Discussion</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input className="form-control" id="title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Enter Title" />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="content">Content</label>
                    <textarea className="form-control" id="content" rows="3"></textarea>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="tags">Tags</label>
                    <input type="text" className="form-control" id="tags" />
                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSaveDiscussion()}>
                    Add new
                </Button>
            </Modal.Footer>

        </Modal>
    );
}

export default ModalAddDiscussion;