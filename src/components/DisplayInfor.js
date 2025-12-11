import React, { useEffect, useState } from "react";
import './DisplayInfor.scss'
import logo from './../logo.svg'
const DisplayInfor = (props) => {
    const { listUsers } = props
    // console.log(props)
    // console.log(listUsers)
    const [isShowHideListUser, setShowHideListUser] = useState(true);

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser)
    }
    useEffect(() => {
        if (listUsers.length == 0)
            alert('you deleted all users')
        console.log(">>> call me useEffect")
    }, [listUsers])
    return (
        <div className="display-infor-container">
            <div>
                <span onClick={() => handleShowHideListUser()}>{isShowHideListUser ? "Hide List users" : "Show List users"}</span>
            </div>
            {isShowHideListUser &&
                <div>
                    {listUsers.map((user) => {
                        return (

                            <div key={user.id} className={+user.age > 18 ? "blue" : "red"}>
                                <div>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                </div>
                                <div>
                                    <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
                                </div>
                                <hr />
                            </div>


                        )
                    })}
                </div>
            }
        </div>

    )
}
export default DisplayInfor