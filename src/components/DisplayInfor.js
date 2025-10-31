import React, { useState } from "react";
import './DisplayInfor.scss'
import logo from './../logo.svg'
// class DisplayInfor extends React.Component {

//     render() {
//         const { listUsers } = this.props
//         // console.log(listUsers)
//         return (
//             <div className="display-infor-container">
//                 {true &&
//                     <div>
//                         {listUsers.map((user) => {
//                             return (

//                                 <div key={user.id} className={+user.age > 18 ? "blue" : "red"}>
//                                     <div>
//                                         <div>My name's {user.name}</div>
//                                         <div>My age's {user.age}</div>
//                                     </div>
//                                     <div>
//                                         <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                                     </div>
//                                     <hr />
//                                 </div>


//                             )
//                         })}
//                     </div>
//                 }
//             </div>

//         )
//     }
// }
const DisplayInfor = (props) => {
    const { listUsers } = props
    const [isShowHideListUser, setShowHideListUser] = useState(true);

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser)
    }
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
                                    <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
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