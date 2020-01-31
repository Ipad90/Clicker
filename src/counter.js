import React from 'react';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            milestone: [
                '1', '5',' 10'
            ],
            counter: 0,
            multiplier: 1
        };
    }

    increment = () => {
        let multiplier = this.state.multiplier;
        multiplier = Number(multiplier);
        this.setState({counter: this.state.counter + multiplier});
        this.checkCounter();
    }

    decrement = () => {
        let multiplier = this.state.multiplier;
        multiplier = Number(multiplier);
        this.setState({counter: this.state.counter - multiplier});
        this.checkCounter();
    }

    setMultiplier = (e) => {
        this.setState({multiplier:e.target.value});
    }

    checkCounter = () => {
        if (this.state.counter == this.state.milestone[2]) {
            alert('woot');
        }
    }

    render() {
        return (
            <div className = 'container'>
                <div className = 'card'>
                    <h1>{this.state.counter}</h1>
                    <select value = {this.state.multiplier}
                        onChange = {this.setMultiplier}>
                        <option value = '1'>1</option>
                        <option value = '5'>5</option>
                        <option value = '10'>10</option>
                    </select>

                    <br/>

                    <button onClick = {this.increment}>Increment</button>
                    <button onClick = {this.decrement}>Decrement</button>
                </div>
            </div>
        );
    }
}

export default Counter;
