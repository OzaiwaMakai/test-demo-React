import { delay } from 'lodash';
import axios from '../utils/axiosCustomize';

const postCreateNewUser = async (email, password, username, role, image) => {

    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userimage', image);
    return axios.post('api/v1/participant', data)
}


const getAllUsers = async () => {
    return axios.get('api/v1/participant/all');
}

const putUpdateUser = async (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
}

const deleteUser = (id) => {
    return axios.delete(`api/v1/participant`, {
        data: { id: id }
    });
}

const getUserWithPaginate = async (page, limit) => {
    console.log('check page and limit: ', page, limit);
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (email, password) => {
    return axios.post(`/api/v1/login`, {
        email, password,
        delay: 500
    }
    );
}

const postRegister = (email, password, username) => {
    return axios.post(`/api/v1/register`, { email, password, username }
    );
}

const getQuizByUser = () => {
    return axios.get(`api/v1/quiz-by-participant`);
}

const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
    console.log({ ...data })
    return axios.post(`api/v1/quiz-submit`, { ...data });
}

const postCreateNewQuiz = (description, name, type, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', type);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data)
}

const getAllQuizForAdmin = () => {
    return axios.get(`api/v1/quiz/all`);
}

const putUpdateQuiz = async (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    console.log('>>> check data api: ', data)
    return axios.put('api/v1/quiz', data)
}

const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
}

const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
    console.log('>>.check create new q', quiz_id, description, image)
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data)
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    console.log('>>.check create new anw', description, correct_answer, question_id)
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    })
}

const postAssignQuizToUser = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId })
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data });
}

const logout = (email, refresh_token) => {
    return axios.post('api/v1/logout', { email, refresh_token });

}

export {
    postCreateNewUser, getAllUsers, putUpdateUser,
    deleteUser, getUserWithPaginate, postLogin, postRegister,
    getQuizByUser, getDataQuiz, postSubmitQuiz, postCreateNewQuiz,
    getAllQuizForAdmin, putUpdateQuiz, deleteQuiz,
    postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion,
    postAssignQuizToUser, getQuizWithQA, postUpsertQA, logout

};