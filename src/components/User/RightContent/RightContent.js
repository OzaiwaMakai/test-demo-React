import CountDown from "./CountDown"
import { useRef } from "react"
const RightContent = (props) => {
    const refDiv = useRef(null)
    const { dataQuiz } = props
    const onTimeUp = () => {
        props.handleFishQuiz()
        alert('Time Up')
    }

    const getClassQuestion = (question, index) => {


        if (question && question.answers.length > 0) {
            const isUnAnswered = question.answers.some(item => item.isSelected === true)
            if (props.currentQuestionIndex === index && isUnAnswered) {
                return "question selected clicked"
            }
            if (isUnAnswered)
                return "question selected";
            if (props.currentQuestionIndex === index) {
                return "question clicked"
            }
        }
        return "question ";

    }

    const handleClickQuestion = (question, index) => {
        props.setCurrentQuestionIndex(index)
        console.log(refDiv.current)
        // refDiv.current.className = "question clicked"
    }

    // console.log(dataQuiz)
    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp} />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={`question - ${index}`}
                                className={getClassQuestion(item, index)}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={refDiv}>{index + 1}</div>

                        )
                    })

                }
            </div>
        </>
    )
}

export default RightContent;