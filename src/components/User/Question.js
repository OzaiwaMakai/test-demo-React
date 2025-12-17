import _ from 'lodash';
import './DetailQuiz.scss';
const Question = (props) => {
    const { data, currentQuestionIndex, handleCheckbox } = props;
    if (_.isEmpty(data)) {
        return <></>
    }

    const handleHandleCheckbox = (event, aId, qId) => {
        console.log('aId, qId:', aId, qId);
        handleCheckbox(aId, qId);
    }

    return (
        <>
            {data.image ?
                <div className='q-image'>
                    <img src={`data:image/jpeg;base64,${data.image}`} alt="question" />
                </div>
                :
                <div className='q-image'>

                </div>}
            <div className='question'>
                Question {currentQuestionIndex + 1}: {data.questionDescription}
            </div>
            <div className='answers'>
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((item, index) => {
                        return (
                            <div key={`answer-${index}`}>
                                <div className="form-check a-child">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        checked={item?.isSelected ? item.isSelected : false}
                                        onChange={(event) => handleHandleCheckbox(event, item.id, data.questionId)}
                                    />
                                    <label className="form-check-label" >
                                        {item.description}
                                    </label>
                                </div>
                            </div>
                        )
                    }
                    )}
            </div>
        </>
    )
}

export default Question;