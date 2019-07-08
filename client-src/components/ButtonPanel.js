import Button from "./Button";
import React from "react";

import "./ButtonPanel.scss";

export default class ButtonPanel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick (buttonName) {
    this.props.clickHandler(buttonName);
  };

  render() {
    return (
      <div className="component-button-panel">
        <div>
          <Button name="AC" clickHandler={this.handleClick} />
          <Button name="+/-" clickHandler={this.handleClick} />
          <Button name="." clickHandler={this.handleClick} />
          <Button name="÷" clickHandler={this.handleClick} operator />
        </div>
        <div>
          <Button name="7" clickHandler={this.handleClick} numeric />
          <Button name="8" clickHandler={this.handleClick} numeric />
          <Button name="9" clickHandler={this.handleClick} numeric />
          <Button name="x" clickHandler={this.handleClick} operator />
        </div>
        <div>
          <Button name="4" clickHandler={this.handleClick} numeric />
          <Button name="5" clickHandler={this.handleClick} numeric />
          <Button name="6" clickHandler={this.handleClick} numeric />
          <Button name="-" clickHandler={this.handleClick} operator />
        </div>
        <div>
          <Button name="1" clickHandler={this.handleClick} numeric />
          <Button name="2" clickHandler={this.handleClick} numeric />
          <Button name="3" clickHandler={this.handleClick} numeric />
          <Button name="+" clickHandler={this.handleClick} operator />
        </div>
        <div>
          <Button name="0" clickHandler={this.handleClick} numeric wide />
          <Button name="=" clickHandler={this.handleClick} operator />
        </div>
      </div>
    );
  }
}
