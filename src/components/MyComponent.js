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

    render() {
        return (
            <div>
                My name is {this.state.name}
            </div>
        );
    }
}

export default MyComponent;