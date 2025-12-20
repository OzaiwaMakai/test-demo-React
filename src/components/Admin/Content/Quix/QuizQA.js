import Select from 'react-select';
import { useEffect, useState } from 'react';
import './QuizQA.scss'
import { MdAddPhotoAlternate } from "react-icons/md";
import { BsFillNodePlusFill, BsFillNodeMinusFill, BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import { toast } from 'react-toastify';
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from "../../../../services/apiService";
const QuizQA = (props) => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                }
            ]
        }
    ]
    const [questions, setQuestions] = useState(initQuestion);

    const [isPreviewImage, setIsPreviewImage] = useState(false)

    const [dataImagePreview, setdataImagePreview] = useState({
        title: '',
        url: '',

    })

    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({})

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC == 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description},`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    console.log('>>> List Quiz', listQuiz)

    const handleAddRemoveQuestion = (type, id) => {
        console.log('>>check', type, id)
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        iscorrect: false,
                    }
                ]
            }

            setQuestions([...questions, newQuestion]);
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id != id)
            setQuestions(questionClone);

        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        console.log('>>check', type, questionId, answerId)
        let questionClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            }
            let index = questionClone.findIndex(item => item.id == questionId);
            questionClone[index].answers.push(newAnswer);
            setQuestions(questionClone);
            // setQuestions([...questions, newQuestion]);
        }
        if (type === 'REMOVE') {
            let index = questionClone.findIndex(item => item.id == questionId);
            questionClone[index].answers =
                questionClone[index].answers.filter(item => item.id != answerId)
            setQuestions(questionClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionClone = _.cloneDeep(questions)
            let index = questionClone.findIndex(item => item.id == questionId);
            if (index > -1) {
                questionClone[index].description = value;
                setQuestions(questionClone);
            }
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id == questionId);
        if (index > -1 && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;
            // questionClone[index].imageName = value;
            setQuestions(questionClone);
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id == questionId);
        if (index > -1) {
            questionClone[index].answers =
                questionClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value;

                        }
                        if (type === 'INPUT') {
                            answer.description = value;
                        }
                    }
                    return answer;
                })
            setQuestions(questionClone);
        }
    }

    const handleSubbmitQuestionForQuiz = async () => {
        //todo

        //validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz!');
            return
        }
        //validate answer
        let isValidAnswer = true
        let indexQ = 0, indexA = 0
        for (let i = 0; i < questions.length; i++) {

            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
            return
        }

        //validate question
        let isValidQ = true
        let indexQ1 = 0
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false;
                indexQ1 = i;
                break;
            }
        }
        if (isValidQ === false) {
            toast.error(`Not empty description for Question ${indexQ1 + 1}`);
            return
        }

        //submit question

        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
            }
        }

        toast.success('Create questions and answer success!');
        setQuestions(initQuestion);

    }

    const handlePrevieImage = (questionId) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id == questionId);
        if (index > -1) {
            setdataImagePreview({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName,
            })
            setIsPreviewImage(true)
        }
    }


    return (
        <div className="question-container">
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz</label>
                    <Select
                        defaultvalue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        className='form-control select-quiz'
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add question:
                </div>
                {questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-5'>
                                <div className='mt-3 question-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)} />
                                        <label >Question {index + 1}'s description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label className='label-up' htmlFor={`${question.id}`}><MdAddPhotoAlternate /></label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                            type={'file'}
                                            hidden />
                                        <span >
                                            {question.imageName ?
                                                <span style={{ cursor: 'pointer' }}
                                                    onClick={() => handlePrevieImage(question.id)}>{question.imageName}</span> : '0 file is uploaded'}
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <BsFillNodePlusFill className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BsFillNodeMinusFill className='icon-remove' />

                                            </span>
                                        }
                                    </div>
                                </div>
                                {question && question.answers &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answer-content'>
                                                <input className="form-check-input isCorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input type="text" className="form-control" placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) => handleAnswerQuestion('INPUT', question.id, answer.id, event.target.value)}
                                                    />
                                                    <label >answer {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}>
                                                        <BsFillPatchPlusFill className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <BsFillPatchMinusFill className='icon-remove' />

                                                        </span>
                                                    }
                                                </div>

                                            </div>
                                        )
                                    })}


                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSubbmitQuestionForQuiz()}
                            className='btn btn-warning'>Save Questions</button>
                    </div>

                }

                {isPreviewImage === true &&
                    <Lightbox Lightbox image={dataImagePreview.url} title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}>
                    </Lightbox>
                }

            </div>

        </div >
    )
}

export default QuizQA