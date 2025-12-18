import { useEffect, useState } from "react";

const TableQuiz = (props) => {
    const { handleUpdateQuiz, listQuiz, fetchQuiz, handleDeleteQuiz } = props



    return (
        <>
            <div>List Quizzes:</div>
            <table className="table table-hover table-bordered mt-5">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td >{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <button className="btn btn-warning"
                                        onClick={() => handleUpdateQuiz(item)}
                                    >
                                        Update
                                    </button>
                                    <button className="btn btn-danger mx-3"
                                        onClick={() => handleDeleteQuiz(item)}

                                    >Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table >
        </>
    )
}

export default TableQuiz;