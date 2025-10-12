//class component
//func component
import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    //JSX

    render() {
        const myAge = [20, 30, 40]
        const myInfo = ['a', 'bc']
        return (
            <div>
                <UserInfor></UserInfor>
                <br />
                <br />
                <DisplayInfor name="TKKkkkkkk" age="30"></DisplayInfor>
                <DisplayInfor name="Truong Ky" age={26} myInfo={myInfo}></DisplayInfor>
            </div>
        );
    }
}

export default MyComponent;