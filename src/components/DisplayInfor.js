import React from "react";
import './DisplayInfor.scss'
class DisplayInfor extends React.Component {
    state = {
        isShowlistUsers: true
    }
    handleShowHide = () => {
        this.setState({
            isShowlistUsers: !this.state.isShowlistUsers
        })
    }

    render() {
        const { listUsers } = this.props
        // console.log(listUsers)
        return (
            <div className="display-infor-container">
                <div>
                    <span onClick={() => { this.handleShowHide() }}>
                        {this.state.isShowlistUsers === true ? "Hide list users" : "Show list users"}
                    </span>
                </div>
                {this.state.isShowlistUsers &&
                    <div>
                        {listUsers.map((user) => {
                            return (
                                <div key={user.id} className={+user.age > 18 ? "blue" : "red"}>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>

        )
    }
}

export default DisplayInfor