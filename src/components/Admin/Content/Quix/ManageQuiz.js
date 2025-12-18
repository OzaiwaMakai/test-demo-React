import './ManageQuiz.scss'
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiService'
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalDeleteQuiz from './ModalDeleteQuiz';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState();
    const [image, setImage] = useState(null);
    // const [selectedOption, setSelectedOption] = useState(null);
    const [showModelUpdateQuiz, setShowModalUpdateQuiz] = useState(false)
    const [dataUpdateQuiz, setDataUpdateQuiz] = useState([])

    const [dataDeleteQuiz, setDataDeleteQuiz] = useState([])
    const [showModelDeleteQuiz, setShowModalDeleteQuiz] = useState(false)


    const [listQuiz, setListQuiz] = useState([]);
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC == 0) {
            setListQuiz(res.DT)
        }
    }


    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitQuiz = async () => {
        // validate

        if (!name || !description) {
            toast.error('Name/Description is required')
            return;
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image)
        if (res && res.EC == 0) {
            toast.success(res.EM);
            setName('');
            setDescription('')
            setImage(null);

        } else {
            toast.error(res.EM)
        }
    }

    const handleUpdateQuiz = (item) => {
        setShowModalUpdateQuiz(true);
        setDataUpdateQuiz(item)
    }

    const handleDeleteQuiz = (item) => {
        setShowModalDeleteQuiz(true);
        setDataDeleteQuiz(item)
    }

    useEffect(() => {
        fetchQuiz();
    }, [])

    return (
        <div className="quiz-container">

            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new Quizz:</legend>
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
                                <div className='more-actions form-group'>
                                    <label className='mb-1'>Upload Image</label>
                                    <input type="file" className='form-control' onChange={(e) => handleChangeFile(e)} />

                                </div>

                                <div className='mt-3'>
                                    <button className='btn btn-warning'
                                        onClick={() => handleSubmitQuiz()}>Save</button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="list-detail">
                <TableQuiz
                    handleUpdateQuiz={handleUpdateQuiz}
                    handleDeleteQuiz={handleDeleteQuiz}
                    listQuiz={listQuiz}
                />
            </div>
            <ModalUpdateQuiz
                show={showModelUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdateQuiz={dataUpdateQuiz}
                fetchQuiz={fetchQuiz}
            />
            <ModalDeleteQuiz
                show={showModelDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDeleteQuiz={dataDeleteQuiz}
                fetchQuiz={fetchQuiz}
            />
        </div>
    )
}

export default ManageQuiz;