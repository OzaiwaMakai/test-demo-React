import React, { Component } from "react";

class AddUserInfor extends React.Component {
    state = {
        name: "",
        age: 20,
        address: ""
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
        // console.log(this.state)
        this.props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + '-random',
            name: this.state.name,
            age: this.state.age
        })
    }

    render() {
        return (
            <div>
                My name is {this.state.name} <br />
                My age is {this.state.age}
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

export default AddUserInfor