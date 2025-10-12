//class component
//func component
import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {

    state = {
        listUsers: [
            { id: 1, name: "Le Truong Ky", age: "30" },
            { id: 2, name: "Tkkkk", age: "12" },
            { id: 3, name: "LeDum", age: "18" }
        ]
    }
    render() {
        //DRY: don't repeat yourself
        return (
            <div>
                <UserInfor></UserInfor>
                <br />
                <DisplayInfor
                    listUsers={this.state.listUsers}
                />
            </div>
        );
    }
}

export default MyComponent;