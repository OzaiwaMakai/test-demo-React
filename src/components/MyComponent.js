//class component
//func component
import React, { useState } from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";


const MyComponent = (props) => {
    // console.log(props)
    const [listUsers, setListUsers] = useState(
        [{ id: 1, name: "Le Truong Ky", age: "30" },
        { id: 2, name: "Tkkkk", age: "12" },
        { id: 3, name: "LeDum", age: "18" }])

    const handleAddNewUser = (userObj) => {
        setListUsers([userObj, ...listUsers,])
    }
    const handleDeleteUser = (userId) => {
        let listUsersClone = listUsers
        console.log(listUsersClone)

        listUsersClone = listUsersClone.filter(item => item.id !== userId)
        setListUsers(listUsersClone)
    }

    //DRY: don't repeat yourself
    return (
        <>
            <div className="a">
                <AddUserInfor
                    handleAddNewUser={handleAddNewUser}
                ></AddUserInfor>
                <br />
                <DisplayInfor
                    listUsers={listUsers}
                    handleDeleteUser={handleDeleteUser}
                />
            </div>
            <div className="b">

            </div>
        </>
    );
}


export default MyComponent;