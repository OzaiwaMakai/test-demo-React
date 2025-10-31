import React, { Component, useState } from "react";

// class AddUserInfor extends React.Component {
//     state = {
//         name: "",
//         age: 20,
//         address: ""
//     }

//     handleOnChangeInput = (event) => {
//         this.setState({
//             name: event.target.value
//         })
//         // console.log(event, event.target.value)
//     }

//     handleOnChangeAge = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//         // console.log(event, event.target.value)
//     }

//     handleOnSubmit = (event) => {
//         event.preventDefault();
//         // console.log(this.state)
//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random() * 100) + 1) + '-random',
//             name: this.state.name,
//             age: this.state.age
//         })
//     }

//     render() {
//         return (
//             <div>
//                 My name is {this.state.name} <br />
//                 My age is {this.state.age}
//                 <form onSubmit={(event) => this.handleOnSubmit(event)}>
//                     <label>Your name:</label>
//                     <input value={this.state.name} type="text" onChange={(event) => this.handleOnChangeInput(event)}>
//                     </input>
//                     <label>Your age:</label>
//                     <input value={this.state.age} type="text" onChange={(event) => this.handleOnChangeAge(event)}>
//                     </input>
//                     <button>submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

const AddUserInfor = (props) => {

    const [nameUser, setName] = useState("");
    const [age, setAge] = useState(20);
    const [address, setAddress] = useState("");

    const handleOnChangeInput = (event) => {

        setName(event.target.value)

    }

    const handleOnChangeAge = (event) => {
        setAge(event.target.value)
        // console.log(event, event.target.value)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state)
        props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + '-random',
            name: nameUser,
            age: age
        })
    }

    return (
        <div>
            My name is {nameUser} < br />
            My age is {age}
            < form onSubmit={(event) => handleOnSubmit(event)}>
                <label>Your name:</label>
                <input value={nameUser} type="text" onChange={(event) => handleOnChangeInput(event)}>
                </input>
                <label>Your age:</label>
                <input value={age} type="text" onChange={(event) => handleOnChangeAge(event)}>
                </input>
                <button>submit</button>
            </form >
        </div >
    )
}

export default AddUserInfor