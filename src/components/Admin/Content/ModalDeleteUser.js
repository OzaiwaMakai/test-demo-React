import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';
const ModalDeleteUser = (props) => {
    const { show, setShow, dataDeleteUser, pageCount, curren } = props;

    const handleClose = () => {
        setShow(false)

    };
    const handleShow = () => setShow(true);

    const handleSubmitDeleteUser = async () => {

        let data = await deleteUser(dataDeleteUser.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            props.setCurrentPage(1)
            await props.fetchListUsersWithpaginate(1);
            handleClose();
        }
    }

    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user. email = <b>{dataDeleteUser && dataDeleteUser.email ? dataDeleteUser.email : ''}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;