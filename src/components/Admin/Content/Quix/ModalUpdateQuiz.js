import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { putUpdateQuiz } from '../../../../services/apiService';
import Select from 'react-select';
import { FcPlus } from "react-icons/fc";
const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdateQuiz, setListQuiz } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState({ value: 'EASY', label: '' });
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const handleClose = () => {
        setShow(false)
    };


    const handleShow = () => {
        setShow(true)
    };

    useEffect(() => {
        if (!_.isEmpty(dataUpdateQuiz)) {
            setName(dataUpdateQuiz.name)
            setDescription(dataUpdateQuiz.description)
            setImage(dataUpdateQuiz.image)
            setType(dataUpdateQuiz.difficulty)
            if (dataUpdateQuiz.image)
                setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`)
            else
                setPreviewImage(``)
        }
    }, [dataUpdateQuiz])
    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }
    const handleSubmitUpdateQuiz = async () => {
        let data = await putUpdateQuiz(dataUpdateQuiz.id, description, name, type.value, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchQuiz();
        } else {
            toast.error(data.EM);
        }

    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
            // setPreviewImage('');
        }
    }

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
                    <Modal.Title>Manage Quizzes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-new">
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">Update Quiz</legend>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" placeholder='your quizz name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input type="text" className="form-control" placeholder='description...'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='my-3'>
                                <Select
                                    defaultValue={type}
                                    onChange={setType}
                                    options={options}
                                    placeholder={'Quizz type...'}
                                />
                            </div>

                            <div className='col-md-12'>
                                <label className="form-label label-upload" htmlFor='labelUpload'>
                                    <FcPlus />
                                    Upload File Image
                                </label>
                                <input type="file" hidden id="labelUpload"
                                    onChange={(event) => handleUploadImage(event)} />
                            </div>
                            <div className='col-md-12 img-preview'>
                                {previewImage ? <img src={previewImage} alt="preview" />
                                    : <span>Preview Image</span>}
                            </div>
                        </fieldset>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalUpdateQuiz;