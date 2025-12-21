import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../services/apiService';

import './DetailQuiz.scss';
import _ from 'lodash';
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './RightContent/RightContent';
const DetailQuiz = () => {
    let params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModelResult, setDataModelResult] = useState({});

    const fetchQuestionsByQuizId = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            //handle data
            let raw = res.DT
            let data = _.chain(raw)
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                    });
                    answers = _.orderBy(answers, ['id'], ['asc'])
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data);
        }
    }
    const handleNextQuestion = () => {
        if (currentQuestionIndex < dataQuiz.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }
    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    }

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answers && question.answers.length > 0) {
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                };
                return item;
            });
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone)
        }
    }

    const handleFishQuiz = async () => {
        // {
        //     "quizId": 1,
        //         "answers": [
        //             {
        //                 "questionId": 1,
        //                 "userAnswerId": [3]
        //             },
        //             {
        //                 "questionId": 2,
        //                 "userAnswerId": [6]
        //             }
        //         ]
        // }
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {

                let questionId = question.questionId;
                let userAnswerId = []
                if (question && question.answers.length > 0) {
                    question.answers.forEach(answer => {
                        if (answer.isSelected) {
                            userAnswerId.push(answer.id)
                        }
                    })
                }
                //todo: userAnswrId

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
        }
        payload.answers = answers
        //submit api 
        let res = await postSubmitQuiz(payload);
        if (res && res.EC === 0) {
            setDataModelResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData,
            })
            setIsShowModalResult(true);
        } else {
            alert('something wrongs....')
        }
    }


    useEffect(() => {
        fetchQuestionsByQuizId(quizId);
    }, [quizId])

    return (
        <div className="detail-quiz-container">
            <div className='left-content'>
                <div className='title'>
                    Quiz {quizId}:    {location?.state?.quizTitle}
                </div>
                <hr />
                <div className='q-body'>
                    <img src='' alt='' />
                </div>
                <div className='q-content'>
                    <Question data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuestionIndex] : []}
                        currentQuestionIndex={currentQuestionIndex}
                        handleCheckbox={handleCheckbox} />
                </div>
                <div className='q-footer'>
                    <button className='btn btn-secondary '
                        onClick={() => handlePrevQuestion()}>
                        Prev
                    </button>
                    <button className='btn btn-primary '
                        onClick={() => handleNextQuestion()}>
                        Next
                    </button>
                    <button className='btn btn-warning '
                        onClick={() => handleFishQuiz()}>
                        Finish
                    </button>

                </div>
            </div>
            <div className='right-content'>
                <RightContent
                    dataQuiz={dataQuiz}
                    handleFishQuiz={handleFishQuiz}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    currentQuestionIndex={currentQuestionIndex}
                />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModelResult={dataModelResult} />
        </div>
    )
}
export default DetailQuiz