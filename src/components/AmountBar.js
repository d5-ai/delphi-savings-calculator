import React from "react";

class AmountBar extends React.Component {
  state = { amount: 0 };

  onFormSubmit = (event) => {
    event.preventDefault();
  };

  onAmountChange = (event) => {
    // send amount up to App.js component
    this.props.onSubmit(event.target.value);
    // update state
    this.setState({ amount: event.target.value });
  };

  render() {
    return (
      <div>
        <div className="ui segment">
          <form onSubmit={this.onFormSubmit} className="ui form">
            <div className="field">
              <label>Enter $ amount </label>
              <input type="number" min="0" onChange={this.onAmountChange} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AmountBar;
