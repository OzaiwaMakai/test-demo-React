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
    }

    handleOnMouseOver(event) {
        console.log(event.pageX)
    }

    render() {
        return (
            <div>
                My name is {this.state.name}
                <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
                <button onClick={this.handleClick}>Click me</button>
            </div>
        );
    }
}

export default MyComponent;