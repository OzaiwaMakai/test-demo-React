import Select from 'react-select';
import { useEffect, useState } from 'react';
import './QuizQA.scss'
import { MdAddPhotoAlternate } from "react-icons/md";
import { BsFillNodePlusFill, BsFillNodeMinusFill, BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import { toast } from 'react-toastify';
import {
    getQuizWithQA, getAllQuizForAdmin, postUpsertQA
} from "../../../../services/apiService";
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

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value)
            fetchQuizwithQA()
    }, [selectedQuiz])

    // Source - https://stackoverflow.com/a
    // Posted by cuixiping, modified by community. See post 'Timeline' for change history
    // Retrieved 2025-12-20, License - CC BY-SA 4.0

    // return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }



    const fetchQuizwithQA = async () => {
        let rs = await getQuizWithQA(selectedQuiz.value);
        if (rs && rs.EC === 0) {
            //convert base64 to File Object
            let newQA = []
            for (let i = 0; i < rs.DT.qa.length; i++) {
                let q = rs.DT.qa[i]
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}`;
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}`, 'image/png')
                }
                newQA.push(q);
            }
            if (newQA && newQA.length > 0)
                setQuestions(newQA);
            else
                setQuestions(initQuestion)

        }
    }

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


    const handleAddRemoveQuestion = (type, id) => {
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
        let questionsClone = _.cloneDeep(questions);
        for (let i = 0; i < questionsClone.length; i++) {
            if (questionsClone[i].imageFile) {
                questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile)
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone
        })

        console.log('check question clone', questionsClone)
        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetchQuizwithQA()

        }

        console.log('check res: ', res)

        // toast.success('Create questions and answer success!');
        // setQuestions(initQuestion);

    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });


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