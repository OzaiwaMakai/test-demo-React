import React, { Component } from "react";

class UserInfor extends React.Component {
    state = {
        name: "TK",
        age: 20,
        address: "Can Tho"
    }

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
        // console.log(event, event.target.value)
    }

    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
        // console.log(event, event.target.value)
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
    }
    render() {
        return (
            <div>
                My name is {this.state.name}
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <label>Your name:</label>
                    <input value={this.state.name} type="text" onChange={(event) => this.handleOnChangeInput(event)}>
                    </input>
                    <label>Your age:</label>
                    <input value={this.state.age} type="text" onChange={(event) => this.handleOnChangeAge(event)}>
                    </input>
                    <button>submit</button>
                </form>
            </div>
        )
    }
}

export default UserInfor