import Select from 'react-select';
import { useState } from 'react';
import './Questions.scss'
import { BsFillNodePlusFill, BsFillNodeMinusFill, BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})
    return (
        <div className="question-container">
            <div className="title">
                Manage questions
            </div>

            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz</label>
                    <Select
                        defaultvalue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                        className='form-control'
                    />
                </div>
                <div className='mt-3'>
                    Add question:
                </div>
                <div >
                    <div className='mt-3 question-content'>
                        <div class="form-floating description">
                            <input type="text" class="form-control" placeholder="name@example.com" />
                            <label >Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-up'>Upload Image</label>
                            <input type={'file'} hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className='btn-add'>
                            <span >
                                <BsFillNodePlusFill className='icon-add' />
                            </span>
                            <span >
                                <BsFillNodeMinusFill className='icon-remove' />

                            </span>
                        </div>


                    </div>
                    <div className='answer-content'>
                        <input className="form-check-input isCorrect"
                            type="checkbox"
                        />
                        <div class="form-floating answer-name">
                            <input type="text" class="form-control" placeholder="name@example.com" />
                            <label >answer1</label>
                        </div>
                        <div className='btn-group'>
                            <span >
                                <BsFillPatchPlusFill className='icon-add' />
                            </span>
                            <span >
                                <BsFillPatchMinusFill className='icon-remove' />

                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions