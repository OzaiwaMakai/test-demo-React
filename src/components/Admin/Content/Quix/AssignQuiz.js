import Select from 'react-select';
import { useEffect, useState } from 'react';
import { getAllQuizForAdmin, getAllUsers, postAssignQuizToUser } from '../../../../services/apiService';
import { toast } from 'react-toastify';
const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC == 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description} `
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const fetchUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC == 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(users)
        }
    }

    const handleAssignQuiz = async () => {
        //validate
        if (!selectedQuiz.value || !selectedUser.value) {
            toast.error('please select user/quiz to assign');
            return
        }


        const res = await postAssignQuizToUser(selectedQuiz.value, selectedUser.value)
        console.log(res)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            return;
        } else {
            toast.error(res.EM)
            return;

        }
    }

    return (
        <div className='assign-quiz-container row'>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz: </label>
                <Select
                    defaultvalue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                    className='form-control select-quiz'
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select User: </label>
                <Select
                    defaultvalue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                    className='form-control select-quiz'
                />
            </div>
            <div>
                <button className='btn btn-warning mt-3'
                    onClick={() => handleAssignQuiz()}>Assign</button>
            </div>
        </div>
    )
}

export default AssignQuiz