import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiService';
import _ from 'lodash';
const DetailQuiz = () => {
    let params = useParams();
    const quizId = params.id;
    useEffect(() => {
        fetchQuestionsByQuizId(quizId);
    }, [quizId])

    const fetchQuestionsByQuizId = async () => {
        let res = await getDataQuiz(quizId);
        console.log('check res: ', res);
        if (res && res.EC === 0) {
            //handle data
            let raw = res.DT
            let data = _.chain(raw)
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let temp = value;
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        answers.push(item.answers);
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                    });
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            console.log('check data formatted: ', data);
        }
    }


    return (
        <div className="detail-quiz-container">
            DetailQuiz
        </div>
    )
}
export default DetailQuiz