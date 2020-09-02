import React from "react";

class AmountBar extends React.Component {
  state = { amount: 0 };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.amount);
  };

  render() {
    return (
      <div>
        <div className="ui segment">
          <form onSubmit={this.onFormSubmit} className="ui form">
            <div className="field">
              <label>Enter $ amount </label>
              <input
                type="number"
                onChange={(e) => this.setState({ amount: e.target.value })}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AmountBar;
