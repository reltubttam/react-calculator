import React from "react";
import "./Button.scss";

export default class Button extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clickHandler(this.props.name);
  };

  render() {
    const className = [
      "component-button",
      this.props.operator ? "operator" : "",
      this.props.numeric ? "numeric" : "",
      this.props.wide ? "wide" : "",
    ];

    return (
      <div className={className.join(" ").trim()}>
        <button onClick={this.handleClick}>{this.props.name}</button>
      </div>
    );
  }
}
