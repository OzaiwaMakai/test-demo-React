//class component
//func component
import React from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";

class MyComponent extends React.Component {

    state = {
        listUsers: [
            { id: 1, name: "Le Truong Ky", age: "30" },
            { id: 2, name: "Tkkkk", age: "12" },
            { id: 3, name: "LeDum", age: "18" }
        ]
    }

    handleAddNewUser = (userObj) => {
        this.setState({
            listUsers: [userObj, ...this.state.listUsers]
        })
    }
    render() {
        //DRY: don't repeat yourself
        return (
            <div>
                <AddUserInfor
                    handleAddNewUser={this.handleAddNewUser}
                ></AddUserInfor>
                <br />
                <DisplayInfor
                    listUsers={this.state.listUsers}
                />
            </div>
        );
    }
}

export default MyComponent;