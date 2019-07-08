import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../lib/calculate";
import "./App.scss";

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      total: '0',
      next: '0',
      operation: null,
    };
  }

  async handleClick (buttonName)  {
    const newState = await calculate(this.state, buttonName)
    this.setState(newState);
  };

  render() {
    return (
      <div className="component-app">
        <Display value={this.state.next == "0"? this.state.total: this.state.next} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}

