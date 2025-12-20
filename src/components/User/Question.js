import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import './DetailQuiz.scss';
import { useState } from 'react';
const Question = (props) => {
    const { data, currentQuestionIndex, handleCheckbox } = props;

    const [isPreviewImage, setIsPreviewImage] = useState(false)
    if (_.isEmpty(data)) {
        return <></>
    }

    const handleHandleCheckbox = (event, aId, qId) => {
        handleCheckbox(aId, qId);
    }

    return (
        <>
            {data.image ?
                <div className='q-image'>
                    <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsPreviewImage(true)}
                        src={`data:image/jpeg;base64,${data.image}`} alt="question" />
                    {isPreviewImage === true &&
                        <Lightbox Lightbox image={`data:image/jpeg;base64,${data.image}`}
                            title={"Question Image"}
                            onClose={() => setIsPreviewImage(false)}>
                        </Lightbox>
                    }
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