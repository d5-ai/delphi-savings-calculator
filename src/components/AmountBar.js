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
        <div
          className="ui segment"
          style={{ maxWidth: "200px", margin: "auto" }}
        >
          <form onSubmit={this.onFormSubmit} className="ui form">
            <div className="field">
              <label>Enter USD amount </label>
              <input
                type="number"
                min="0"
                onChange={this.onAmountChange}
                style={{
                  textAlign: "right",
                  fontSize: 15,
                  height: "50px",
                  marginTop: "20px",
                }}
              />
            </div>
          </form>
        </div>
        <div>
          <h2>You Deposit: $ {(this.state.amount / 1).toLocaleString()}</h2>
        </div>
      </div>
    );
  }
}

export default AmountBar;
