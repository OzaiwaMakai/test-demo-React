//class component
//func component
import React from "react";

class MyComponent extends React.Component {
    //JSX

    state = {
        name: "TK",
        age: 20,
        address: "Can Tho"
    }

    handleClick(event) {
        console.log("Click me my button")
        console.log("my name is ", this.state.name)
        // console.log(event)
        this.setState({
            name: "Truong Ky"
        })
    }

    handleOnMouseOver(event) {
        console.log(event.pageX)
    }

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
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
                    <input type="text" onChange={(event) => this.handleOnChangeInput(event)}>
                    </input>
                    <button>submit</button>
                </form>
            </div>
        );
    }
}

export default MyComponent;