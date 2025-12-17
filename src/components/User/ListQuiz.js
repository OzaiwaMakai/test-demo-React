import { useEffect, useState } from "react"
import { getQuizByUser } from "../../services/apiService"
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom"
const ListQuiz = (props) => {
    const navigate = useNavigate();
    const [arrayQuiz, setArrayQuiz] = useState([])
    useEffect(() => {
        //call api get quiz by user
        getQuizData();


    }, [])

    const getQuizData = async () => {
        let res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrayQuiz(res.DT);
        }

    }
    return (
        <div className="list-quiz-container container">
            {arrayQuiz && arrayQuiz.length > 0 &&
                arrayQuiz.map((item, index) => {
                    return (
                        <div key={`quiz-${index}`} className="card" style={{ width: "18rem" }}>
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {index + 1}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <button href="#" className="btn btn-primary"
                                        onClick={() => navigate(`/quiz/${item.id}`)}
                                    >Start Now</button>
                                </div>
                            </div >
                        </div>
                    )
                }
                )
            }
            {arrayQuiz && arrayQuiz.length === 0 &&
                <div>No quiz available</div>
            }
        </div >
    )
}

export default ListQuiz