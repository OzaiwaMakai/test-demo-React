import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiService';
import _ from 'lodash'

const ModalViewUser = (props) => {
    const { show, setShow, dataViewUser, resetViewData } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState('');
    const handleClose = () => {
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('USER');
        setImage("");
        setPreviewImage('');
        setShow(false)
        resetViewData();
    };
    const handleShow = () => {
        setShow(true)
    };



    useEffect(() => {
        if (!_.isEmpty(dataViewUser)) {
            setEmail(dataViewUser.email)
            setUsername(dataViewUser.username)
            setRole(dataViewUser.role)
            if (dataViewUser.image)
                setPreviewImage(`data:image/jpeg;base64,${dataViewUser.image}`)
            else
                setPreviewImage(``)

        }
    }, [dataViewUser])
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>View a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control"
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value)
                                }}
                                disabled
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">ROLE</label>
                            <select id="inputState" className="form-select" value={role} disabled onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" >
                                Preview Image
                            </label>
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ? <img src={previewImage} alt="preview" />
                                : <span>Preview Image</span>}
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;